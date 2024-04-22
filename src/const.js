const crawlUrl = "https://lmf.com.vn/login";
const userId = "661417bab2bd5c6549a4cbfb";

const username = "taductrung1709@gmail.com";
const password = "tdt17092001";

const usernameInputSelector = 'input[type="email"]';
const passwordInputSelector = 'input[type="password"]';

const loginButtonClassname = ".el-button.el-button--primary.w-full";

const buttonSeeMoreSelector = ".hover:bg-blue-400";

const postSelector =
  ".flex.gap-x-2.w-full.items-start.px-4.py-6.hover:bg-gray-100.transition-all";

const postTypeId = {
  toanCapBa: "65f5a5a5d64d6583b071d688",
  toanOlympic: "65f5a541d64d6583b071d647",
  toanCaoCap: "65f5ab37d64d6583b071da6e",
  toanCapHai: "65f5ae2dd64d6583b071db80",
};

module.exports = {
  crawlUrl,
  usernameInputSelector,
  passwordInputSelector,
  username,
  password,
  loginButtonClassname,
  buttonSeeMoreSelector,
  postSelector,
  userId,
  postTypeId
};
