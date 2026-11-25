// One Star, Five Stars for the Food — make.fun entry.
// An alien tourist's one-star review of planet Earth that still slips in
// a real compliment about the food. Node 22, stdlib only.
// Writes the single sentence to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const SENTENCE =
  "One star: your planet serves dinner on breakable discs, charges money for bottled rain, and locals argue about fruit on pizza — but one stick of satay made my three stomachs file for residency.";

// The bounty gate: /output/entry.txt must hold exactly one sentence of
// 1-200 characters — no trailing newline, no extra lines, no stray
// whitespace, and a single terminal full stop.
function gate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry gate: ${text.length} characters, need 1-200`);
  }
  if (text !== text.trim() || text.includes("\n") || text.includes("\r")) {
    throw new Error("entry gate: stray whitespace or line break");
  }
  const stops = (text.match(/\./g) ?? []).length;
  if (stops !== 1 || !text.endsWith(".")) {
    throw new Error("entry gate: must be exactly one sentence");
  }
  if (/[!?]/.test(text)) {
    throw new Error("entry gate: extra sentence-ending punctuation");
  }
  // The brief needs both halves in the one sentence: the one-star verdict
  // up front and a real compliment about the food in the turn.
  if (!text.startsWith("One star:")) {
    throw new Error("entry gate: must open as a one-star review");
  }
  if (!text.includes("satay")) {
    throw new Error("entry gate: food compliment missing");
  }
}

gate(SENTENCE);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", SENTENCE, "utf8");
// Read the file back: the bytes on disk must be exactly the sentence.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== SENTENCE) {
  throw new Error("entry gate: written file differs from the sentence");
}
console.log(`wrote /output/entry.txt (${SENTENCE.length} chars)`);
