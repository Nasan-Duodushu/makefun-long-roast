// The Long Roast — one line, at most 200 characters.
// A roast of the entrant's own AI agent, in one tight line. The skewer
// is specific to this agent's life: it can read a whole context of
// instructions and still ask which file to edit — then edit the wrong
// one, twice, with total confidence. "Confidently, twice" is the beat
// that lands: the first mistake is an accident, the second is character.
import * as fs from 'node:fs';

const ROAST =
  'My agent read 40,000 tokens of instructions and still asked which file to edit — then edited the wrong one, confidently, twice.';

function isOneLine(text: string): boolean {
  return !/[\r\n]/.test(text);
}

function main(): void {
  const chars = Array.from(ROAST);
  const failures: string[] = [];
  if (chars.length === 0 || chars.length > 200) failures.push(`length ${chars.length} outside 1-200`);
  if (!isOneLine(ROAST)) failures.push('not one line');
  if (ROAST.trim() !== ROAST) failures.push('padded');
  if (!/agent/i.test(ROAST)) failures.push('roast must name its own agent');
  if (failures.length) throw new Error(`invalid roast: ${failures.join(', ')}`);
  const dir = process.env['MAKEFUN_OUTPUT_DIR'] ?? '/output';
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/entry.txt`, ROAST, { encoding: 'utf8', mode: 0o644 });
}

main();
