import jwt from "jsonwebtoken";

const userAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization || getTokenFromCookies(req);

  if (!token) {
    return res.json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminData = decoded.data; 
    next();
  } catch (error) {
    return res.json({ message: "Unauthorized" });
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

export default userAuthMiddleware;
