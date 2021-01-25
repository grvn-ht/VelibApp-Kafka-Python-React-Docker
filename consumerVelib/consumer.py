import json
from kafka import KafkaConsumer

stations={}
timeMemory=''
i=0

monitor={}

brokenE={}
brokenM={}

countmemory=[]

consumer = KafkaConsumer("velib", bootstrap_servers=['kafka1:29092','kafka2:29093','kafka3:29094'], group_id="velib-monitor-stations", api_version=(0, 10, 1))

for message in consumer:

    station = json.loads(message.value.decode())

    infos_station = station['fields']
    station_number = infos_station["stationcode"]
    try:
      city = infos_station["nom_arrondissement_communes"]
    except:
      print(station_number)
    available_bike_stands = infos_station["numbikesavailable"]

    if city not in monitor:
        monitor[city] = {}
    city_stations = monitor[city]
    if station_number not in city_stations:
        city_stations[station_number] = available_bike_stands

    count_diff = available_bike_stands - city_stations[station_number]
    if count_diff != 0:
        city_stations[station_number] = available_bike_stands
        #print("{}{} {} ({})".format("+" if count_diff > 0 else "",count_diff, infos_station["name"], city))

    if count_diff < 0: #si un velib sort de la station ça veut dire qu'elle est en état de fonctionner!
        countmemory.append(station_number)
        #infos_station["is_returning"]="OUI" #PAS BON il faut changer la variable de velib.json

    time=station['record_timestamp']

    if time != timeMemory:
      print('new file')
      name = "velib_"+timeMemory
      name_S = "velib_app_"+timeMemory
      filename = "/usr/src/app/data/historyVelib/%s.json" % name
      filename_S = "/usr/src/app/data/historyVelibApp/%s.json" % name_S
      with open(filename, 'w') as json_file:
        json.dump(stations, json_file)
      json_file.close()

      #save les données de l'app:
      with open("/usr/src/app/data/velib.json", 'r') as json_file:
        json_data = json.load(json_file)
      json_file.close()
      with open(filename_S, 'w') as save_app:
        json.dump(json_data, save_app)
      save_app.close()

      #remettre les données de l'app sur bdd api:
      data_app_save = json_data
      for data_api in stations:
        for data_app in data_app_save:
          if data_app_save[data_app]['fields']['stationcode']==stations[data_api]['fields']['stationcode']:
            stations[data_api]['fields']['broke_ebike']=data_app_save[data_app]['fields']['broke_ebike']
            stations[data_api]['fields']['broke_mechanical']=data_app_save[data_app]['fields']['broke_mechanical']
            stations[data_api]['fields']['is_returning']=data_app_save[data_app]['fields']['is_returning']

            be=len(stations[data_api]['fields']['broke_ebike'])
            bm=len(stations[data_api]['fields']['broke_mechanical'])
            e=stations[data_api]['fields']["ebike"]
            m=stations[data_api]['fields']["mechanical"]
            diffe=e-be
            diffm=m-bm
            #!!!!!!!!!!! Ne foncyionne pas!!!!!!!!!!!!!!!!!!!! il faut tester!!!!
            if diffe<0:
              print('whatttt')
              print(be)
              print(e)
              for diff in range(-diffe):
                stations[data_api]['fields']["broke_ebike"].pop(-1)
                #del stations[data_api]['fields']['broke_ebike'][0] #si il y a plus de vélos que de broken à la station, enlever les broken dans le sens du dernier arrivé.
                print(stations[data_api]['fields']['broke_ebike'])
            
            if diffm<0:
              print(bm)
              print(m)
              for diff in range(-diffm):
                stations[data_api]['fields']["broke_mechanical"].pop(-1)

      #print(stations)

      #changer le statut de la station si un vélib a été retiré:
      j=0
      for item in stations:
        j=j+1
        if stations[item]['fields']['stationcode'] in countmemory:
          stations[item]['fields']['is_returning']= 'OUI' # reboot le bloquage d'une station si un velib part de la station

      if stations != {}:
        with open("/usr/src/app/data/velib.json", 'w') as json_file:
          json.dump(stations, json_file)
        json_file.close()


      timeMemory = time
      i=0
      stations={}
      countmemory=[]
      brokenE={}
      brokenM={}
      stations[i]= station
      i=i+1

    else:
      #print(i)
      stations[i]= station
      i=i+1


"""       if j != i: #intègre toutes les stations dans fichier velib si il en manque en prenant comme ref le dernier fichier velib
        for item in json_data:
          for item in stations:
            if stations[item]['fields']['stationcode']==json_data[item]['fields']['stationcode']:
              stations[item]['fiels']=json_data[item]['fields']
        with open("/usr/src/app/data/velib.json", 'w') as json_file:
          json.dump(stations, json_file)
        json_file.close()
      else:
        with open("/usr/src/app/data/velib.json", 'w') as json_file:
          json.dump(json_data, json_file)
        json_file.close()
        
    be=infos_station["broke_ebike"]
    bm=infos_station["broke_mechanical"]

    if be != []:
      for k in range(len(be)):
        brokenE[be[k]]=station_number
    if bm != []:
      for k in range(len(bm)):
        brokenM[bm[k]]=station_number

      with open("/usr/src/app/data/brokenE.json", 'w') as json_file:
        json.dump(brokenE, json_file)
      json_file.close()

      with open("/usr/src/app/data/brokenM.json", 'w') as json_file:
        json.dump(brokenM, json_file)
      json_file.close()

            be=len(stations[data_api]['fields']['broke_ebike'])
            bm=len(stations[data_api]['fields']['broke_mechanical'])
            e=stations[data_api]['fields']["ebike"]
            m=stations[data_api]['fields']["mechanical"]
            diffe=e-be
            diffm=m-bm
            #!!!!!!!!!!! Ne foncyionne pas!!!!!!!!!!!!!!!!!!!!
            if diffe<0:
                print(be)
                print(e)
                for diff in range(diffe):
                  stations[data_api]['fields']['broke_ebike'].pop(-1) #si il y a plus de vélos que de broken à la station, enlever les broken dans le sens du dernier arrivé.
            
            if diffm<0:
                print(bm)
                print(m)
                for diff in range(diffm):
                  stations[data_api]['fields']["broke_mechanical"].pop(-1)
 """