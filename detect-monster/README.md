
# 참고사항

1) weight 파일 경로

detect_bubble.py 14 줄

- model = torch.hub.load('ultralytics/yolov5', 'custom', path='./runs/train/bubble_exp2/weights/best.pt')

부분에서
path='./runs/train/bubble_exp2/weights/best.pt' << 올려놓은 best.pt 파일의 경로를 넣어주면 됩니다.

2) import

cmd에서 'pip install ~~ ' 로 다운로드 가능합니다.
