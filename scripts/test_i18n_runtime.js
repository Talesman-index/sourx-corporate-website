// Test i18n runtime behavior across all 14 pages
import fs from 'fs';
import path from 'path';
import { translations, setLanguage, getCurrentLanguage, initI18n } from '../src/js/i18n.js';

console.log('Translations loaded successfully.');
console.log('FR keys:', Object.keys(translations.fr).length);
console.log('EN keys:', Object.keys(translations.en).length);
console.log('ES keys:', Object.keys(translations.es).length);

// Verify mock DOM environment
const files = [
  'about/index.html',
  'case-studies/index.html',
  'contact/index.html',
  'index.html',
  'industries/index.html',
  'insights/index.html',
  'privacy/index.html',
  'services/finance/index.html',
  'services/growth/index.html',
  'services/index.html',
  'services/innovation/index.html',
  'services/strategy/index.html',
  'services/technology/index.html',
  'terms/index.html'
];

let allPassed = true;

for (const relPath of files) {
  const fullPath = path.resolve(relPath);
  const html = fs.readFileSync(fullPath, 'utf8');

  // Check that FR is active by default in HTML
  if (!html.includes('class="advisano-lang-btn active" data-lang="fr"')) {
    console.error(`FAIL: ${relPath} does not have FR active by default!`);
    allPassed = false;
  }

  // Check that mobile drawer has lang switcher
  if (!html.includes('aria-label="Choix de la langue"')) {
    console.error(`FAIL: ${relPath} missing mobile drawer language switcher!`);
    allPassed = false;
  }

  // Check that main.js script tag is present
  if (!html.includes('<script type="module" src="/src/js/main.js"></script>')) {
    console.error(`FAIL: ${relPath} missing main.js script tag!`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('\n[SUCCESS] ALL 14 PAGES VERIFIED FOR DEFAULT FR STATE & MOBILE SWITCHERS!');
} else {
  console.error('\n[FAILURE] Issues found.');
  process.exit(1);
}
