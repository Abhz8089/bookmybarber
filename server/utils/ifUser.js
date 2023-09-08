import jwt from "jsonwebtoken";

const ifUserHave = (req) => {
  const token = req.headers.authorization || getTokenFromCookies(req);

  if (!token) {
    return false;
  }else{
    return token
  }


};

const getTokenFromCookies = (req) => {
  let cookieHeaderValue = req.headers.cookie;
  if (cookieHeaderValue) {
    let cookies = cookieHeaderValue.split(";");
    for (let cookie of cookies) {
      let [cookieName, cookieValue] = cookie.trim().split("=");
      if (cookieName === "abhi") {
        return cookieValue;
      }
    }
  }
  return null;
};

export  {ifUserHave};
