import numpy as np
import pandas as pd
import json
import datetime
from ps_wd import pswd

import sqlalchemy
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from flask import Flask, render_template

# Flask Setup
app = Flask(__name__)

# Flask Routes
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/datasf")
def data_sf():
    print('Working')
    #Establish connection with the database
    engine = create_engine('postgresql://postgres:'+ pswd + '@localhost:5432/sf_db')
    connection = engine.connect()

    results = pd.read_sql('select * from sf_data', connection)
    
    return jsonify((results).to_dict())



if __name__ == '__main__':
    app.run(debug=True)

