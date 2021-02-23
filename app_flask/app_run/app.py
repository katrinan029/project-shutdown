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

    results = pd.read_sql('SELECT * FROM sf_business', connection)

    # Create dictionary for business type counts fo
    business_group = results.groupby(['busi_type'])['busi_start_dt'].apply(pd.Series.value_counts)
    business_frame = business_group.to_frame().reset_index().rename(columns={"level_1":"busi_start_dt","busi_start_dt":"busi_count"})
    # busitype_yearcount = business_frame.set_index('busi_type')
    # busi_type_dict = business_index.to_dict('index')

    return jsonify((business_frame).to_dict('records'))
    
    # return jsonify((results).to_dict("record"))



if __name__ == '__main__':
    app.run(debug=True)

