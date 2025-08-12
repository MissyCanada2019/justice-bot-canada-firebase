from flask import Blueprint, request, Response
import json

assistant_bp = Blueprint("assistant", __name__)  # url_prefix added during registration

def _prompt(issue: str) -> str:
    return f"""
Act as a Canadian legal triage assistant. User issue: {issue}
Tasks:
1) Classify domain (tenancy, HR, family, small-claims, other).
2) Summarize likely rights & forms.
3) Produce 3–5 CanLII search queries.
Return JSON with: domain, summary, forms[], queries[], links[].
"""

@assistant_bp.post("/triage")
def triage():
    data = request.get_json() or {}
    issue = (data.get("issue") or "").strip()
    if not issue:
        return Response('{"error":"issue required"}', status=400, mimetype="application/json")

    # Heuristic fallback (no API key needed). Swap for Gemini call if you add one.
    domain = "tenancy" if any(w in issue.lower() for w in ["tenant","landlord","ltb"]) else "other"
    result = {
        "domain": domain,
        "summary": "Likely tenancy dispute; consider LTB T2/T6; gather photos/receipts/emails.",
        "forms": ["LTB T2","LTB T6"] if domain == "tenancy" else [],
        "queries": [
            f"site:canlii.org Ontario {issue[:40]}",
            "site:canlii.org LTB T2 maintenance Ontario",
            "site:canlii.org tenant reprisal T2 Ontario"
        ],
        "links": [
            "https://www.canlii.org/en/on/onltb/",
            "https://tribunalsontario.ca/ltb/forms/"
        ]
    }
    return Response(json.dumps(result, ensure_ascii=False, indent=2), mimetype="application/json")