import cv2
import numpy as np

# Load Yolo
net = cv2.dnn.readNet('yolov3.weights', 'yolov3.cfg')

classes = []
with open('coco.names', 'r') as f:
    classes = [line.strip() for line in f.readlines()]

cap = cv2.VideoCapture(0)
font = cv2.FONT_HERSHEY_PLAIN
colors = np.random.uniform(0, 255, size=(100, 3))

while True:
    layerNames = net.getLayerNames()
    outputLayers = [layerNames[i - 1] for i in net.getUnconnectedOutLayers()]

    # Load image
    _, img = cap.read()
    height, width, _ = img.shape
    print(img.shape)

    # Detect objects
    blob = cv2.dnn.blobFromImage(img, 1 / 1024, (416, 416), (0, 0, 0), swapRB=True, crop=False)

    # for b in blob:
    #     for n, img_blob in enumerate(b):
    #         cv2.imshow(str(n), img_blob)

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
            if confidence > 0.5:
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

    font = cv2.FONT_HERSHEY_SIMPLEX

    j = 0
    for i in range(len(boxes)):
        if i in indexes:
            x, y, w, h = boxes[i]
            label = str(classes[classIds[i]])
            color = colors[i]
            cv2.rectangle(img, (x, y), (x + w, y + h), color, 2)
            cv2.putText(img, label, (x, y + 30), font, 0.5, color, 2)
            j += 1

    print(j)
    cv2.imshow('Image', img)
    key = cv2.waitKey(1)
    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()
