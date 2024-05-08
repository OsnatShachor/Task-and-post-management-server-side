const model = require('../models/usersModel');
//איזה בדיקות צריך לעשות????????

async function getAllUsers(){
    try{
        return model.getAllUsers()
        console.log("lkjhg");
    }catch(err){
        throw err;
    }

}
async function getUserByUserName(userName){
    try{
        return model.getUserByUserName(userName)
    }catch(err){
        throw err;
    }
}
async function getUserByNamePassword(userName,password){
    try{
        return model.getUserByNamePassword(userName,password)
    }catch(err){
        throw err;
    }
}

async function createUser(userName, name, email, phone, company, password, street, city, zipcode){
    try{
        return model.createUser(userName, name, email, phone, company, password, street, city, zipcode);
    }catch(err){
        throw err;
    }  
}

async function updateUser(userID,userName, name, email, phone, addressID, company){
    console.log("77777");
    try{
        return model.updateUser(userID,userName, name, email, phone, addressID, company)
    }catch(err){
        throw err;
    }
}

module.exports = {createUser, getAllUsers, getUserByUserName ,updateUser,getUserByNamePassword}