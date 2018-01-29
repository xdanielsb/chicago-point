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
    """
        Return page with recommendations
            -nearest places
            -cheapest places
    """
    try:
        nearest_places = request_object.get_nearest_locations()
        cheapest_places = request_object.get_cheapest_comunities()
        return render_template('recomendations.html', nearest_places=nearest_places, cheapest_places= cheapest_places)
    except Exception as e:
        return render_template('500.html',error=e)

@api.route('/charts/')
def charts():
    """
        Return page with cards that show information
            - Police_stations
            - Healthy per comunity
            - Cost per neighborhood
            ...
    """
    try:
        labels, values,colors = request_object.get_number_by_comunity()
        police_stations = request_object.get_info_police_stations()
        cost_neighborhood = request_object.get_cost_table_neighborhood()
        return render_template('charts.html', labels=labels, values=values, colors=colors, police_stations= police_stations, cost_neighborhood=cost_neighborhood)
    except Exception as e:
        return render_template('500.html',error=e)


@api.route('/location_houses/')
def location_houses():
    """
        API method to get location of the houses in Chicago
    """
    try:
        locs = request_object.get_locations_houses()
        return locs
    except Exception as e:
        return render_template('500.html',error=e)


@api.route("/libraries/")
def libraries_dat():
    """
        API method to get the libraries
    """
    try:
        info= request_object.get_locations_libraries()
        return jsonify(info)
    except Exception as e:
        return render_template('500.html',error=e)

@api.route("/parks/")
def parks():
    """
        API method to get the parks in Chicago
    """
    try:
        info= request_object.get_location_parks()
        return jsonify(info)
    except Exception as e:
        return render_template('500.html',error=e)

@api.route("/info_comunities/")
def info_comun():
    """
        API method to get the information of each comunity
            - Healthy rates per comunity
    """
    try:
        info = request_object.get_information_comunity()
        return jsonify(info)
    except Exception as e:
        return render_template('500.html',error=e)

@api.route("/location_police_stations/")
def location_stations():
    """
        API method to get the location of police stations
    """
    try:
        info = request_object.get_locations_police_stations()
        return jsonify(info)
    except Exception as e:
        return render_template('500.html',error=e)

@api.route("/health/")
def info_health_center():
    """
        API method to get the location of health centers in Chicago
    """
    try:
        info = request_object.get_locations_health_center()
        return jsonify(info)
    except Exception as e:
        return render_template('500.html',error=e)

@api.route("/weatherzip/<zipcode>")
def weather_zip(zipcode):
    """
        API method to get the weather given a zipcode
    """
    try:
        info = request_object.get_weather2(zipcode)
        return jsonify(info)
    except Exception as e:
        return render_template('500.html',error=e)
