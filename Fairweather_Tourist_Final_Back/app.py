from flask import Flask, request, jsonify
from flask_cors import CORS
from airport_fetcher import airport_fetcher

app = Flask(__name__)
cors = CORS(app)


# http://127.0.0.1:5000/new_game?player=Vesa&loc=EFHK
@app.route('/new_game')
def new_game():
    args = request.args
    player_name = args.get("player")
    location = args.get("loc")
    json_data = airport_fetcher(location)
    return json_data


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
