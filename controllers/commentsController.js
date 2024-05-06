const model = require('../models/commentsModel');
//איזה בדיקות צריך לעשות????????
async function createComment(postID, body, email,commentName){
    try{
        return model.createComment(postID, body, email,commentName);
    }catch(err){
        throw err;
    }
   
}
async function getAllComments(){
    console.log("1234");
    try{
        return model.getAllComments()
    }catch(err){
        throw err;
    }

}
async function getComment(ID){
    try{
        return model.getComment(ID)
    }catch(err){
        throw err;
    }
}
async function deleteComment(ID){
    console.log("gfgg");
    try {
        const result = await model.deleteComment(ID);
        if (result === false) {
            return false;
        }
        return result;
    } catch(err) {
        // אם הייתה שגיאה אחרת
        throw err;
    }
}
async function updateComment(commentID,postID, body, email,commentName){
    try{
        return model.updateComment(commentID,postID, body, email,commentName)
    }catch(err){
        throw err;
    }
}

module.exports = {createComment, getAllComments, getComment ,deleteComment,updateComment}
