"""
2015/05/16
IBMHacks App
Bluespot
"""

# flask imports
from flask import Flask, request, session, url_for, redirect, render_template, abort, g, flash,\
    _app_ctx_stack, jsonify, send_from_directory
from werkzeug import check_password_hash, generate_password_hash
from flask.ext.restful import reqparse, abort, Api, Resource
import json


# user imports
from bluespot import app, db
from .database_helper import *
from .models import Logdata

# route for INDEX
@app.route("/")
def hello():
    return render_template('index.html')

# logging
@app.route("/logging")
def logging():
    return render_template('logging.html')

# api
@app.route("/api/sensor")
def get_sensor():
    jsondata = { "topic": "iot-2/type/iotsample-ti-bbst/id/784b87a3d007/evt/sample/fmt/json", "payload": "{\"sensortag\":{\"deviceId\":\"784b87a3d007\",\"time\":\"2015/05/16 17:34:47\",\"humi\":64.1,\"temp\":28.1,\"accelX\":-0.6,\"accelY\":-1.6,\"accelZ\":-5.4,\"gyroX\":-250,\"gyroY\":-170,\"gyroZ\":-116.9,\"objectTemp\":28.9,\"ambientTemp\":27.9,\"magX\":-61.7,\"magY\":60.4,\"magZ\":119.4,\"pressure\":1004.4},\"id\":\"b4994c64b44f\"}", "deviceId": "784b87a3d007", "deviceType": "iotsample-ti-bbst", "eventType": "sample", "format": "json", "_msgid": "ca84c263.357b4" }

    return jsonify(jsondata)

@app.route('/api/logging')
def logging_api():

    # get API parameters
    # get query
    q = request.args.get('q', "{}")
    q = json.loads(q)
    sensordata = request.args.get('sensordata', "{}")
    sensordata = json.loads(sensordata)
    if "payload" not in sensordata:
        return "sensor data error"
    s = json.loads(sensordata["payload"])["sensortag"]



    print "id: " + str(q["id"])
    print "gps: ", q["latitude"], q["longitude"]
    print "temp: ", s["temp"]

    logdata = Logdata(q["id"], q["latitude"], q["longitude"],\
         q["date"], s["humi"], s["temp"], s["accelX"], s["accelY"], s["accelZ"], s["gyroX"], s["gyroY"], s["gyroZ"], s["objectTemp"], s["ambientTemp"], s["magX"], s["magY"], s["magZ"], s["pressure"])
    db.session.add(logdata)
    db.session.commit()

    data = "OK"
    resp = data

    return resp

@app.route('/logview/<int:log_id>')
def logview(log_id=1):
    qry = Logdata.query.filter_by(log_id=log_id).all()

    data = jsonify({'data': [ r.as_dict() for r in qry ]})

    resp = data
    return resp

# tests
@app.route('/test')
def test_page():
    return "ok"


### static file helpers
# route for static js, css files
@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory(app.static_folder + '/js', path)
@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory(app.static_folder + '/css', path)
@app.route('/fonts/<path:path>')
def send_fonts(path):
    return send_from_directory(app.static_folder + '/fonts', path)
@app.route('/font-awesome/<path:path>')
def send_fontawesome(path):
    return send_from_directory(app.static_folder + '/font-awesome', path)
@app.route('/img/<path:path>')
def send_img(path):
    return send_from_directory(app.static_folder + '/img', path)
@app.route('/less/<path:path>')
def send_less(path):
    return send_from_directory(app.static_folder + '/less', path)
