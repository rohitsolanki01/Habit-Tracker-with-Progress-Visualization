const Habit = require("../models/habitSchema");


//get all habit (for logged-in user)

const getHabits = async(req,res) => {
    try{
        const habits = await Habit.find({userId:req.user._id});
        res.json(habits);
    }catch(error){
        res.status(500).json({Message : "Internal Server Error"})
    }
}


//crete new habits

const createHabit = async (req,res) => {
    try{
        const { habitname,description,frequency,completedDates,createdAt} = req.body;
        const habit = new Habit({
            userId : req.user._id,
            habitname,
            description,
            frequency,
            completedDates,
            createdAt
        });
        const savedHabit = await habit.save();
        res.json(savedHabit);
    }catch(error) {
        res.status(500).json({Message : "Internal Server Error"})
    }
}



const updateHabit = async(req,res) => {
    try{
        const habit = await Habit.findById(req.params.id);
        if(!habit){
            return res.status(404).json({Message : "Habit not found"})
        }

        if(habit.userId.toString() !== req.user._id.toString()){
            return res.status(401).json({Message : "Unauthorized"})
        }
        const updateHabit = await Habit.findByIdAndUpdate(req.params.id , req.body , {new : true})
        res.json(updateHabit)
    }catch(error){
        res.status(500).json({Message : "Internal Server Error"})
    }
}



const deleteHabit = async (req,res) => {
    try{
        const habit = Habit.findById(req.params.id);
        if(!habit){
            return res.status(404).json({Message : "Habit not Found"});
        }
        if(habit.userId.toString() !== req.user._id.toString()){
            return res.status(401).json({Message : "Unauthorized"})
        }
        const deleteHabit = await Habit.findByIdAndDelete(req.params.id);
        res.json(deleteHabit);
    }catch(error){
        res.status(500).json({Message : "Internal Server Error"})
    }
}