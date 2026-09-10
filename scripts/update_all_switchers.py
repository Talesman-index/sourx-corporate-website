# -*- coding: utf-8 -*-
import glob
import re

files = sorted([f for f in glob.glob("./**/index.html", recursive=True) if not f.startswith("./dist") and not f.startswith("./node_modules")])

print(f"Updating switchers in {len(files)} files...")

drawer_lang_block = '''      <div class="advisano-drawer-footer">
        <div class="advisano-lang-switcher" style="margin-bottom: 14px; display: inline-flex;" role="group" aria-label="Choix de la langue">
          <button type="button" class="advisano-lang-btn active" data-lang="fr" aria-pressed="true">FR</button>
          <button type="button" class="advisano-lang-btn" data-lang="en" aria-pressed="false">EN</button>
          <button type="button" class="advisano-lang-btn" data-lang="es" aria-pressed="false">ES</button>
        </div>'''

for file_path in files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update topbar language switcher to have FR active by default
    content = re.sub(
        r'<button type="button" class="advisano-lang-btn" data-lang="fr" aria-pressed="false">FR</button>\s*<button type="button" class="advisano-lang-btn active" data-lang="en" aria-pressed="true">EN</button>',
        r'<button type="button" class="advisano-lang-btn active" data-lang="fr" aria-pressed="true">FR</button>\n          <button type="button" class="advisano-lang-btn" data-lang="en" aria-pressed="false">EN</button>',
        content
    )

    # In case of footer switcher on index.html
    content = re.sub(
        r'<button type="button" class="advisano-lang-btn" data-lang="fr">FR</button>\s*<button type="button" class="advisano-lang-btn active" data-lang="en">EN</button>',
        r'<button type="button" class="advisano-lang-btn active" data-lang="fr">FR</button>\n            <button type="button" class="advisano-lang-btn" data-lang="en">EN</button>',
        content
    )

    # 2. Add language switcher to drawer footer if not already present
    if '<div class="advisano-drawer-footer">' in content and 'aria-label="Choix de la langue"' not in content:
        content = content.replace('<div class="advisano-drawer-footer">', drawer_lang_block, 1)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Finished updating all 14 files.")
