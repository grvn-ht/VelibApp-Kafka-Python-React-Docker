import json
from kafka import KafkaConsumer

consumer = KafkaConsumer("bug", bootstrap_servers=['kafka1:29092','kafka2:29093','kafka3:29094'], group_id="velib-monitor-bug", api_version=(0, 10, 1))

for message in consumer:

    bug = json.loads(message.value.decode())

    SA=bug['station active']
    Vel=bug['velib']

    if SA!='':

      code=bug['code']

      with open("/usr/src/app/data/bug.json", 'a') as json_file:
        json.dump(bug, json_file)

      json_file.close()

      with open("/usr/src/app/data/velib.json", 'r') as json_file:
        json_data = json.load(json_file)
        for item in json_data:
          if json_data[item]['fields']['stationcode']==code:
            json_data[item]['fields']['is_returning']=SA
            save=json_data[item]['fields']
            print(json_data[item]['fields']['is_returning'])

      json_file.close()
      with open("/usr/src/app/data/velib.json", 'w') as json_file:
        json.dump(json_data, json_file)
      json_file.close()
    
    else:

      code=bug['code']
      code=code[1:]
      vKey=bug['vKey']
      print(code)

      with open("/usr/src/app/data/bug-velib.json", 'a') as json_file:
        json.dump(bug, json_file)

      json_file.close()

      if Vel=='M':
        with open("/usr/src/app/data/brokenM.json", 'r') as bm:
          brokenM = json.load(bm)
        bm.close()

        codeBis=''
        if vKey in brokenM and code != brokenM[vKey]:
          codeBis=brokenM[vKey]
          brokenM[vKey]=code #on actualise la valeur de la nouvelle station ou se trouve le vélib cassé
        else:
          brokenM[vKey]=code

        with open("/usr/src/app/data/brokenM.json", 'w') as json_file:
          json.dump(brokenM, json_file)
        json_file.close()

        with open("/usr/src/app/data/velib.json", 'r') as json_file:
          json_data = json.load(json_file)
          for item in json_data:
            if json_data[item]['fields']['stationcode']==code and vKey not in json_data[item]['fields']['broke_mechanical']:
              json_data[item]['fields']['broke_mechanical'].append(vKey)
              diffm=json_data[item]['fields']['mechanical']-len(json_data[item]['fields']['broke_mechanical'])
              if diffm<0:
                json_data[item]['fields']['broke_mechanical'].pop(-1) #si il y a plus de vélos que de broken à la station, enlever les broken dans le sens du dernier arrivé.
            elif json_data[item]['fields']['stationcode']==codeBis: #on enlève la référence du velib casse qui est maintenant dans une autre station
              json_data[item]['fields']['broke_mechanical'].remove(vKey)

        json_file.close()
        with open("/usr/src/app/data/velib.json", 'w') as json_file:
          json.dump(json_data, json_file)
        json_file.close()

      else:
        with open("/usr/src/app/data/brokenE.json", 'r') as be:
          brokenE = json.load(be)
        be.close()

        codeBis=''
        if vKey in brokenE and code != brokenE[vKey]:
          codeBis=brokenE[vKey]
          brokenE[vKey]=code #on actualise la valeur de la nouvelle station ou se trouve le vélib cassé
        else:
          brokenE[vKey]=code

        with open("/usr/src/app/data/brokenE.json", 'w') as json_file:
          json.dump(brokenE, json_file)
        json_file.close()

        with open("/usr/src/app/data/velib.json", 'r') as json_file:
          json_data = json.load(json_file)
          for item in json_data:
            if json_data[item]['fields']['stationcode']==code and vKey not in json_data[item]['fields']['broke_ebike']:
              json_data[item]['fields']['broke_ebike'].append(vKey)
              diffe=json_data[item]['fields']['ebike']-len(json_data[item]['fields']['broke_ebike'])
              if diffe<0:
                json_data[item]['fields']['broke_ebike'].pop(-1) #si il y a plus de vélos que de broken à la station, enlever les broken dans le sens du dernier arrivé.
            elif json_data[item]['fields']['stationcode']==codeBis:
              json_data[item]['fields']['broke_ebike'].remove(vKey)

        json_file.close()
        with open("/usr/src/app/data/velib.json", 'w') as json_file:
          json.dump(json_data, json_file)
        json_file.close()
