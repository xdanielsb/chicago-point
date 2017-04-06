"""This module control the application."""

from flask import Flask, render_template

app = Flask(__name__)
app.config['DEBUG'] = False

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

if __name__ =="__main__":
    app.run(debug=True)
