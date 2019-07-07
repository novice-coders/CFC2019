import serial
import requests
import json

ser = serial.Serial('COM4', 9600)
network_list = []
url='https://radiojocker-relaxed-cassowary.eu-gb.mybluemix.net/api/survivors'

while True:
    received_text = str(ser.readline(), 'utf-8')


    if ('hello' in received_text):
        network_list.append(received_text[6:].rstrip())
        print(network_list)
        response = requests.post(url,data=json.dumps(network_list))
# print(response.json())
