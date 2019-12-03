
from flask import Flask, render_template, send_file, Markup
from flask_pymongo import PyMongo
import plotly
import plotly.graph_objs as go
import json
import pandas as pd
import numpy as np


app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'patent1'
app.config["MONGO_URI"] = "mongodb://localhost:27017/patent1"
mongo = PyMongo(app)

# render out an index page

@app.route("/")
def home():
    map_html = open('templates/patentmap.html', 'r').read()
    return render_template("index2.html", map_html = Markup(map_html))

@app.route("/world")
def world():
    return render_template("index2.html")


@app.route("/homepage")
def homepage():
    return render_template("index1.html")

@app.route("/more_patents")
def more_patents():
    return render_template("index.html")

@app.route("/states")
def states():
    return render_template("index.html")

@app.route("/patent_info")
def patent_info():
    return render_template("index1.html")


if __name__ == "__main__":
    app.run(debug=True)
