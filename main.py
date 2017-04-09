"""This module control the application."""

from flask import Flask, render_template, jsonify
from request import *

app = Flask(__name__)


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
    return render_template('charts.html')



"""
    Methods for the custom API
"""

@app.route('/houses/')
def houses():
    houses = get_houses()
    return jsonify(houses)

@app.route('/health/')
def health():
    health = get_health_statistics()
    return jsonify(health)

@app.route("/weather/")
def weather():
    weather = get_weather()
    return jsonify(weather)


if __name__ =="__main__":
    app.run(debug=True)
