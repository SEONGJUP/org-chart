const baseUrl = process.env.SMOKE_BASE_URL || "http://localhost:3001";
const pages = ["/", "/seiim-ir", "/seiim-rnd", "/half-year-inspection", "/org-chart"];

async function fetchText(url) {
  const response = await fetch(url);
  const text = await response.text();
  return { response, text };
}

function cssHrefs(html) {
  return [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/gi)]
    .map((match) => match[1].replaceAll("&amp;", "&"));
}

const failures = [];

for (const page of pages) {
  const url = `${baseUrl}${page}`;
  const { response, text } = await fetchText(url);

  if (!response.ok) {
    failures.push(`${page}: page returned ${response.status}`);
    continue;
  }

  const hrefs = cssHrefs(text);
  if (hrefs.length === 0) {
    failures.push(`${page}: no stylesheet link found`);
    continue;
  }

  let cssBytes = 0;
  for (const href of hrefs) {
    const cssUrl = href.startsWith("http") ? href : `${baseUrl}${href}`;
    const css = await fetch(cssUrl);
    const body = await css.text();
    cssBytes += body.length;
    if (!css.ok) failures.push(`${page}: stylesheet ${href} returned ${css.status}`);
  }

  if (cssBytes < 50000) {
    failures.push(`${page}: stylesheet payload too small (${cssBytes} bytes)`);
  }
}

if (failures.length > 0) {
  console.error("CSS smoke check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`CSS smoke check passed for ${pages.length} pages at ${baseUrl}`);
