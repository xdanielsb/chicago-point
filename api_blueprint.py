#!/usr/bin/python
__author__ = "Daniel Fernando Santos Bustos"
__license__ = "MIT"
__version__ = "1.0"
__maintainer__ = "Daniel Santos"
__email__ = "dfsantosbu@unal.edu.co"
__status__ = "Production"

from flask import Blueprint, render_template, abort, jsonify
from jinja2 import TemplateNotFound
from request import *

api = Blueprint('api', __name__,
                        template_folder='templates')

request_object = Request()

@api.route('/recommend/')
def recommend():
    nearest_places = request_object.get_nearest_locations()
    cheapest_places = request_object.get_cheapest_comunities()
    return render_template('recomendations.html', nearest_places=nearest_places, cheapest_places= cheapest_places)

@api.route('/charts/')
def charts():
    labels, values,colors = request_object.get_number_by_comunity()
    police_stations = request_object.get_info_police_stations()
    cost_neighborhood = request_object.get_cost_table_neighborhood()

    return render_template('charts.html', labels=labels, values=values, colors=colors, police_stations= police_stations, cost_neighborhood=cost_neighborhood)

"""
    Methods for the custom API
"""

@api.route('/location_houses/')
def location_houses():
    locs = request_object.get_locations_houses()
    return locs

@api.route("/weather/")
def weather():
    weather_data = request_object.get_weather()
    return jsonify(weather_data)

@api.route("/libraries/")
def libraries_dat():
    info= request_object.get_locations_libraries()
    return jsonify(info)

@api.route("/parks/")
def parks():
    info= request_object.get_location_parks()
    return jsonify(info)

@api.route("/info_comunities/")
def info_comun():
    info = request_object.get_information_comunity()
    return jsonify(info)

@api.route("/location_police_stations/")
def location_stations():
    info = request_object.get_locations_police_stations()
    return jsonify(info)

@api.route("/health/")
def info_health_center():
    info = request_object.get_locations_health_center()
    return jsonify(info)


@api.route("/weatherzip/<zipcode>")
def weather_zip(zipcode):
    info = request_object.get_weather2(zipcode)
    return jsonify(info)
