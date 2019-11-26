
from flask import Flask, render_template, send_file


app = Flask(__name__)

# render out an index page

@app.route("/")

def home():
    map_html = with open('patentmap.html', 'r')
    return render_template("patentmap.html", map_html = Markup(map_html))


if __name__ == "__main__":

    app.run(debug=True)