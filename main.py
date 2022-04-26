from objectDetection import *
from objectTracker import *

# Load Object Detection
od = ObjectDetection()

# Load Object Tracker
ot = MahalanobisDistTracker()

# Objects Allowed
allowed_objects = ['person', 'dog', 'cat']

# Objects Detected
detected_objects = []

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
            detected_objects.append(box)
            # Track objects
            bbs = ot.update(detected_objects)
            color = od.colors[class_id]
            cv2.putText(img, f'{class_name}: {bbs[-1][-1]}', (x, y - 10), 0, 0.5, color, 1)
            cv2.rectangle(img, (x, y), (x + w, y + h), color, 3)

    cv2.imshow('Cam', img)

    key = cv2.waitKey(1)
    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()