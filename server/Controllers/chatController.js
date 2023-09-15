import Room from '../Models/RoomForChatModal.js';
import Chat from '../Models/ChatModal.js'


const chat = async (req,res) => {
  const {msg,shopId,userId,sender}=req.body;
   
 console.log(req.body,"------------------------------------------cc8")
  try {
    if(!(msg.trim())){
     return res.json({not:'empty'})
    }
    if(!shopId){
      return res.json({error:'Server error please relogin'})
    }
    if(!userId){
      return res.json({error:'Server error please relogin'})
    }

    const room = await Room.find({shopID:shopId,userID:userId})
    console.log(room,'------------------------this is the room')
    if(room.length){
      let roomId=room[0]._id;
      let details = await Chat.create({
        roomID: roomId,
        shopID: shopId,
        userID: userId,
        message: msg,
        sender:sender
      });
      console.log(details,'---------------------------this is already have room')
       
      return res.json(details)
      
    }else{
      let roomDetails = await Room.create({shopID:shopId,userID:userId})
      console.log(roomDetails,'-----------------------------------this is room Details')
      const thisRoomId= roomDetails._id;
      let chatDetails = await Chat.create({roomID:thisRoomId,shopID:shopId,userID:userId,message:msg,sender:sender})
      console.log(chatDetails,'------------------------------------------------chatDetails')
   
      res.json(chatDetails)
    }



  } catch (error) {
    console.log(error)
  }
}

const getChatsUser =async(req,res)=>{
  console.log(req.query,'********************')
    const {shopId,userId}=req.query;
   
    
    try {
      const result = await Chat.find({shopID:shopId,userID:userId})
      
      if(result.length){
        return res.json(result)
      }else{
        return  res.json({not:'null'})
      }
    } catch (error) {
      console.log(error)
    }
}


const getChatShop = async(req,res) =>{
   const shopId = req.query.shopId;
 
  try {
    let rooms = await Room.find({shopID:shopId})
    
    if(rooms.length){
      return res.json(rooms)
    }
  } catch (error) {
    console.log(error)
  }
  

}

const getDualChat =async(req,res)=>{
 
  const roomId =req.query.roomId;

  try {
    const chats = await Chat.find({roomID:roomId})
    if(chats.length){
    console.log(chats, "------------------------chats");

    return res.json(chats);
    }else{
      return res.json({not:'null'})
    }
   
  } catch (error) {
    console.log(error)
  }
}


const addedChatShop = async (req,res) => {
  console.log(req.body)
  try {
    const {msg,roomId,userId,shopId,sender}=req.body;
    const result = await Chat.create({roomID:roomId,shopID:shopId,userID:userId,message:msg,sender:sender})
    console.log(result)

    return res.json(result)

    
  } catch (error) {
    console.log(error)
  }
}

export { chat, getChatsUser, addedChatShop, getChatShop, getDualChat };