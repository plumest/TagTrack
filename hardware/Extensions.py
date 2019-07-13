from machine import Pin, ADC, PWM
import network

R_LED = Pin(21, Pin.OUT)
G_LED = Pin(19, Pin.OUT)
B_LED = Pin(18, Pin.OUT)

H_sensor = ADC(Pin(32))
H_sensor.atten(ADC.ATTN_11DB)

# Serverside

BASEURL = 'https://exceed.superposition.pknn.dev/data/jitrada'
SSID = 'exceed16_9'
PWD = '12345678'
station = network.WLAN(network.STA_IF)

# Alarm Sys