require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Ride = require('./models/Details');
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
            app.listen(4000,()=>{
                console.log("Working")
    })
    })
    .catch((error)=>{
        console.log(error)
    })

app.post('/signup', async (req, res) => {
    try {
        const {name, email, password } = req.body;
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ error: 'User already exists with this email' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Create new user
        const newUser = new User({name, email, password: hashedPassword });
        await newUser.save();
    
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
    });
    
    // Login route
app.post('/login', async (req, res) => {
try {
    const { email, password } = req.body;

    // Check if user exists with this email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
    return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
    return res.status(400).json({ error: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Logged in successfully' });
} catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
}
});
const rideId = 2;
app.post('/allride', async (req, res) => {
try {
    const { departure, arrival, no_of_seat,price_per_seat} = req.body;
    const newRide = new User({rideId, departure, arrival,no_of_seat,price_per_seat});
    await newride.save();
    rideId++;
    res.status(200).json({ message: 'Ride created   successfully' });
} catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
}
});