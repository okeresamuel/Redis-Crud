const mongoose = require("mongoose")
const socialMediaUser = new mongoose.Schema({
    email:{
        type:String,
        Unique: true,
        default: ""
    },
    decs:{
        type:String,
        default: "",
        max: 30
    },
    coverPhoto:{
        type:String,
        default: "",
    },
    profilePhoto:{
        type:String,
        default: "",
    },
    followers:{
        type:Array,
        default: [],
    },
    followings:{
        type:Array,
        default: [],
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps: true
})

const user = mongoose.model("socialMediaUser", socialMediaUser)
module.exports = user