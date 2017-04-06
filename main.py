"""This module control the application."""

from flask import Flask, render_template, jsonify
from request import *

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/browser/')
def browser ():
    return render_template('browser.html')

@app.route('/content/')
def content():
    return render_template('content.html')

@app.route('/charts/')
def charts():
    return render_template('facade.html')

@app.route('/houses/')
def houses():
    houses = get_houses()
    return jsonify(houses)

if __name__ =="__main__":
    app.run(debug=True)
