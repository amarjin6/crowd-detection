from objectDetection import *
from objectTracker import *
from roi import *

# Cam video
cam = 'cam\\elevator1080p.mp4'

# Load Object Detection
od = ObjectDetection()

# Load Object Tracker
ot = MahalanobisDistTracker()

# Objects Allowed
allowed_objects = ['person', 'dog', 'cat']

# Objects Detected
detected_objects = []

# Load the video stream
cap = cv2.VideoCapture(cam)

# Object detection from Stable camera
stable_cam = cv2.createBackgroundSubtractorMOG2(history=100, varThreshold=40, detectShadows=False)

while True:
    _, img = cap.read()
    height, width, _ = img.shape

    # Extract Region of interest
    roi = choose(cam, img)

    # Detect objects
    class_ids, scores, boxes = od.model.detect(roi, nmsThreshold=0.4)
    mask = stable_cam.apply(roi)

    for (class_id, score, box) in zip(class_ids, scores, boxes):
        x, y, w, h = box
        class_name = od.classes[class_id]

        if class_name in allowed_objects:
            detected_objects.append(box)
            # Track objects
            bbs = ot.update(detected_objects)
            color = od.colors[class_id]
            cv2.putText(roi, f'{class_name}: {bbs[-1][-1]}', (x, y - 10), 0, 0.5, color, 1)
            cv2.rectangle(roi, (x, y), (x + w, y + h), color, 3)

    # Show person count
    cv2.rectangle(img, (0, 0), (200, 50), (0, 150, 0), -1)
    cv2.putText(img, f'Persons: {ot.id_count}', (10, 40), 0, 1, (0, 0, 0), 2)

    cv2.imshow('Cam', img)
    cv2.imshow('Mask', mask)

    key = cv2.waitKey(1)
    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()
