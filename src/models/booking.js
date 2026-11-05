const mongoose=require("mongoose");
const bookingSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    resource:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Resource",
        required:true
    },
    bookingDate:{
        type:Date,
        required:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
    status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Cancelled"],
    default: "Pending"
    },
    purpose: {
    type: String,
    required: true
    }
});
const Booking=mongoose.model("Booking",bookingSchema);
module.exports=Booking;