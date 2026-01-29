import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    pass:{type:String}

})

export default mongoose.models.users||mongoose.model('users',UserSchema)