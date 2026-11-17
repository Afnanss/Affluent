import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseDataset} from '../src/validation.js';
const args=process.argv.slice(2);
if(!args[0]||!args.includes('--presentation-reviewed')){
 console.error('Usage: node scripts/adopt-dataset.mjs /path/to/reviewed.json --presentation-reviewed\nReview all content for public presentation first. This updates local source only; it does not publish.');process.exit(1);
}
const data=parseDataset(await readFile(resolve(args[0]),'utf8'));
const target=fileURLToPath(new URL('../src/data/presentation-overrides.js',import.meta.url));
await writeFile(target,'// Reviewed presentation dataset adopted locally. No publication performed.\nexport default '+JSON.stringify(data,null,2)+';\n');
console.log('Reviewed dataset written to src/data/presentation-overrides.js. Run checks and build before any manual publishing.');
