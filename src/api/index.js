const { axiosClient } = require("../axios/axiosConfig");
const { userId } = require("../const");
const { loginUrl } = require("./apiEndPoint");

const login = async () => {
  const params = {
    username: "taductrung1709@gmail.com",
    password: "tdt17092001",
  };
  const res = await axiosClient.post(loginUrl, params);
  if (res.status === 201) {
    console.log(res.data);
    const { access_token, refresh_token } = res.data;
    await setAccessToken(access_token);
  }
  console.log("[res]:", res);
};

const getPostsList = async (params) => {
  const postsListUrl = "/api/v1/posts";
  const res = await axiosClient.get(postsListUrl, { params });
  if (res?.status == 200) {
    const { data } = res;
    return data;
  } else {
    return {
      data: [],
      meta: {
        itemCount: 0,
      },
    };
  }
  return res;
};

const getPostsDetail = async (id) => {
  const commentsListUrl = `/api/v1/posts/${id}`;
  const res = await axiosClient.get(commentsListUrl, {
    params: { user_id: userId },
  });
  const { data = {} } = res;
  return data;
};

const getCommentsNormal = async (params) => {
  const commentsListUrl = "/api/v1/posts/comments-normal";
  const res = await axiosClient.get(commentsListUrl, { params });
  // if (res?.status == 200) {
  const { data = {} } = res;
  return data?.data ?? [];
  // } else {
  //   return {
  //     data: [],
  //     meta: {
  //       itemCount: 0,
  //     },
  //   };
  // }
  return res;
};

async function setAccessToken(token) {
  if (token) {
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    console.error("Failed to set authorization token");
  }
}

module.exports = { login, getPostsList, getPostsDetail, getCommentsNormal };
