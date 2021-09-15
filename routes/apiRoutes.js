const router = require("express").Router();
const Workout = require("../models").Workout;

router.get('/api', (req, res) => {
    Workout.find()
    .then(workouts => res.json(workouts))
    .catch(err => res.json(err));
    
});

router.put('/api/workouts/:id', (req, res) => {
    Workout.findByIdAndUpdate(
        req.params.id,
        { $push: { exercises: req.body }},
        { new: true }
    )
    .then(workout => res.json(workout))
    .catch(err => res.json(err))
});

router.post('/api/workouts', (req, res) => {
    Workout.create({
        day: Date.now()
    })
    .then(newWorkout => {
        console.log("new workout created");
        res.json(newWorkout)
    })
    .catch(err => res.json(err))
})


router.get('/api/workouts', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ])
    .then((data) => {
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
});

router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $set: {
                totalDuration: {
                    $sum: "$exercises.duration",
                }
            }
        }
    ])
    .sort({
        _id: -1,
    })
    .limit(7)
    .then((data) => {
        console.log(data)
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
});


module.exports = router