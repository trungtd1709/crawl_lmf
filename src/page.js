const { default: puppeteer } = require("puppeteer");
const { crawlUrl } = require("./const");

const createPage = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    // args: ["--single-process"],
  });
  const page = await browser.newPage();

  await page.setCacheEnabled(false);
  // page.
  // await page.setRequestInterception(true);
  // page.on("request", (req) => {
  //   if (["image", "font"].includes(req.resourceType())) {
  //     req.abort();
  //   } else {
  //     req.continue();
  //   }
  // });

  await page.goto(crawlUrl, { waitUntil: "load" });
  await page.setViewport({ width: 1080, height: 1024 });

  return page;
};

module.exports = { createPage };
