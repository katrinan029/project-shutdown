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
    return render_template("index_app.html")

@app.route("/get_data")
def data_sf():
    print('Working')
    #Establish connection with the database
    engine = create_engine('postgresql://postgres:'+ pswd + '@localhost:5432/sfbusiness_db')
    connection = engine.connect()

    results = pd.read_sql('SELECT * FROM sf_business LIMIT 20', connection)
    
    return jsonify((results).to_dict("record"))



if __name__ == '__main__':
    app.run(debug=True)

