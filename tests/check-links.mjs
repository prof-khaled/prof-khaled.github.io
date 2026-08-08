import fs from 'node:fs';
import path from 'node:path';
const files = fs.readdirSync('.').filter(x => x.endsWith('.html'));
let bad = [];
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/(?:href|src)=["']([^"'#?]+)["']/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/.test(u)) continue;
    const target = path.resolve(path.dirname(f), decodeURI(u));
    if (!fs.existsSync(target)) bad.push(`${f}: ${u}`);
  }
}
if (bad.length) {
  console.error(bad.join('\n'));
  process.exit(1);
}
console.log(`Checked ${files.length} HTML files; no missing local references.`);
