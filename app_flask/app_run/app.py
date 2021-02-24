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

    # Group by business type and value count by business start date
    business_group = results.groupby(['busi_type'])['busi_start_dt'].apply(pd.Series.value_counts)
    business_frame = business_group.to_frame().reset_index().rename(columns={"level_1":"busi_start_dt","busi_start_dt":"busi_count"})

    #Split year from business start date
    fix = list(business_frame["busi_start_dt"])
    fix2 = [x.split("/") for x in fix]
    busi_start_year_list = [x[2] for x in fix2]
    newcol = pd.DataFrame(busi_start_year_list)

    # Concat split year with business type df
    year_df = pd.concat([business_frame, newcol], axis=1)
    year_df = year_df.rename(columns={0:"busi_start_year"})

    # Group by year and value count by business type
    business_final = year_df.groupby(['busi_start_year'])['busi_type'].apply(pd.Series.value_counts)
    busitype_final = business_final.to_frame().reset_index().rename(columns={"level_1":"busi_type","busi_type":"busi_count"})
    # Filter values for years > 2009
    busitype_final = busitype_final[ busitype_final['busi_start_year'] >'2009' ]

    return jsonify((busitype_final).to_dict('records'))
    
    # return jsonify((results).to_dict("record"))



if __name__ == '__main__':
    app.run(debug=True)

