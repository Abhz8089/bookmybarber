function jsonParseUserDataString (){
     const userDataString = localStorage.getItem("persist:client");
      const parsedObject = JSON.parse(userDataString, (key, value) => {
        if (key === "user" || key === "_persist") {
          return JSON.parse(value);
        }
        return value;
      })
      return parsedObject.user;
}
function jsonParseShopDataString (){
     const shopDataString = localStorage.getItem("persist:client");
      const parsedObject = JSON.parse(shopDataString, (key, value) => {
        if (key === "user" || key === "_persist") {
          return JSON.parse(value);
        }
        return value;
      })
       let shopDetails = JSON.parse(parsedObject.shop);
      return shopDetails;
}




export { jsonParseUserDataString, jsonParseShopDataString };