# This is your main script.

from time import sleep
from machine import PWM, Pin
import json
import urequests
import Extensions as __ext

from _thread import start_new_thread as thread
import time

# State section
global L_state
L_state = True

# Global Variable
global samp_size
samp_size = 4

#Global runtime
global global_runtime
global last_runtime
global_runtime = int(time.time())
last_runtime = int(time.time())

# Shut Up Beeper
Beeper = PWM(Pin(26))
Beeper.deinit()

# State Light

def h_read() -> object:
    global samp_size
    
    max_val = 4095
    h_s = __ext.H_sensor
    # Take the memory
    reads = [0 for i in range(samp_size)]
    sum_val = 0.00
    now = 0
    ptr = 0
    last = 0.00
    reader = 0.00
    first = 0.00
    second = 0.00
    third = 0.00
    before = 0.00
    p_value = 0.00
    rising = False
    rise_count = 0
    rise_threshold = 4
    n = 0
    last_beat = 0
    reader = 0

    prog_start_milli = int(round(time.time() * 1000))

    while True:
        # Calculate an average of sensor
        # during 20ms period (eliminate the 50Hz noise cause by electric light)
        n = 0
        start_milli = int(round(time.time() * 1000)) - prog_start_milli
        now = start_milli
        print('Heartbeat Cycle\n')
        while now < start_milli + 20:
            reader += (h_s.read())
            n += 1
            now = int(round(time.time() * 1000)) - prog_start_milli
        reader /= n  # Calculate Average
        print('Average Voltage: {}\n'.format(reader))

        # Subtract last reading from list and Add new reading
        # to maintain sum of last measurement
        sum_val -= reads[ptr]
        sum_val += reader
        reads[ptr] =  reader  # Add newest measure to list
        last = sum_val /samp_size  # last now hold last average

        # Check for rising
        if last > before:
            rise_count += 1
            if (not rising and rise_count > rise_threshold):
                # Record time since last beat but keep track of two previous
                first = (int(round(time.time() * 1000)) - prog_start_milli) - last_beat
                last_beat = int(round(time.time() * 1000)) - prog_start_milli
                # Flag the rise
                rising = True
                # Calculate the weighted average of heartbeat rate
                p_value = 60000.0 / ((0.4 * first) + (0.3 * second ) + (0.3 * third))
                print(p_value)
                third = second
                second = first
        # Falling!
        else:
            rising = False
            rise_count = 0
        before = last
        ptr += 1
        ptr %= samp_size

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
    if mode == 'flash':
        if L_state:
            light_control('R')
            sleep(0.1)
            L_state = not L_state
        else:
            light_control('N')
            sleep(0.1)
            L_state = not L_state

def beep(dura: float):
    BP = __ext.BEEPER
    BP.freq(50)
    sleep(dura)
    BP.deinit()

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

def alarmsys():
    print('Alarm System Initiated\n')
    while True:
        if c_BPM > BPM_limit:
            print('ALERT!')
            beep(0.1)
            lightcontrol('flash')
        else:
            lightcontrol('green')
            sleep(0.1)

def send_userdata():
    global global_runtime
    global last_runtime
    trigger = True
    while True:
        global_runtime = int(time.time())        
        if global_runtime > last_runtime + 60 or trigger:
            headers = {'content-type': 'application/json'}
            mock_data = { 'data' : {
                            'heartrate': [[0, 118], [1, 195], [2, 77], [3, 80], [4, 187], [5, 120], 
                                        [6, 81], [7, 148], [8, 200], [9, 115], [10, 94], [11, 157], 
                                        [12, 164], [13, 70], [14, 169], [15, 195], [16, 86], [17, 94], 
                                        [18, 76], [19, 91], [20, 115], [21, 120], [22, 88], [23, 77], 
                                        [24, 153], [25, 82], [26, 163], [27, 159], [28, 157], [29, 193], 
                                        [30, 193], [31, 135], [32, 174], [33, 107], [34, 74], [35, 132], 
                                        [36, 178], [37, 185], [38, 93], [39, 83], [40, 190], [41, 178], 
                                        [42, 107], [43, 184], [44, 124], [45, 125], [46, 99], [47, 200], 
                                        [48, 158], [49, 162], [50, 133], [51, 174], [52, 77], [53, 104], 
                                        [54, 139], [55, 173], [56, 185], [57, 128], [58, 74], [59, 71]]
                            }
                        }
            print('Routine Job Executed')
            # data = {'data': user_data}
            js = json.dumps(mock_data)
            r = urequests.request('POST', __ext.BASEURL, headers=headers, data=js)
            print(result.json())
            last_runtime = int(time.time())
            trigger = True
            sleep(60)
        else:
            last_runtime = int(time.time())            
            sleep(60)
            trigger = True

# Main Execution
thread(send_userdata, ())
thread(connect, ())
thread(h_read, ())