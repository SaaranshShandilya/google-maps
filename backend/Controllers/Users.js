import {UserModel} from '../Schemas/User.js';
import bcrypt from 'bcrypt'
export const createUser =async (req, res) => {
    const {name, email, password} = req.body;
    const extinguishUser = await UserModel.findOne({email})
    if(extinguishUser!=null){
       return res.json({"status":"User already exists"})
    }

    UserModel.create({
        name:name,
        email:email,
        password:password
    })
    .then((response) => {
        console.log(response)
        res.status(200).json({"Status":"User created successfully", "id":response._id})
    })
    .catch((err) => {
        console.log(err)
    })
}

export const userLogin =async (req, res) => {
    const {email, password} = req.body;
    const existingUser = await UserModel.findOne({email})
   
    if(existingUser == null){
        return res.status(201).json({"status":"User does not exist"})
    }


    const auth = await bcrypt.compare(password, existingUser.password)
    if (!auth) {
        return res.status(201).json({message:'Incorrect password or email' }) 
    }
    return res.status(200).json({"status":"User logged in succesfully", "id":existingUser._id})
}

export const updateLocation = async (req, res) => {
    const {lat, long, id} = req.body;
    const filter = {_id:id}
    const update = {lat:lat, long:long}

    const doc = await UserModel.findOneAndUpdate(filter, update,{new:true});

    if(!doc){
        return res.status(201).json({"status":"User does not exist"})
    }

    return res.status(200).json({"status":"User updated succesfully"})
}

export const getAllUsers = async (req, res) => {
    const data = await UserModel.find({});
    return res.status(200).json({"users":data})
}

