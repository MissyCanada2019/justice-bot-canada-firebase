import os
import logging
from flask import Flask, jsonify
from utils.db import db
from routes.assistant_routes import assistant_bp
from routes.merit_routes import merit_bp
from routes.journey_routes import journey_bp

def setup_logging(app: Flask) -> None:
    """
    Configure logging for the application.
    
    Args:
        app: Flask application instance
    """
    if not app.debug and not app.testing:
        # In production, log to console
        stream_handler = logging.StreamHandler()
        stream_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
        ))
        stream_handler.setLevel(logging.INFO)
        app.logger.addHandler(stream_handler)
        app.logger.setLevel(logging.INFO)
        app.logger.info('Application startup')

def load_config(app: Flask) -> None:
    """
    Load configuration from environment variables.
    
    Args:
        app: Flask application instance
    """
    # Database configuration
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        app.logger.error("DATABASE_URL not set.")
        raise ValueError("DATABASE_URL not set")
    
    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    
    # Additional configuration
    secret_key = os.environ.get("SECRET_KEY")
    if not secret_key:
        app.logger.error("SECRET_KEY not set.")
        raise ValueError("SECRET_KEY not set")
    app.config["SECRET_KEY"] = secret_key

def create_app(config_name: str | None = None) -> Flask:
    """
    Application factory function to create Flask app instances.
    
    Args:
        config_name: Configuration name (development, testing, production)
        
    Returns:
        Flask application instance
    """
    app = Flask(__name__)
    
    # Setup logging first
    setup_logging(app)
    
    # Load configuration
    try:
        load_config(app)
    except Exception as e:
        app.logger.error(f"Failed to load configuration: {e}")
        raise
    
    # Initialize extensions
    try:
        db.init_app(app)
    except Exception as e:
        app.logger.error(f"Failed to initialize database: {e}")
        raise
    
    # Register blueprints
    try:
        app.register_blueprint(assistant_bp, url_prefix="/assistant")
        app.register_blueprint(merit_bp, url_prefix="/merit")
        app.register_blueprint(journey_bp, url_prefix="/journey")
    except Exception as e:
        app.logger.error(f"Failed to register blueprints: {e}")
        # Instead of raising the exception, we can return a 500 error
        @app.errorhandler(500)
        def internal_server_error(error):
            return jsonify(error="Internal Server Error", message=str(e)), 500
    
    # Health check endpoint
    @app.route('/health')
    def health_check():
        return {"status": "healthy", "message": "Application is running"}
    
    app.logger.info("Application created successfully")
    return app

if __name__ == "__main__":
    try:
        app = create_app()
        debug_mode = os.environ.get("FLASK_ENV") == "development"
        app.run(debug=debug_mode, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
    except Exception as e:
        print(f"Failed to start application: {e}")
        raise