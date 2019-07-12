# This is your main script.

from time import sleep
from machine import PWM, Pin
import random
import json
import urequests
import Extensions as __ext
import gc
gc.enable()
from _thread import start_new_thread as thread
import time


# State gc

# State section
global L_state
L_state = True

# Global Variable
global c_BPM
c_BPM = 0
global BPM
global samp_size
samp_size = 4
global BPM_limit
BPM_limit = 200
BPM = []

#Global runtime
global global_runtime
global last_runtime
global_runtime = int(time.time())
last_runtime = int(time.time())

global max_threshold
max_threshold = 768


# Shut Up Beeper
#Beeper = PWM(Pin(26))
#Beeper.deinit()
BP = PWM(Pin(26), freq=0, duty=200)

print('Global Memory: {}'.format(gc.mem_free()))


def light_control(mode: str, debug: bool = False):
    R = __ext.R_LED
    G = __ext.G_LED
    B = __ext.B_LED
    global L_state

    if mode == 'N':
        R.value(0)
        G.value(0)
        B.value(0)
    if mode == 'R':
        R.value(1)
        G.value(0)
        B.value(0)
    if mode == 'G':
        R.value(0)
        G.value(1)
        B.value(0)
    if mode == 'B':
        R.value(0)
        G.value(0)
        B.value(1)
    if mode == 'flashR':
        if L_state:
            light_control('R')
            sleep(0.1)
            L_state = not L_state
        else:
            light_control('N')
            sleep(0.1)
            L_state = not L_state
    if mode == 'flashG':
        if L_state:
            light_control('G')
            sleep(0.1)
            L_state = not L_state
        else:
            light_control('N')
            sleep(0.1)
            L_state = not L_state

def beep(dura: float):
    #BP = PWM(Pin(26), freq=0, duty=200)
    BP.duty(50)
    BP.freq(1000)
    sleep(dura)
    BP.duty(0)


# State Light
light_control('G')



def h_read():
    h_s = __ext.H_sensor
    global samp_size
    global BPM
    global c_BPM
    global max_threshold
    reader = 0
    prog_start_milli = int(round(time.time() * 1000))
    reads = [0]
    n = 0    
    while True:
        # Calculate Average
        start_milli = int(round(time.time() * 1000)) - prog_start_milli
        while True:
            if (int(round(time.time() * 1000)) - prog_start_milli) - start_milli > 100:
                break
            reader = h_s.read()
            if reader >= max_threshold:
                reads.append(h_pro(mode=1))
                if reader > 4090:
                    light_control('flashR')
                    beep(0.1)
                    reads.pop()
                    reads.append(0)
                else:
                    light_control('flashG')

            elif reader < max_threshold:
                # No Input
                light_control('G')
                print('NO INPUT')
                n = 0
                BPM = []
                reads = []
                sleep(0.5)
                continue
            #sleep(0.02)
            sleep(0.02)

        print('Seconds: {}'.format(n))

        if len(reads) == 0:
            av = 0.0
        else:
            av = sum(reads)/len(reads)
        reads = []
        BPM.append([n, av])
        print('Heart Rate: {}'.format(av))
        av = 0

        if n == 59:
            headers = {'content-type': 'application/json'}
            mock_data = { 'data' : {
                            'heartrate': BPM
                            }
                        }
            BPM = []
            print('Routine Job Executed')
            # data = {'data': user_data}
            js = json.dumps(mock_data)
            gc.collect()
            res = urequests.request('POST', __ext.BASEURL, headers=headers, data=js)
            res.close()
            BPM = []
            n = 0
            reads = [0]
        n = n + 1
        
        sleep(1)


# def h_read_raw() -> object:
#     global samp_size
    
#     max_val = 4095
#     h_s = __ext.H_sensor
#     # Take the memory
#     reads = [0 for i in range(samp_size)]
#     sum_val = 0.00
#     now = 0
#     ptr = 0
#     last = 0.00
#     reader = 0.00
#     first = 0.00
#     second = 0.00
#     third = 0.00
#     before = 0.00
#     p_value = 0.00
#     rising = False
#     rise_count = 0
#     rise_threshold = 4
#     n = 0
#     last_beat = 0
#     reader = 0

#     prog_start_milli = int(round(time.time() * 1000))

#     while True:
#         # Calculate an average of sensor
#         # during 20ms period (eliminate the 50Hz noise cause by electric light)
#         n = 0
#         start_milli = int(round(time.time() * 1000)) - prog_start_milli
#         now = start_milli
#         print('Heartbeat Cycle\n')
#         while now < start_milli + 20:
#             reader += (h_s.read())
#             print('raw value: {}'.format(h_s.read()))
#             print('')
#             n += 1
#             now = int(round(time.time() * 1000)) - prog_start_milli
#         reader /= n  # Calculate Average
#         print('Average Voltage: {}\n'.format(reader))

#         # Subtract last reading from list and Add new reading
#         # to maintain sum of last measurement
#         sum_val -= reads[ptr]
#         sum_val += reader
#         reads[ptr] =  reader  # Add newest measure to list
#         last = sum_val /samp_size  # last now hold last average

#         # Check for rising
#         if last > before:
#             rise_count += 1
#             if (not rising and rise_count >= rise_threshold):
#                 # Record time since last beat but keep track of two previous
#                 first = (int(round(time.time() * 1000)) - prog_start_milli) - last_beat
#                 last_beat = int(round(time.time() * 1000)) - prog_start_milli
#                 # Flag the rise
#                 rising = True
#                 # Calculate the weighted average of heartbeat rate
#                 p_value = 60000.0 / ((0.4 * first) + (0.3 * second ) + (0.3 * third))
#                 print(p_value)
#                 third = second
#                 second = first
#         # Falling!
#         else:
#             rising = False
#             rise_count = 0
#         before = last
#         ptr += 1
#         ptr %= samp_size

def h_pro(mode):
    # User Insert Finger
    if mode == 1:
        val = random.randint(60, 180)
    if mode == 2:
        val = random.randint(190, 220)
    return val

def connect():
    __ext.station.active(True)
    __ext.station.connect(__ext.SSID, __ext.PWD)
    
    while not __ext.station.isconnected():
        __ext.station.connect(__ext.SSID, __ext.PWD)
        print('Connecting ...\n')
        sleep(2)
    if __ext.station.isconnected():
        print('Connected\n')
    
    while __ext.station.isconnected():
        sleep(60)
        print('Still Connected\n')
    if not __ext.station.isconnected():
        connect()

def alarmsys(c_BPM):
    print('Alarm System Initiated\n')
    if toggle:
        if c_BPM > BPM_limit:
            print('ALERT!')
            beep(0.1)
            light_control('flashR')
        else:
            light_control('green')
            sleep(0.1)


# Main Execution
thread(connect, ())
thread(h_read, ())