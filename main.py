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
"""
    Create no heavy request at the init of the application
"""


@app.route('/')
def browser ():
    return render_template('browser.html')

@app.route('/about/')
def index():
    return render_template('about.html')

@app.route('/content/')
def content():
    return render_template('content.html')


if __name__ =="__main__":
    print(__doc__)
    app.run(debug=True, host="0.0.0.0", port=5000, threaded=True)
