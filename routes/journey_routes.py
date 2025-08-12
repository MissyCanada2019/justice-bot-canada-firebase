from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from utils.db import db
from models.journey import Journey
from models.case import Case  # adjust import if needed

journey_bp = Blueprint("journey", __name__)

_STATES = [
    "intake",
    "evidence_collect",
    "form_select",
    "form_fill",
    "file_and_serve",
    "hearing_prep",
    "hearing",
    "post_order",
]

def _own_case(case_id: int) -> bool:
    return db.session.query(Case.id).filter_by(id=case_id, user_id=current_user.id).first() is not None

@journey_bp.get("/state")
@login_required
def get_state():
    case_id = int(request.args.get("case_id", 0))
    if not case_id or not _own_case(case_id):
        return jsonify(error="forbidden"), 403
    j = db.session.query(Journey).filter_by(case_id=case_id).first()
    if not j:
        j = Journey(case_id=case_id)  # starts at "intake"
        db.session.add(j); db.session.commit()
    return jsonify(state=j.state, data=j.data or {})

@journey_bp.post("/advance")
@login_required
def advance():
    payload = request.get_json() or {}
    case_id = int(payload.get("case_id", 0))
    new_state = payload.get("state", "")
    data = payload.get("data", {})

    if not case_id or not _own_case(case_id):
        return jsonify(error="forbidden"), 403
    if new_state not in _STATES:
        return jsonify(error="invalid state"), 400

    j = db.session.query(Journey).filter_by(case_id=case_id).first()
    if not j:
        j = Journey(case_id=case_id)

    j.state, j.data = new_state, data
    db.session.add(j); db.session.commit()
    return jsonify(ok=True, state=j.state)
