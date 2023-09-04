import jwt from "jsonwebtoken";

const getData = (token) => {
  if (!token) {
    return res.json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminData = decoded.data;
    return adminData;
  } catch (error) {
    console.log(error);
    return res.json({ message: "Unauthorized" });
  }
};

export { getData };
