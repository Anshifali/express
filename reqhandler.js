import DataSchema from './model/data.js'
import bcrypt from 'bcrypt'
import UserSchema from './model/user.js'
import pkg from 'jsonwebtoken'
const {sign} = pkg

// export async function AddData(req,res) {
//     console.log(req.body);
//     const Datas = {...req.body}
//     await DataSchema.create(Datas).then(()=>{
//         res.status(201).send({msg:"successfull"})
//     }).catch((error)=>{
//         res.status(401).send({msg:"error"})
//     })
    
    
// }



export async function AddData(req,res) {
    const {title,price,image} = req.body
    const User_id = req.user.UserID
console.log(User_id);


    if(!(title&&price&&image)){
        return res.status(500).send({msg:"invalid input"})
    }else{
        DataSchema.create({title,price,image,User_id}).then(()=>{
            res.status(201).send({msg:"successfull"})
        }).catch((error)=>{
            res.status(401).send({msg:error})
        })
    }
}



export async function getData(req,res) {
     const data = await DataSchema.find()
     res.status(200).send(data)
}


export async function getSingledata(req,res) {
    const {id} = req.params
    DataSchema.findOne({_id:id}).then((data)=>{
        res.status(200).send(data)

    }).catch((error)=>{
        res.status(500).send({error:error})
    })
}


export async function updateData(req,res) {
    const {id} = req.params

    const {title,price,image} = req.body
    const userId = req.user.UserID

    DataSchema.updateOne({_id:id,User_id:userId},{$set:{title,price,image}}).then(()=>{
        res.status(200).send({msg:"updated"})
    }).catch((error)=>{
        res.status(500).send({msg:error})
    })
}


export async function deleteData(req,res) {

    const {id} = req.params

    DataSchema.deleteOne({_id:id}).then((data)=>{
        res.status(200).send({msg:"deleted"})
    }).catch((error)=>{
        res.status(500).send({error:error})
    })
}




export async function AddUser(req,res) {
    const {name,email,pass,cpass} = req.body
    if(!(name&&email&&pass&&cpass)){
        return res.status(500).send({msg:"invalid input"})
    }else if(pass!=cpass){
        return res.status(500).send({msg:"password missmatch"})
    }
    else{
        bcrypt.hash(pass,10).then((hpwd)=>{
            UserSchema.create({name,email,pass:hpwd}).then(()=>{
                res.status(200).send({msg:"user added"})
            })
        }).catch((error)=>{
            console.log(error);
            
        })
    }
}




export async function Login(req,res) {
    
    const {email,pass} = req.body
    if(!(email&&pass))
        return res.status(500).send({msg:"invalid input"})
    const user = await UserSchema.findOne({email})
    if(!user)
        return res.status(500).send({msg:"user not exist"})
    const success = await bcrypt.compare(pass,user.pass)
    if(success!==true)
        return res.status(500).send({msg:"incorrect password"})

    const token = await sign({UserID:user._id},process.env.JWT_KEY,{expiresIn:"24hr"})

    res.status(200).send({token})
}



export async function updateUser(req,res) {

    const {name,email} = req.body


    UserSchema.updateOne({_id:req.user.UserID},{$set:{name,email}}).then(()=>{
        res.status(200).send({msg:"updated user"})
    }).catch((error)=>{
        res.status(500).send({msg:error})
    })
}