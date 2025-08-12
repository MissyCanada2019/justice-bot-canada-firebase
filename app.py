# ... inside create_app(), after other blueprint imports
from routes.assistant_routes import assistant_bp
from routes.merit_routes import merit_bp

# ... other code ...

# and after the other app.register_blueprint(...) calls:
app.register_blueprint(assistant_bp, url_prefix="/assistant")
app.register_blueprint(merit_bp, url_prefix="/merit")

# ... rest of the create_app() function ...