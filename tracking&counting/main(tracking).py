import os
import cv2
import numpy
from yolov3.utils import draw_bbox, read_class_names
from deep_sort import nn_matching
from deep_sort.detection import Detection
from deep_sort.tracker import Tracker
from deep_sort import generate_detections

os.environ['CUDA_VISIBLE_DEVICES'] = '0'


def object_tracking(yolo, video_path, show=False, classes='model_data/coco.names'):
    # encoder for image features
    model = 'model_data/mars-small128.pb'
    box_encoder = generate_detections.create_box_encoder(model, batch_size=1)

    class_names = read_class_names(classes)
    keys = list(class_names.keys())
    vals = list(class_names.values())

    # working with webcam
    cap = cv2.VideoCapture(video_path)

    # create tracker
    metric = nn_matching.NearestNeighborDistanceMetric("cosine", matching_threshold=0.6)
    tracker = Tracker(metric)

    people_in = 0
    people_out = 0
    people_total = 0
    frame_number = 0

    while True:
        layer_names = yolo.getLayerNames()
        output_layers = [layer_names[i - 1] for i in yolo.getUnconnectedOutLayers()]

        ret, frame = cap.read()
        if not ret:
            break
        frame_number += 1
        height, width, _ = frame.shape

        # Detect objects
        blob = cv2.dnn.blobFromImage(frame, 1 / 255, (320, 320), (0, 0, 0), swapRB=True, crop=False)
        yolo.setInput(blob)
        outs = yolo.forward(output_layers)

        # Show information on the screen
        boxes = []
        confidences = []
        class_ids = []

        for out in outs:
            for detection in out:
                scores = detection[5:]
                class_id = numpy.argmax(scores)
                confidence = scores[class_id]
                if confidence > 0.4:
                    # Object detected
                    center_x = int(detection[0] * width)
                    center_y = int(detection[1] * height)
                    w = int(detection[2] * width)
                    h = int(detection[3] * height)

                    # Rectangle coordinates
                    x = int(center_x - w / 2)
                    y = int(center_y - h / 2)

                    boxes.append([x, y, w, h])
                    confidences.append(float(confidence))
                    class_ids.append(class_names[class_id])

        # using to fix repeating rectangles
        indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)

        right_boxes = []
        right_confidences = []
        right_class_ids = []
        for i in range(len(boxes)):
            if i in indexes:
                right_boxes.append(boxes[i])
                right_confidences.append(confidences[i])
                right_class_ids.append(class_ids[i])

        # creating detections for tracker to work with
        right_boxes = numpy.array(right_boxes)
        right_class_ids = numpy.array(right_class_ids)
        right_confidences = numpy.array(right_confidences)
        features = numpy.array(box_encoder(frame, boxes))
        detections = [Detection(box, confidence, class_id, feature) for box, confidence, class_id, feature in
                      zip(right_boxes, right_confidences, right_class_ids, features)]

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
            track_id = track.track_id
            tracked_boxes.append(box.tolist() + [track_id, index])
            track_id = track_id % 100

            if index != 0:
                continue

            if coords[1][track_id] == 0:
                coords[0][track_id] = box[1]
                coords[1][track_id] = frame_number
                coords[3][track_id] += 1
            else:
                coords[2][track_id] = box[1]
                coords[3][track_id] += 1

        for j in range(M):
            if coords[1][j] != 0:
                if frame_number - coords[1][j] - coords[3][j] > 10:
                    # counting people
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
        image = draw_bbox(frame, tracked_boxes, CLASSES=classes, tracking=True)

        if show:
            cv2.imshow('output', image)
            if cv2.waitKey(25) & 0xFF == ord("q"):
                cv2.destroyAllWindows()
                break

    for j in range(M):
        if coords[1][j] > 0:
            # counting people
            people_total += 1
            if coords[2][j] > coords[0][j]:
                people_in += 1
            else:
                people_out -= 1
    return people_in


yolo_net = cv2.dnn.readNet('model_data/yolov4tiny.weights', 'model_data/yolov4tiny.cfg')
N = 4
M = 100
coords = []
for k in range(N):
    coords.append([0] * M)
people = object_tracking(yolo_net, 0, show=True)
print(people)
