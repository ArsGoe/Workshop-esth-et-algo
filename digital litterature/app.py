from flask import Flask, render_template, request
import json
from util import get_haikus, get_synonyms_haikus, get_antonyms_haikus

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():
    value = request.args.get("value", "") 
    column = request.args.get("column", "")

    angry = request.args.get(">:(")

    
    if not angry:
        haikus = get_haikus(column=column, value=value)
        if not haikus :
            synonims = get_synonyms_haikus(column=column, value=value)
            return render_template("index.html", haikus=haikus, search=value, synonims=synonims)
        return render_template("index.html", haikus=haikus, search=value)
    else : 
        haikus = get_antonyms_haikus(column=column, value=value)
    return render_template("index.html", haikus=haikus, search=value, angry=angry)
    

if __name__ == "__main__":
    app.run(debug=True)
