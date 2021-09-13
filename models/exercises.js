const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    reps: {  
        type: Number 
    },
    sets: { 
        type: Number 
    },
    weight: { 
        type: Number 
    },
    minutes: { 
        type: Number 
    }
});

const Exercises = mongoose.model("Exercises", exerciseSchema);

module.exports = Exercises;