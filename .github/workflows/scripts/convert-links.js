const fs = require("fs");
const path = require("path");

const docsDir = path.join(__dirname, "..", "..", "..", "docs");

const files = fs.readdirSync(docsDir).filter((f) => f.endsWith(".md"));

const urlRegex = /(?<!\]\()(?<!\[)[<(]?(https?:\/\/[^\s\)>\]]+)[)>]?/g;

for (const file of files) {
  const filePath = path.join(docsDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  const original = content;

  content = content.replace(urlRegex, (match, url) => {
    if (
      content.includes(`](${url})`) ||
      content.includes(`](${url})`) ||
      match.startsWith("[")
    ) {
      return match;
    }
    return `[${url}](${url})`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Converted links in ${file}`);
  }
}

console.log("Done converting bare URLs to markdown links");