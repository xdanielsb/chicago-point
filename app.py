#!/usr/bin/python
__author__ = "Daniel Fernando Santos Bustos"
__license__ = "GPL V3"
__version__ = "1.0"
__maintainer__ = "Daniel Santos"
__email__ = "dfsantosbu@unal.edu.co"
__status__ = "Production"

"""
    =======================================
    Hello I'm Daniel, I think that open
    source is the right way to do things
    for that reason I share the project,
    I hope that this  be useful for
    your job.
    If you want  something similar don't
    hesitate to fork and star the project.
    Regards Daniel Santos.
    =======================================
"""

from flask import Flask, render_template, jsonify
from api_blueprint import api


app = Flask(__name__)
app.register_blueprint(api)


@app.route('/')
def browser ():
    """  Return the main page  with the main items """
    try:
        return render_template('browser.html')
    except Exception as e:
        return render_template('500.html',error=e)

@app.route('/about/')
def index():
    """  Return the page in order to know a bit of Chicago  """
    try:
        return render_template('about.html')
    except Exception as e:
        return render_template('500.html',error=e)

@app.route('/content/')
def content():
    """  Render the page with the map an the menu  """
    try:
        return render_template('content.html')
    except Exception as e:
        return render_template('500.html',error=e)

if __name__ =="__main__":
    print(__doc__)
    app.run(host="0.0.0.0", threaded=True)
