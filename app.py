from flask import Flask
from utils.db import db
from routes.assistant_routes import assistant_bp
from routes.merit_routes import merit_bp
from routes.journey_routes import journey_bp

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+pg8000://:@/fdcdb?unix_sock=/cloudsql/justice-bot-canada551055:us-central1:studio-001/.s.PGSQL.5432"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    app.register_blueprint(assistant_bp, url_prefix="/assistant")
    app.register_blueprint(merit_bp, url_prefix="/merit")
    app.register_blueprint(journey_bp, url_prefix="/journey")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
