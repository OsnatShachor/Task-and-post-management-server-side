const model = require('../models/usersModel');
//איזה בדיקות צריך לעשות????????
async function createUser(userName, name, email, phone, addressID, company){
    try{
        return model.createUser(userName, name, email, phone, addressID, company);
    }catch(err){
        throw err;
    }
    
}
async function getAllUsers(){
    try{
        return model.getAllUsers()
        console.log("lkjhg");
    }catch(err){
        throw err;
    }

}
async function getUser(userName){
    try{
        return model.getUser(userName)
    }catch(err){
        throw err;
    }
}
async function deleteUser(ID){
    // try{
    //     return model.deleteTodo(ID)
    // }catch(err){
    //     throw err;
    // }
}
async function updateUser(userID,userName, name, email, phone, addressID, company){
    console.log("77777");
    try{
        return model.updateUser(userID,userName, name, email, phone, addressID, company)
    }catch(err){
        throw err;
    }
}

module.exports = {createUser, getAllUsers, getUser ,deleteUser,updateUser}