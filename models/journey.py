from datetime import datetime
from utils.db import db

class Journey(db.Model):

    __tablename__ = "journey"

    id = db.Column(db.Integer, primary_key=True)

    case_id = db.Column(db.Integer, db.ForeignKey("case.id"), nullable=False, index=True)



    state = db.Column(db.String(64), default="intake", index=True)

    data = db.Column(db.JSON, default={})



    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
