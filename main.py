from objectDetection import *
from objectTracker import *

# Load Object Detection
od = ObjectDetection()

# Objects Allowed
allowed_objects = ['person', 'dog', 'cat']

# Load the video stream
cap = cv2.VideoCapture('cam\\elevator1080p.mp4')

while True:
    _, img = cap.read()
    height, width, _ = img.shape

    # Detect objects
    class_ids, scores, boxes = od.model.detect(img, nmsThreshold=0.4)

    for (class_id, score, box) in zip(class_ids, scores, boxes):
        x, y, w, h = box
        class_name = od.classes[class_id]

        if class_name in allowed_objects:
            color = od.colors[class_id]
            cv2.putText(img, f'{class_name}', (x, y - 15), 0, 1, color, 1)
            cv2.rectangle(img, (x, y), (x + w, y + h), color, 3)

    cv2.imshow('I', img)
    key = cv2.waitKey(1)
    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()
