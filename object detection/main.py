import cv2
import numpy as np
import time

# Load Yolo
net = cv2.dnn.readNet('yolov4tiny.weights', 'yolov4tiny.cfg')

classes = []
with open('coco.names', 'r') as f:
    classes = [line.strip() for line in f.readlines()]

cap = cv2.VideoCapture(0)
font = cv2.FONT_HERSHEY_PLAIN
colors = np.random.uniform(0, 255, size=(100, 3))
start = time.time()
frame = 0
while True:
    layerNames = net.getLayerNames()
    outputLayers = [layerNames[i - 1] for i in net.getUnconnectedOutLayers()]

    # Load image
    _, img = cap.read()
    frame += 1
    height, width, _ = img.shape

    # Detect objects
    blob = cv2.dnn.blobFromImage(img, 1 / 255, (320, 320), (0, 0, 0), swapRB=True, crop=False)
    net.setInput(blob)
    outs = net.forward(outputLayers)

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
                classIds.append(classId)

    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)

    for i in range(len(boxes)):
        if i in indexes:
            x, y, w, h = boxes[i]
            label = str(classes[classIds[i]])
            color = colors[i]
            cv2.rectangle(img, (x, y), (x + w, y + h), color, 2)
            cv2.putText(img, label, (x, y + 15), font, 1, color, 2)

    elapsedTime = time.time() - start
    fps = frame / elapsedTime
    print(fps)

    cv2.imshow("I", img)
    if cv2.waitKey(1) == 27:
        break

cap.release()
cv2.destroyAllWindows()
