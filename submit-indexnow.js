// Run after each deploy: node submit-indexnow.js
// Submits all site URLs to Bing via IndexNow API

const https = require("https");

const KEY = "a7c3e9b2d4f08516e3a9b2c4f1d08e57";
const HOST = "rootssdigital.com";

const urls = [
  `https://${HOST}/`,
  `https://${HOST}/about/`,
  `https://${HOST}/services/`,
  `https://${HOST}/contact/`,
  `https://${HOST}/book/`,
  `https://${HOST}/faq/`,
  `https://${HOST}/products/`,
  `https://${HOST}/ai-training/`,
  `https://${HOST}/blog/`,
  `https://${HOST}/blog/posts/2026-06-02-grow-visalia-business-google-maps/`,
  `https://${HOST}/blog/posts/2026-05-16-choose-local-marketing-expert-visalia/`,
  `https://${HOST}/blog/posts/2026-05-01-google-business-profile-visalia/`,
];

const body = JSON.stringify({ host: HOST, key: KEY, urlList: urls });

const options = {
  hostname: "api.indexnow.org",
  path: "/indexnow",
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  },
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  if (res.statusCode === 200 || res.statusCode === 202) {
    console.log(`✓ IndexNow accepted ${urls.length} URLs`);
  } else {
    console.log("Response headers:", res.headers);
    res.on("data", (d) => process.stdout.write(d));
  }
});

req.on("error", (e) => console.error("Error:", e.message));
req.write(body);
req.end();
