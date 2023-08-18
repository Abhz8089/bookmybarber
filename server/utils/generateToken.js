import jwt from "jsonwebtoken";


const createToken = (res,data) => {

    
    let token = jwt.sign(
        { data, exp: Math.floor(Date.now() / 1000) * (60 * 60) },
       process.env.JWT_SECRET
       );
       
       const expiration = new Date(new Date().getTime() + 3600000);
      res.set(
        "Set-Cookie",
        `abhi=${token};httpOnly:false;SameSite=Strict;Expires=${expiration.toUTCString()}`
        );
    }


    const getToken = ( req ) => {
    
              let cookieHeaderValue = req.headers.cookie;
              let token = null;

              if (cookieHeaderValue) {
                let cookies = cookieHeaderValue.split(";");

                for (let cookie of cookies) {
                  let [cookieName, cookieValue] = cookie.trim().split("=");

                  if (cookieName === "abhi") {
                    token = cookieValue;
                    return token
                    break;
                  }
                }
              }

    }

    
const createTokenForAdmin = (res, data) => {
  let token = jwt.sign(
    { data, exp: Math.floor(Date.now() / 1000) * (60 * 60) },
    process.env.JWT_SECRET
  );

  const expiration = new Date(new Date().getTime() + 3600000);
  res.set(
    "Set-Cookie",
    `admin=${token};httpOnly:false;SameSite=Strict;Expires=${expiration.toUTCString()}`
  );
};

const getTokenForAdmin = (req) => {
  let cookieHeaderValue = req.headers.cookie;
  let token = null;

  if (cookieHeaderValue) {
    let cookies = cookieHeaderValue.split(";");

    for (let cookie of cookies) {
      let [cookieName, cookieValue] = cookie.trim().split("=");

      if (cookieName === "admin") {
        token = cookieValue;
        return token;
        break;
      }
    }
  }
};


    
    
    export {createToken,getToken,createTokenForAdmin,getTokenForAdmin};


    
    // const generateToken = (res,userId) => {
    //     const token = jwt.sign({userId},process.env.JWT_SECRET,{
    //         expiresIn : "30d"
    //     });
    
    //     res.cookie("jwt",token,{
    //         httpOnly : true,
    //         secure: process.env.NODE_ENV !=="development",
    //         sameSite:"strict",
    //         maxAge: 30 * 24 * 60 * 1000
    
    //     })
    // } 