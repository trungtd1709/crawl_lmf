const {
  login,
  getPostsList,
  getPostsDetail,
  getPostsComments,
  getCommentsNormal,
} = require("./api");
const {
  usernameInputSelector,
  passwordInputSelector,
  username,
  password,
  loginButtonClassname,
  buttonSeeMoreSelector,
  postSelector,
  userId,
  postTypeId,
} = require("./const");
const { htmlToPng } = require("./htmlToPng");
const { createPage } = require("./page");
const { delay, addBaseUrlToImage, createFolder } = require("./utils");
const puppeteer = require("puppeteer");

const main = async () => {
  // const res = await login();
  const res = await getPostsList({
    "condition[community_id]": postTypeId.toanCapBa,
    page: 1,
    limit: 10,
  });
  const postsList = res.data;

  for await (const post of postsList) {
    const { _id, count_comment_answer, count_comment_normal } = post;

    const postData = await getPostsDetail(_id);
    const htmlPostContent = postData?.content;
    const commentsNormalList = await getCommentsNormal({
      page: 1,
      limit: 20,
      user_id: userId,
      "condition[post_id]": _id,
    });
    let htmlComment = "";

    for (const comment of commentsNormalList) {
      const { content } = comment;
      htmlComment += `${content}<br/>`;
    }
    createFolder();
    console.log(htmlPostContent);
    const htmlContent = addBaseUrlToImage(
      `<div>${htmlPostContent}<br/>${htmlComment}</div>`
    );
    await htmlToPng({ string: htmlContent, imgPath: `images/${_id}.png` });
  }
  // console.log(res);
};

// /**
//  * @param {puppeteer.Page} page
//  */
// const login = async (page) => {
//   try {
//     await page.waitForSelector(usernameInputSelector);
//     await page.waitForSelector(passwordInputSelector);

//     await page.type(usernameInputSelector, username);
//     await page.type(passwordInputSelector, password);

//     await page.waitForSelector(loginButtonClassname);
//     const loginBtn = await page.$(loginButtonClassname);

//     if (loginBtn) {
//       loginBtn.click();
//       await delay();
//     }
//   } catch (err) {
//     console.log("[ERR login]: ", err);
//   }
// };

main().catch(console.error);
