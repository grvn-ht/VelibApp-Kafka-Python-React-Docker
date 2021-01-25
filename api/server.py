import bottle
import json
from bottle import route, run
from datetime import datetime
from operator import itemgetter
from kafka import KafkaProducer



def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        # set CORS headers
        bottle.response.headers['Access-Control-Allow-Origin'] = '*'
        bottle.response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
        bottle.response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

        if bottle.request.method != 'OPTIONS':
            # actual request; reply with the actual response
            return fn(*args, **kwargs)

    return _enable_cors


@route('/hello')
@enable_cors
def hello():
    return "Hello World!"


@route('/popup')
@enable_cors
def popup():

    try:
        with open("/usr/src/app/data/velib.json", "r") as read_file:
            data = json.load(read_file)
        read_file.close()
        return json.dumps(data)
    except ValueError:
        bottle.response.status = ValueError
        return

        
@bottle.route("/state", method='POST')
@enable_cors
def state() :
    try:
        try:
            print('e1!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            da = bottle.request.body.read()
            data = json.loads(da.decode('utf-8'))
            print(data)
        except:
            raise ValueError

        if data is None:
            raise ValueError

    except ValueError:
        # if bad request data, return 400 Bad Request
        bottle.response.status = ValueError
        return
    
    except KeyError:
        # if name already exists, return 409 Conflict
        bottle.response.status = 409
        return
    # return 200 Success
    data['time']=str(datetime.now())
    producer = KafkaProducer(bootstrap_servers=['kafka1:29092','kafka2:29093','kafka3:29094'], api_version=(0, 10, 1))
    #producer = KafkaProducer(bootstrap_servers=["kafka1:29092","kafka2:29093","kafka3:29094"], api_version=(0, 10, 1))
    producer.send("bug", json.dumps(data).encode(), key=str(data['code']).encode())
    print('ok')

@bottle.route("/coor", method='POST')
@enable_cors
def coor() :
    try:
        try:
            print('e1!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            da = bottle.request.body.read()
            data = json.loads(da.decode('utf-8'))
            print(data)
        except:
            raise ValueError

        if data is None:
            raise ValueError

        # extract and validate name
        try:
            print('e2!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            lat = float(data['lat'])
            lng = float(data['lng'])
        except (TypeError, KeyError):
            raise ValueError

    except ValueError:
        # if bad request data, return 400 Bad Request
        bottle.response.status = ValueError
        return
    
    except KeyError:
        # if name already exists, return 409 Conflict
        bottle.response.status = 409
        return
            
    # return 200 Success

    with open("/usr/src/app/data/velib.json", "r") as read_file:
        dataa = json.load(read_file)

    read_file.close()

    coo=[]
    for key in dataa:
        co = []
        station=dataa[key]
        field = station["fields"]
        num = int(field["numbikesavailable"])
        state = field["is_returning"]
        broke_velib=len(field["broke_ebike"])+len(field["broke_mechanical"]) #on inclut les vélos cassés dans le calcul des stations dispo
        num = num - broke_velib
        if num <= 0:
            continue
        else:
            latlng = field["coordonnees_geo"]
            latt = float(latlng[0])
            lngg = float(latlng[1])

            dist = ( (lat-latt)**2 + (lng-lngg)**2 )**(0.5)
            co.append(dist)
            co.append(field)
            co.append(state)
        coo.append(co)

    nn = sorted(coo, key=itemgetter(0))

    yyy=[]
    yy=[]
    y=[]
    for i, n in enumerate(nn[:5]):
        if n[2] != 'OUI' :
            yy.append(n[1])
        else :
            y.append(n[1])

    yyy=y+yy
    print(yyy)
 
    bottle.response.headers['Content-Type'] = 'application/json',

    stationsproches = {}

    for i in range(5):
        stationsproches[i]= yyy[i]

    return json.dumps(stationsproches)


bottle.run(bottle.app(), host='0.0.0.0', port=7000, server='gunicorn', debug= True, reloader=True)