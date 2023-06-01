import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require: [true, 'User first name is required'],
        min:2,
        max:50,
    },
    lastName:{
        type:String,
        require: [true, 'User last name is required'],
        min:2,
        max:50,
    },
    email:{
        type:String,
        require: [true, 'User email is required'],
        unique: true,
    },
    password:{
        type:String,
        require: [true, 'User password is required'],
        min:5,
    },
    picturePath:{
        type:String,
        default: '',
    },
    friends: {
        type: Array,
        default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
},
{timestamps: true}
);

const User = mongoose.model('user', UserSchema);

export default User;