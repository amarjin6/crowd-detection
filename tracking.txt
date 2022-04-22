import os
os.environ['CUDA_VISIBLE_DEVICES'] = '0'
import cv2
import numpy as np
import tensorflow as tf
from yolov3.utils import Load_Yolo_model, image_preprocess, postprocess_boxes, nms, draw_bbox, read_class_names
from yolov3.configs import *
from deep_sort import nn_matching
from deep_sort.detection import Detection
from deep_sort.tracker import Tracker
from deep_sort import generate_detections as gdet

video_path = "./IMAGES/test.mp4"

def Object_tracking(Yolo, video_path, output_path, input_size=416, show=False, CLASSES=YOLO_COCO_CLASSES,
                    score_threshold=0.3, iou_threshold=0.45, rectangle_colors='', Track_only=[]):
    # Definition of the parameters
    max_cosine_distance = 0.7
    nn_budget = None

    # initialize deep sort object
    model_filename = 'model_data/mars-small128.pb'
    encoder = gdet.create_box_encoder(model_filename, batch_size=1)
    metric = nn_matching.NearestNeighborDistanceMetric("cosine", max_cosine_distance, nn_budget)
    tracker = Tracker(metric)

    NUM_CLASS = read_class_names(CLASSES)
    key_list = list(NUM_CLASS.keys())
    val_list = list(NUM_CLASS.values())

    net = cv2.dnn.readNet('yolov3.weights', 'yolov3.cfg')
    classes = []
    with open('coco.names', 'r') as f:
        classes = [line.strip() for line in f.readlines()]

    #working with webcam
    cap = cv2.VideoCapture(0)
    colors = np.random.uniform(0, 255, size=(100, 3))

    while True:
        layerNames = Yolo.getLayerNames()
        outputLayers = [layerNames[i - 1] for i in Yolo.getUnconnectedOutLayers()]
        _, frame = cap.read()

        height, width, _ = frame.shape

        # Detect objects
        blob = cv2.dnn.blobFromImage(frame, 1 / 255, (320, 320), (0, 0, 0), swapRB=True, crop=False)

        # for b in blob:
        #    for   n, img_blob in enumerate(b):
        #       cv2.imshow(str(n), img_blob)

        Yolo.setInput(blob)
        outs = Yolo.forward(outputLayers)

        # Show information on the screen
        boxes = []
        confidences = []
        classIds = []

        for out in outs:
            for detection in out:
                scores = detection[5:]
                classId = np.argmax(scores)
                confidence = scores[classId]
                if confidence > 0.2:
                    # Object detected
                    centerX = int(detection[0] * width)
                    centerY = int(detection[1] * height)
                    w = int(detection[2] * width)
                    h = int(detection[3] * height)

                    # Rectangle coordinates
                    x = int(centerX - w / 2)
                    y = int(centerY - h / 2)

                    boxes.append([x, y, w, h])
                    confidences.append(float(confidence))
                    classIds.append(NUM_CLASS[classId])

        #these indexes should be used to fix rectangles
        indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)

        rightboxes = []
        rightconfidences = []
        rightclassIds = []
        for i in range(len(boxes)):
            if i in indexes:
                rightboxes.append(boxes[i])
                rightconfidences.append(confidences[i])
                rightclassIds.append(classIds[i])


        #creating detections for tracker to work with
        boxes = np.array(rightboxes)
        names = np.array(rightclassIds)
        scores = np.array(rightconfidences)
        features = np.array(encoder(frame, boxes))
        detections = [Detection(bbox, score, class_name, feature) for bbox, score, class_name, feature in
                      zip(boxes, scores, names, features)]

        # Pass detections to the deepsort object and obtain the track information.
        tracker.predict()
        tracker.update(detections)

        # Obtain info from the tracks
        tracked_bboxes = []

        for track in tracker.tracks:
            if not track.is_confirmed() or track.time_since_update > 5:
                continue

            bbox = track.to_tlbr()  # Get the corrected/predicted bounding box
            class_name = track.get_class()  # Get the class name of particular object
            tracking_id = track.track_id  # Get the ID for the particular track
            index = key_list[val_list.index(class_name)]  # Get predicted object index by object name
            tracked_bboxes.append(bbox.tolist() + [tracking_id, index])  # Structure data, that we could use it with our draw_bbox function

        # draw detection on frame
        image = draw_bbox(frame, tracked_bboxes, CLASSES=CLASSES, tracking=True)

        if show:
            cv2.imshow('output', image)

            if cv2.waitKey(25) & 0xFF == ord("q"):
                cv2.destroyAllWindows()
                break

    cv2.destroyAllWindows()

yolo = cv2.dnn.readNet('yolov4tiny.weights', 'yolov4tiny.cfg')
#yolo = Load_Yolo_model()
classes = []
with open('coco.names', 'r') as f:
    classes = [line.strip() for line in f.readlines()]
Object_tracking(yolo, 0 , "detection.mp4", input_size=YOLO_INPUT_SIZE, show=True, iou_threshold=0.1,
                rectangle_colors=(255, 255, 0), Track_only=[])
