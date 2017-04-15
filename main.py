"""This module control the application."""

from flask import Flask, render_template, jsonify
from request import *

app = Flask(__name__)

"""
    Create no heavy request at the init of the application
"""

request_object = Request()


@app.route('/')
def browser ():
    return render_template('browser.html')

@app.route('/about/')
def index():
    return render_template('about.html')

@app.route('/content/')
def content():
    return render_template('content.html')

@app.route('/charts/')
def charts():
    labels, values,colors = request_object.get_number_by_comunity()
    return render_template('charts.html', labels=labels, values=values, colors=colors)



"""
    Methods for the custom API
"""

@app.route('/location_houses/')
def location_houses():
    locs = request_object.get_locations_houses()
    return locs

@app.route("/weather/")
def weather():
    weather_data = request_object.get_weather()
    return jsonify(weather_data)

@app.route("/info_comunities/")
def info_comun():
    info = request_object.get_information_comunity()
    return jsonify(info)

@app.route("/location_police_stations/")
def location_stations():
    info = request_object.get_locations_police_stations()
    return jsonify(info)


if __name__ =="__main__":
    app.run(debug=True, host="0.0.0.0", port=5000, threaded=True)
