from flask import Flask, render_template, send_file, Markup

import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, 
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/bellybutton.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
assignee = Base.classes.Top_Org_in_US_WPatent

# render out an index page

@app.route("/")
def home():
    map_html = open('templates/patentmap.html', 'r').read()
    return render_template("index1.html", map_html = Markup(map_html))

@app.route("/names")
def names():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(assignee).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (sample names)
    return jsonify(list(df.columns)[2:])

if __name__ == "__main__":
    app.run(debug=True)

    

#################################################
# Database Setup
#################################################



