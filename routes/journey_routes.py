from flask import Blueprint, request
from flask_login import login_required, current_user
from utils.db import db
from models.journey import Journey
from models.case import Case

def _owns_case(case_id: int) -> bool:
    """
    Check if the current user owns the specified case.
    
    Args:
        case_id (int): The ID of the case to check ownership for
        
    Returns:
        bool: True if the current user owns the case, False otherwise
        
    Raises:
        Exception: If there's a database error during the query
    """
    try:
        # Using exists() is more efficient than querying for actual data
        # It returns True/False directly without fetching row data
        return db.session.query(
            db.exists().where(
                (Case.id == case_id) & (Case.user_id == current_user.id)
            )
        ).scalar()
    except Exception:
        # Re-raise the exception to be handled by the calling function
        # This maintains the existing error handling pattern in the routes
        raise

journey_bp = Blueprint("journey", __name__)

_STATES = [
    "intake",
    "gathering",
    "review",
    "negotiation",
    "adjudication",
    "closed",
]

@journey_bp.route("/<int:case_id>/state", methods=["GET"])
@login_required
def get_state(case_id: int):
    if not _owns_case(case_id):
        return {"error": "forbidden"}, 403
    journey = db.session.query(Journey).filter_by(case_id=case_id).first()
    if not journey:
        journey = Journey()
        journey.case_id = case_id  # starts at "intake"
        db.session.add(journey)
        db.session.commit()
    return {"state": journey.state, "data": journey.data or {}}

@journey_bp.route("/<int:case_id>/advance", methods=["POST"])
@login_required
def advance(case_id: int):
    if not _owns_case(case_id):
        return {"error": "forbidden"}, 403
    data = request.get_json()
    new_state = data.get("state")
    new_data = data.get("data")

    if new_state not in _STATES:
        return {"error": "invalid state"}, 400

    journey = db.session.query(Journey).filter_by(case_id=case_id).first()
    if not journey:
        journey = Journey()
        journey.case_id = case_id

    journey.state, journey.data = new_state, new_data or {}
    db.session.add(journey)
    db.session.commit()
    return {"ok": True, "state": journey.state}
