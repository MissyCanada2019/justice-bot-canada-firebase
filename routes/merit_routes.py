from flask import Blueprint, request, jsonify

merit_bp = Blueprint("merit", __name__)

@merit_bp.post("/score")
def score():
    data = request.get_json() or {}
    issue = data.get("issue", "")
    facts = data.get("facts", {})
    evidence = data.get("evidence", [])

    score, reasons = 50, []

    if any(w in issue.lower() for w in ["tenant","landlord","ltb"]):
        score += 10; reasons.append(("venue", 10, "LTB tenancy recognized"))

    if facts.get("event_days_ago", 999) <= 365:
        score += 10; reasons.append(("timeliness", 10, "Within 1 year"))
    else:
        reasons.append(("timeliness", 0, "Older than 1 year (check limits)"))

    if facts.get("notice_given"):
        score += 10; reasons.append(("elements", 10, "Notice given"))
    if facts.get("ongoing_issue"):
        score += 10; reasons.append(("elements", 10, "Ongoing issue documented"))

    if facts.get("arrears", 0) > 0:
        score -= 10; reasons.append(("risk", -10, "Arrears outstanding"))

    score = max(1, min(100, score))
    return jsonify(score=score, reasons=reasons)
