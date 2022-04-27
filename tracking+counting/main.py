import os
os.environ['CUDA_VISIBLE_DEVICES'] = '0'
import cv2
import numpy
from yolov3.utils import draw_bbox, read_class_names
from yolov3.configs import *
from deep_sort import nn_matching
from deep_sort.detection import Detection
from deep_sort.tracker import Tracker
from deep_sort import generate_detections

def Object_tracking(Yolo, video_path, output_path, show=False, CLASSES=YOLO_COCO_CLASSES):
    #encoder for image features
    model = 'model_data/mars-small128.pb'
    box_encoder = generate_detections.create_box_encoder(model, batch_size=1)

    classNames = read_class_names(CLASSES)
    keys = list(classNames.keys())
    vals = list(classNames.values())

    #working with webcam
    cap = cv2.VideoCapture(video_path)
    colors = numpy.random.uniform(0, 255, size=(100, 3))

    #init video things
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    codec = cv2.VideoWriter_fourcc(*'XVID')
    outv = cv2.VideoWriter(output_path, codec, fps, (width, height))

    #create tracker
    metric = nn_matching.NearestNeighborDistanceMetric("cosine", matching_threshold=0.6)
    tracker = Tracker(metric)

    people_in = 0
    people_out = 0
    people_total = 0
    frame_number = 0


    while True:
        layerNames = Yolo.getLayerNames()
        outputLayers = [layerNames[i - 1] for i in Yolo.getUnconnectedOutLayers()]

        ret, frame = cap.read()
        if(ret == False):
            break
        frame_number += 1
        height, width, _ = frame.shape

        # Detect objects
        blob = cv2.dnn.blobFromImage(frame, 1 / 255, (320, 320), (0, 0, 0), swapRB=True, crop=False)
        Yolo.setInput(blob)
        outs = Yolo.forward(outputLayers)

        # Show information on the screen
        boxes = []
        confidences = []
        classIds = []

        for out in outs:
            for detection in out:
                scores = detection[5:]
                classId = numpy.argmax(scores)
                confidence = scores[classId]
                if confidence > 0.4:
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
                    classIds.append(classNames[classId])

        #using to fix repeating rectangles
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
        rightboxes = numpy.array(rightboxes)
        rightclassIds = numpy.array(rightclassIds)
        rightconfidences = numpy.array(rightconfidences)
        features = numpy.array(box_encoder(frame, boxes))
        detections = [Detection(box, confidence, class_id, feature) for box, confidence, class_id, feature in
                      zip(rightboxes, rightconfidences, rightclassIds, features)]

        # predict
        tracker.predict()
        tracker.update(detections)

        # getting tracker info
        tracked_boxes = []
        for track in tracker.tracks:
            if not track.is_confirmed() or track.time_since_update > 5:
                continue

            box = track.to_tlbr()  # Get current position in bounding box format
            class_name = track.get_class()
            index = keys[vals.index(class_name)]
            id = track.track_id
            tracked_boxes.append(box.tolist() + [id, index])
            id = id % 100

            if(index != 0):
                continue

            if(coords[1][id] == 0):
                coords[0][id] = box[1]
                coords[1][id] = frame_number
                coords[3][id] += 1
            else:
                coords[2][id] = box[1]
                coords[3][id] += 1

        for j in range(M):
            if (coords[1][j] != 0):
                if (frame_number - coords[1][j] - coords[3][j] > 10):
                    #counting people
                    people_total += 1
                    if coords[2][j] > coords[0][j]:
                        people_in += 1
                    else:
                        people_out -= 1

                    coords[0][j] = 0
                    coords[1][j] = 0
                    coords[2][j] = 0
                    coords[3][j] = 0

        # draw detection on frame
        image = draw_bbox(frame, tracked_boxes, CLASSES=CLASSES, tracking=True)
        #for b in tracked_boxes:
         #   print(b)

        #print(people_in)
        outv.write(image)
        if show:
            cv2.imshow('output', image)
            if cv2.waitKey(25) & 0xFF == ord("q"):
                cv2.destroyAllWindows()
                break

    for j in range(M):
        if (coords[1][j] > 0):
            # counting people
            people_total += 1
            if coords[2][j] > coords[0][j]:
                people_in += 1
            else:
                people_out -= 1

    print(people_in)
    print(people_out)
    print(people_total)
    print(coords[0])
    print(coords[1])
    print(coords[2])
    print(coords[3])
    return people_in

yolo = cv2.dnn.readNet('yolov4tiny.weights', 'yolov4tiny.cfg')
classes = []
N = 4
M = 100
coords = []
for i in range(N):
    coords.append([0] * M)
video_path = "./IMAGES/test.mp4"
#video_path = "./detection 10 2.mp4"
people = Object_tracking(yolo, 0, "detection.mp4", show=True)

