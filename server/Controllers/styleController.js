import Style from "../Models/StyleModel.js";
import { getToken } from "../utils/generateToken.js";
import { getData } from "../utils/getDetails.js";

const uploadStyleImage = async (req, res) => {
  const { cat, name } = req.body;
  let CatUpp= cat.toUpperCase()
  let NameUpp= name.toUpperCase()

  try {
    if(!cat){
        return res.json({error:'category is required'})
    }
    if(!name){
        return res.json({error:'Style name is required'})
    }
    if(!req.file){
        return res.json({error:'Please Select image'})
    }
   
    const styleName = await Style.find({styleName:NameUpp})
    
    if(styleName.length){
        return res.json({error:'This Style name is already Exist '})
    }

    const filePaths = req.file.filename

    const token =await getToken(req)
    const data = await getData(token)
    
    const addImg = await Style.create({category:CatUpp,styleName:NameUpp,photos:filePaths,shopId:data.id})
    return res.json(addImg)

  } catch (error) {
    console.log(error)
  }
};

const getStyleImg =async (req,res) => {
     try {
        const getImg = await Style.find({})
        return res.json(getImg)
     } catch (error) {
        console.log(error)
     }
}

const getStyleImgInProfile = async (req,res) => {
  try {
    let token = await getToken(req)
    let data = await getData(token)
    const getImg = await Style.find({shopId:data.id})
  
    if(!getImg.length){
      return res.json({error:"The image is empty"})
    }
    return res.json(getImg)
  } catch (error) {
    
  }
}






const deleteImgStyle = async (req, res) => {
 
  try {
    const result = await Style.findOneAndRemove({ _id: req.params.id });
    if (!result) {
   
      return res.json({ error: "Document not found" });
    }
        let token = await getToken(req);
        let data = await getData(token);
        const getImg = await Style.find({ shopId: data.id });
    return res.json( getImg);
  } catch (error) {
    console.error("Error:", error);
    return res.json({ error: "Error in deleting image" });
  }
};




export { uploadStyleImage, getStyleImg, getStyleImgInProfile ,deleteImgStyle};