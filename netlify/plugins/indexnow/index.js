const https = require("https");
const fs = require("fs");
const path = require("path");

const KEY = "a7c3e9b2d4f08516e3a9b2c4f1d08e57";
const HOST = "rootssdigital.com";

function findPages(dir, urlPath = "") {
  const urls = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return urls;
  }
  for (const entry of entries) {
    if (entry.isDirectory()) {
      urls.push(...findPages(path.join(dir, entry.name), `${urlPath}/${entry.name}`));
    } else if (entry.name === "index.html") {
      urls.push(`https://${HOST}${urlPath}/`);
    }
  }
  return urls;
}

module.exports = {
  onSuccess: async ({ utils }) => {
    try {
      const siteDir = path.resolve("_site");
      const urls = findPages(siteDir);

      if (urls.length === 0) {
        console.log("IndexNow: no pages found, skipping.");
        return;
      }

      const body = JSON.stringify({ host: HOST, key: KEY, urlList: urls });

      await new Promise((resolve, reject) => {
        const req = https.request(
          {
            hostname: "api.indexnow.org",
            path: "/indexnow",
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Content-Length": Buffer.byteLength(body),
            },
          },
          (res) => {
            console.log(`IndexNow: HTTP ${res.statusCode}`);
            if (res.statusCode === 200 || res.statusCode === 202) {
              console.log(`✓ Submitted ${urls.length} URLs to Bing IndexNow`);
              urls.forEach((u) => console.log("  ", u));
            } else {
              res.on("data", (d) => process.stdout.write(d));
            }
            resolve();
          }
        );
        req.on("error", reject);
        req.write(body);
        req.end();
      });
    } catch (err) {
      utils.build.failPlugin(`IndexNow submission failed: ${err.message}`);
    }
  },
};
