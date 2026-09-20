import fs from "node:fs";
import path from "node:path";

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fp, out);
    else out.push(fp);
  }
}

const files = [];
walk("src", files);

const jsxFiles = files.filter((f) => f.endsWith(".jsx"));
const jsxSource = jsxFiles.map((f) => fs.readFileSync(f, "utf8")).join("\n");
const indexHtml = fs.readFileSync("index.html", "utf8");
const allMarkupSource = jsxSource + indexHtml;

console.log("=== Unused listing.js top-level fields ===");
const listingSrc = fs.readFileSync("src/data/listing.js", "utf8");
const topFieldRegex = /^\s{2}(\w+):/gm;
const topFields = new Set();
let m;
while ((m = topFieldRegex.exec(listingSrc))) topFields.add(m[1]);
for (const field of topFields) {
  const needle = "." + field;
  const used = allMarkupSource.includes(needle);
  console.log(field.padEnd(20), used ? "used" : "UNUSED");
}

console.log("\n=== CSS class definition counts (duplicates) in src/App.css ===");
const css = fs.readFileSync("src/App.css", "utf8");
const ruleRegex = /(^|\})\s*([^{}@][^{}]*)\{/gm;
const selectorCounts = new Map();
let rm;
while ((rm = ruleRegex.exec(css))) {
  const selectorGroup = rm[2].trim();
  if (!selectorGroup || selectorGroup.startsWith("@")) continue;
  selectorGroup.split(",").forEach((sel) => {
    const s = sel.trim().replace(/\s+/g, " ");
    if (!s || s.length > 60) return;
    selectorCounts.set(s, (selectorCounts.get(s) || 0) + 1);
  });
}
const dupes = [...selectorCounts.entries()]
  .filter(([, count]) => count > 1)
  .sort((a, b) => b[1] - a[1]);
console.log("Total distinct selectors:", selectorCounts.size);
console.log("Selectors defined more than once:", dupes.length);
dupes.forEach(([sel, count]) => console.log("  ", count + "x", sel));

console.log("\n=== amenity data check ===");
const listingModule = await import("./src/data/listing.js");
const listing = listingModule.listing;
const catTotal = listing.amenityCategories.reduce((sum, c) => sum + c.items.length, 0);
const uniqueItems = new Set(listing.amenityCategories.flatMap((c) => c.items));
console.log("amenityCount field:", listing.amenityCount);
console.log("category item total (with dup):", catTotal);
console.log("category item total (unique):", uniqueItems.size);
const seen = new Map();
listing.amenityCategories.forEach((c) => {
  c.items.forEach((item) => {
    seen.set(item, (seen.get(item) || 0) + 1);
  });
});
console.log("Items appearing in more than one category:");
[...seen.entries()].filter(([, n]) => n > 1).forEach(([item, n]) => console.log("  ", item, "x" + n));

console.log("\n=== reservation default guest vs maxGuests check ===");
console.log("listing.guestCount (maxGuests passed to ReservationCard):", listing.guestCount);
console.log("listing.defaultBooking.guests:", listing.defaultBooking.guests);
