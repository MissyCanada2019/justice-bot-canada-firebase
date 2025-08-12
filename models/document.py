from datetime import datetime
from utils.db import db

class Document(db.Model):
    __tablename__ = "document"
    id = db.Column(db.Integer, primary_key=True)

    case_id = db.Column(db.Integer, db.ForeignKey("case.id"), nullable=False, index=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False, index=True)

    filename = db.Column(db.String(255), nullable=False)
    content_type = db.Column(db.String(127))
    size_bytes = db.Column(db.Integer)
    sha256 = db.Column(db.String(64))

    storage_url = db.Column(db.Text, nullable=False)  # https URL to the object
    created_at = db.Column(db.DateTime, default=datetime.utcnow)