import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    title:{type:String},
    price:{type:Number},
    image:{type:String},
    User_id:{type:String}

})

export default mongoose.models.Datas||mongoose.model('Datas',DataSchema)    