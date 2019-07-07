import subprocess
import re
import serial
import time

class line_matcher:
    def __init__(self, regexp, handler):
        self.regexp  = re.compile(regexp)
        self.handler = handler

def handle_new_network(line, result, networks):
    networks.append({})
    networks[-1]['Address'] = result.group(1)

def handle_essid(line, result, networks):
    networks[-1]['ESSID'] = result.group(1)
    
def handle_signal_strength(line, result, networks):
    networks[-1]['Signal'] = result.group(1)

def getNetworks():
    proc = subprocess.Popen(['/sbin/iwlist', 'wlan0', 'scan'], stdout=subprocess.PIPE)
    stdout, stderr =  proc.communicate()
    lines = stdout.split('\n')
    networks = []
    matchers = []

    matchers.append(line_matcher(r'\s+Cell \d+ - Address: (\S+)',
                                 handle_new_network))
    
    matchers.append(line_matcher(r'\s+ESSID:"([^"]+)"', 
                                 handle_essid))
    
    matchers.append(line_matcher(r'\s+Quality: ',
                                 handle_signal_strength))

    for line in lines:
        for m in matchers:
            result = m.regexp.match(line)
            if result:
                m.handler(line, result, networks)
                break

    for network in networks:
        comm = serial.Serial('/dev/ttyUSB0', 9600)
        comm.close()
        comm.open()
        comm.write(str(network))
        comm.close()
        time.sleep(2)

    return networks

print(getNetworks())