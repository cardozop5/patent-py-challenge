
from flask import Flask, render_template, send_file, Markup


app = Flask(__name__)

# render out an index page

@app.route("/")
def home():
    map_html = open('templates/patentmap.html', 'r').read()
    return render_template("index2.html", map_html = Markup(map_html))

@app.route("/homepage")
def homepage():
    return render_template("index1.html")

@app.route("/states")
def states():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
