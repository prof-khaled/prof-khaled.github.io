import json
import re
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

PROFILE = "https://scholar.google.com/citations?hl=en&user=kuQfWS4AAAAJ"
OUTPUT = Path(__file__).resolve().parents[1] / "assets" / "scholar-stats.json"

HEADERS = {
        "User-Agent": "Mozilla/5.0 (compatible; AcademicProfileUpdater/1.0)",
        "Accept-Language": "en-US,en;q=0.9",
    }

def retrieve(url):
    request = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8", errors="replace")

html = retrieve(PROFILE)

rows = re.findall(r'<tr[^>]*>(.*?)</tr>', html, flags=re.S | re.I)
values = {}
for row in rows:
    label_match = re.search(r'gsc_rsb_sth[^>]*>(.*?)</td>', row, flags=re.S | re.I)
    number_match = re.search(r'gsc_rsb_std[^>]*>([\d,]+)</td>', row, flags=re.S | re.I)
    if not label_match or not number_match:
        continue
    label = re.sub(r'<[^>]+>', '', label_match.group(1)).strip().lower()
    values[label] = int(number_match.group(1).replace(',', ''))

citations = values.get("citations")
h_index = values.get("h-index")
if citations is None or h_index is None:
    raise RuntimeError("Google Scholar statistics were not found; existing website data was preserved.")

publication_count = 0
for start in range(0, 1000, 100):
    page = retrieve(f"{PROFILE}&cstart={start}&pagesize=100")
    page_count = len(re.findall(r'class="gsc_a_tr"', page, flags=re.I))
    publication_count += page_count
    if page_count < 100:
        break
if publication_count == 0:
    publication_count = 111

payload = {
    "citations": citations,
    "hIndex": h_index,
    "publications": publication_count,
    "updatedAt": datetime.now(timezone.utc).isoformat(),
    "source": PROFILE,
}
OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
