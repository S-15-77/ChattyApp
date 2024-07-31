const messageModel = require('../model/messageModel')
module.exports.addMessage = async (req, res, next) => {
    try{
        const {from,to,message} = req.body;
        const data = await messageModel.create({
            message:{text:message},
            users:[from,to],
            sender:from,
        });
        if(data) return res.json({msg:"Message sent"});
        return res.json({msg:"Failed to add Message to Database"});
    }
    catch(e){
        next(e);
    }
}
module.exports.getAllMessage = async (req, res, next) => {
     try{
        const {from,to} = req.body;
        const messages = await messageModel.find({
            users:{$all:[from,to]},
        }).sort({updatedAt:1});
        const projectMessges = messages.map((msg)=>{
            return {
                fromSelf: msg.sender.toString() === from.toString(),
                message: msg.message.text,
            };
        });
        res.json(projectMessges);

     }
     catch(e){
         next(e);
     }
}