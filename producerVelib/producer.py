import json
import time
import urllib.request

from kafka import KafkaProducer

producer = KafkaProducer(bootstrap_servers=["kafka1:29092","kafka2:29093","kafka3:29094"], api_version=(0, 10, 1))

req = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&rows=1500'

while True:
    a=0
    while a!=1:
        try:
            response = urllib.request.urlopen(req)
            a=1
        except:
            print('can t acces url api, sleep 10')
            time.sleep(10)

    api_velib = json.loads(response.read().decode())
    records=api_velib['records']
    for i in range(len(records)):
        station=records[i]
        infos_station=station['fields']
        station['fields']['broke_ebike'] = []
        station['fields']['broke_mechanical'] = []
        producer.send("velib", json.dumps(station).encode(), key=str(infos_station["stationcode"]).encode())
    print("{} Produced {} station records".format(time.time(), len(infos_station)))
    time.sleep(60)
