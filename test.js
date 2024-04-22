/**
 * @param {puppeteer.Page} page
 */
const clickSeeMore = async (page) => {
    try {
      const btns = await page.$$(buttonSeeMoreSelector);
  
      for (const btn of btns) {
      }
      await Promise.all(
        btns.map((btn) => {
          btn.click();
        })
      );
    } catch (err) {
      console.log("[ERR click see more]: ", err);
    }
  };
  
  /**
   * @param {puppeteer.Page} page
   */
  const getPost = async (page) => {
    try {
      const posts = await page.$$(postSelector);
    } catch (err) {
      console.log("[ERR get posts]:", err);
    }
  };
  
  /**
   * @param {puppeteer.Page} page
   */
  const screenShot = async (page, imgPath) => {
    try {
      await page.screenshot({ path: imgPath, type: "png" });
      console.log("[Screen shot success]");
    } catch (err) {
      console.log("[Screen shot fail]:", err);
    }
  };
  
  /**
   * @param {puppeteer.Page} page
   */
  const getLink = async (page) => {
    const aTag = await page.$("a");
    const link = page.evaluate((el) => el.getAttribute("href"));
  };