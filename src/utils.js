const fs = require("fs");

function delay(time = 3) {
  return new Promise((resolve) => setTimeout(resolve, time * 1000));
}

function addBaseUrlToImage(htmlString) {
  const regex = /<img src="([^"]+)"/g;
  const baseUrl = "https://lmf.com.vn";

  // const formatedString = htmlString.replace('src="/storage', `src="${baseUrl}`);
  // return formatedString;
  return htmlString.replace(regex, (match, src) => {
    // Check if the src already has a protocol
    if (/http:|https:/.test(src)) {
      return match; // Return the original match if the URL is already absolute
    } else {
      // Prepend the base URL before the src path
      return `<img src="${baseUrl}${src}"`;
    }
  });
}

const createFolder = (id) => {
  try {
    let folderPath = "";
    if (id) {
      folderPath = `./images/${id}`;
    } else {
      folderPath = "./images";
    }

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      console.log("Folder created successfully.");
    } else {
      console.log("Folder already exists.");
    }
  } catch (err) {
    console.error("Error creating folder:", err);
  }
};

module.exports = { delay, addBaseUrlToImage, createFolder };
