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

@app.route('/recommend/')
def recommend():
    return render_template('recomendations.html')

@app.route('/charts/')
def charts():
    labels, values,colors = request_object.get_number_by_comunity()
    police_stations = request_object.get_info_police_stations()
    cost_neighborhood = request_object.get_cost_table_neighborhood()

    return render_template('charts.html', labels=labels, values=values, colors=colors, police_stations= police_stations, cost_neighborhood=cost_neighborhood)


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



@app.route("/libraries/")
def libraries_dat():
    info= request_object.get_locations_libraries()
    return jsonify(info)

@app.route("/parks/")
def parks():
    info= request_object.get_location_parks()
    return jsonify(info)

@app.route("/info_comunities/")
def info_comun():
    info = request_object.get_information_comunity()
    return jsonify(info)

@app.route("/location_police_stations/")
def location_stations():
    info = request_object.get_locations_police_stations()
    return jsonify(info)

@app.route("/health/")
def info_health_center():
    info = request_object.get_locations_health_center()
    return jsonify(info)


@app.route("/weatherzip/<zipcode>")
def weather_zip(zipcode):
    info = request_object.get_weather2(zipcode)
    return jsonify(info)


if __name__ =="__main__":
    app.run(debug=True, host="0.0.0.0", port=5000, threaded=True)
