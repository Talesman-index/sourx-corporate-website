# -*- coding: utf-8 -*-
import glob
import re
import json

# Extract translations dictionary from src/js/i18n.js
with open("src/js/i18n.js", "r", encoding="utf-8") as f:
    js_content = f.read()

# We can find all keys defined in fr, en, es
def extract_keys_for_lang(code, lang):
    match = re.search(r'  ' + lang + r': \{(.*?)\n  \}(?:,|\n\};)', code, flags=re.DOTALL)
    if not match:
        raise ValueError(f"Lang {lang} not found")
    body = match.group(1)
    keys = set(re.findall(r'"([^"]+)":', body))
    return keys

fr_keys = extract_keys_for_lang(js_content, "fr")
en_keys = extract_keys_for_lang(js_content, "en")
es_keys = extract_keys_for_lang(js_content, "es")

print(f"FR keys count: {len(fr_keys)}")
print(f"EN keys count: {len(en_keys)}")
print(f"ES keys count: {len(es_keys)}")

# Check key parity between fr, en, es
missing_in_en = fr_keys - en_keys
missing_in_es = fr_keys - es_keys
if missing_in_en:
    print(f"WARNING: Keys in FR but missing in EN: {missing_in_en}")
if missing_in_es:
    print(f"WARNING: Keys in FR but missing in ES: {missing_in_es}")

html_files = glob.glob("./**/index.html", recursive=True)
html_files = [f for f in html_files if not f.startswith("./dist") and not f.startswith("./node_modules")]

all_passed = True

print(f"\nScanning {len(html_files)} HTML files...")

for file in sorted(html_files):
    with open(file, "r", encoding="utf-8") as f:
        html = f.read()

    # Check script main.js
    if '<script type="module" src="/src/js/main.js"></script>' not in html:
        print(f"ERROR in {file}: Missing main.js script tag!")
        all_passed = False

    # Check em-dashes
    if "—" in html:
        print(f"WARNING: Em dash '—' found in {file}!")
        all_passed = False

    # Find all data-i18n
    tags_i18n = re.findall(r'data-i18n="([^"]+)"', html)
    for k in tags_i18n:
        if k not in fr_keys:
            print(f"ERROR in {file}: data-i18n key '{k}' not found in FR dict!")
            all_passed = False
        if k not in en_keys:
            print(f"ERROR in {file}: data-i18n key '{k}' not found in EN dict!")
            all_passed = False
        if k not in es_keys:
            print(f"ERROR in {file}: data-i18n key '{k}' not found in ES dict!")
            all_passed = False

    # Find all data-i18n-ph
    tags_i18n_ph = re.findall(r'data-i18n-ph="([^"]+)"', html)
    for k in tags_i18n_ph:
        if k not in fr_keys:
            print(f"ERROR in {file}: data-i18n-ph key '{k}' not found in FR dict!")
            all_passed = False
        if k not in en_keys:
            print(f"ERROR in {file}: data-i18n-ph key '{k}' not found in EN dict!")
            all_passed = False
        if k not in es_keys:
            print(f"ERROR in {file}: data-i18n-ph key '{k}' not found in ES dict!")
            all_passed = False

# Check em dashes in src/
for src_file in ["src/js/i18n.js", "src/css/main.css", "src/js/main.js"]:
    with open(src_file, "r", encoding="utf-8") as f:
        src_text = f.read()
    if "—" in src_text:
        print(f"WARNING: Em dash '—' found in {src_file}!")
        all_passed = False

if all_passed:
    print("\n[SUCCESS] ALL 14 HTML FILES & JS DICTIONARIES PASSED ALL VALIDATIONS!")
else:
    print("\n[FAIL] Validations found issues to fix.")
