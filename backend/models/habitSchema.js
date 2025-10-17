const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require:true
    },
    habitname : {
        type : String,
        require : true
    },
    description : {
        type : String,
        require:true
    },
    frequency:{
        type : String,
        enum:["Daily","Weekly","custom"],
        default:"Daily",
        require:true
    },
    completedDates:[{
        type:Date,
        require:true
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
}, {
    timestamps:true
});

const Habit = mongoose.model("Habit" , HabitSchema);

module.exports = Habit;