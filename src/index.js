const {
  getPostsList,
  getPostsDetail,
  getCommentsNormal,
} = require("./api");
const {
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

    for (i = 0; i < commentsNormalList.length; i++) {
      const { content } = commentsNormalList[i];
      htmlComment += `<span>Comment ${i + 1}:</span> ${content}<br/>`;
    }
    createFolder();
    console.log(htmlPostContent);
    const htmlContent = addBaseUrlToImage(
      `<div>${htmlPostContent}<br/>${htmlComment}</div>`
    );
    await htmlToPng({ string: htmlContent, imgPath: `images/${_id}.png` , _id});
  }
};

main().catch(console.error);
