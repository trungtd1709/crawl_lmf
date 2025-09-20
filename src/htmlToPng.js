const puppeteer = require("puppeteer");
const mathjax = require("mathjax-node");

mathjax.start();

function extractLatexStrings(inputString) {
  // This regex will match any content between $...$ including the $ signs
  const latexRegex = /\$(.*?)\$/g;
  let match;
  const matches = [];

  // Use regex exec method to find all matches in the string
  while ((match = latexRegex.exec(inputString)) !== null) {
    // Add the matched group (excluding the $ signs) to the results array
    matches.push(match[1]);
  }

  return matches;
}

async function replaceLatexWithImgTags(htmlString, id) {
  // Extract LaTeX strings
  const latexMatches = extractLatexStrings(htmlString);

  // Convert each LaTeX string to SVG and replace in the HTML
  for (const latex of latexMatches) {
    try {
      const data = await mathjax.typeset({
        math: latex,
        format: "TeX",
        svg: true,
      });

      if (data.errors) {
        console.error("Error in MathJax typeset:", data.errors);
      } else {
        // This replaces every occurrence of the LaTeX string with the SVG image
        // We wrap the LaTeX with $...$ to match the exact string to replace
        htmlString = htmlString.replace(`$${latex}$`, data.svg);
      }
    } catch (error) {
      console.error("[ERR HTML]: " + htmlString);
      console.error("Error converting LaTeX to SVG:", error);
    }
  }

  return htmlString;
}

async function htmlToPng({ string, imgPath = "result.png", _id }) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log("[id]: ", _id);
  console.log("[ORIGIN HTML]: ", string);
  const updatedHtmlString = await replaceLatexWithImgTags(string, _id);
  console.log("[CHANGED HTML]: ", string);

  await page.setContent(updatedHtmlString);

  await page.screenshot({ path: imgPath, fullPage: true });

  await browser.close();
  console.log("HTML processed and screenshot taken.");
}

module.exports = { htmlToPng };