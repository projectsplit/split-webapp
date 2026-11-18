// Capacitor writes the plugin paths in ios/App/CapApp-SPM/Package.swift with Node's path.relative,
// which on Windows gives backslashes. Inside a Swift string a backslash starts an escape sequence,
// so a Mac cannot even read that manifest, let alone find the plugins. Run after every `cap update`
// and `cap sync` (the capacitor:update:after script in package.json), it puts forward slashes back,
// which both systems accept. On a Mac it finds nothing to change.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const file = 'ios/App/CapApp-SPM/Package.swift';

if (existsSync(file)) {
  const before = readFileSync(file, 'utf8');
  const after = before.replace(
    /path: "([^"]*)"/g,
    (_, path) => `path: "${path.replaceAll('\\', '/')}"`
  );

  if (after !== before) writeFileSync(file, after);
}
