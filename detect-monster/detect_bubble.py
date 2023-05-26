# 필요한 패키지 import
import cv2  # OpenCV(실시간 이미지 프로세싱) 모듈
import torch
import os
import time
import pyautogui
import numpy as np
from PIL import Image

os.environ["CUDA_DEVICE_ORDER"]="PCI_BUS_ID"
os.environ["CUDA_VISIBLE_DEVICES"]="0"

# yolov5 처리
model = torch.hub.load('ultralytics/yolov5', 'custom', path='D:/BAProject/OpenCV/YOLO_CUSTOM/yolov5/runs/train/bubble_exp2/weights/best.pt')

# 임의 변수 설정
attribute = ''
attribute_tmp = ''
attribute_stack = 0
star = ''
star_tmp = ''
star_stack = 0
send_flag = 0
detect_fail_flag = 0

# 메시지 수신
while True:

    # 노트북 화면 캡처
    screenshot = pyautogui.screenshot()
    image = np.array(screenshot)

    # 프레임을 PIL 이미지로 변환
    image = Image.fromarray(image)

    # 객체 감지 수행
    results = model(image)

    if results.xyxy[0] is not None:

        # 객체 감지 수행된 결과를 parsing
        for result in results.xyxy[0]:
            x1, y1, x2, y2, conf, cls = result

            # 50% 이상 일치하는 것만 데이터로 사용
            if (float(conf) > 0.5):
                # 속성에 해당하는 데이터 값
                if (f'{model.names[int(cls)]}' == 'fire' or f'{model.names[int(cls)]}' == 'water' or
                        f'{model.names[int(cls)]}' == 'wind' or f'{model.names[int(cls)]}' == 'light' or
                        f'{model.names[int(cls)]}' == 'dark'):

                    # print(f'Attribute is : {model.names[int(cls)]}')

                    # 식별 속성 저장
                    attribute = f'{model.names[int(cls)]}'
                    if (attribute_tmp == ''):
                        attribute_tmp = attribute

                    # 정확도 검사를 위한 n회 검증
                    if (attribute != ''):
                        # 서로 같은 속성일 경우
                        if (attribute == attribute_tmp):
                            attribute_stack += 1
                            attribute_tmp = attribute
                        # 서로 다른 속성일 경우
                        elif (attribute != attribute_tmp):
                            attribute_stack = 0
                            attribute_tmp = attribute

                    # print(attribute_stack)

                # 등급에 해당하는 데이터 값
                elif (f'{model.names[int(cls)]}' == '3star' or f'{model.names[int(cls)]}' == '4star' or
                        f'{model.names[int(cls)]}' == '5star'):

                    # print(f'Level is : {model.names[int(cls)]}')

                    # 식별 등급 저장
                    star = f'{model.names[int(cls)]}'
                    if (star_tmp == ''):
                        star_tmp = star

                    # 정확도 검사를 위한 n회 검증
                    if (star != ''):
                        # 서로 같은 등급일 경우
                        if (star == star_tmp):
                            star_stack += 1
                            star_tmp = star
                        # 서로 다른 등급일 경우
                        elif (star != star_tmp):
                            star_stack = 0
                            star_tmp = star
                    # print(star_stack)

                # 속성과 등급을 n회 이상 검사 후 동일하다고 판단되면 데이터 전송
                if (attribute_stack > 5 and star_stack > 5):
                    send_flag += 1

                if (send_flag == 1):
                    # websocket 데이터 송신 파트
                    print(f'This monster\'s attribute is {attribute} and level is {star}. Congratulation!')
                    # break

            else:
                detect_fail_flag += 1

    else:
        detect_fail_flag += 1
        # print('Nothing here')

        if (detect_fail_flag > 10):
            attribute_stack = 0
            star_stack = 0
            send_flag = 0

# 메모리를 해제
cv2.destroyAllWindows()
