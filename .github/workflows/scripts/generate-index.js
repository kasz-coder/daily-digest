const fs = require("fs");
const path = require("path");

const digestsDir = path.join(__dirname, "..", "..", "..", "docs");

const files = fs
  .readdirSync(digestsDir)
  .filter((f) => f.endsWith(".md") && f !== "index.md" && /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
  .sort()
  .reverse();

const lines = ["# AI Builders Digest", ""];

for (const file of files) {
  const date = file.replace(".md", "");
  lines.push(`- [${date}](${file})`);
}

lines.push("");
fs.writeFileSync(path.join(digestsDir, "index.md"), lines.join("\n"));
console.log(`Generated index with ${files.length} digest(s)`);
