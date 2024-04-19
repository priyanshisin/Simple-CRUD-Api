const express = require('express') 
const mongoose = require('mongoose')
const Todo = require('./models/todoModel.js');


const app = express();

app.use(express.json());


app.get('/',(req,res) => {
    res.send("Hello from Node API updated");
});


//Read Api
app.get('/todo',async(req,res)=> {
    try{
        const task = await Todo.find({});
        res.status(200).json(task);
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message});
    }
});

//Read Api : allows to access using ids.
app.get('/todo/:id',async(req,res)=> {
    try{
        const { id } = req.params;
        const task = await Todo.findById(id);
        res.status(200).json(task);
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message});
    }
});


//Create or Post Api
app.post('/todo',async(req,res)=> {
    try{
        const task = await Todo.create(req.body);
        res.status(200).json(task);
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message});
    }
});


//Update API
app.put('/todo/:id',async(req,res) => {
    try{
        const { id } = req.params;
        const task = await Todo.findByIdAndUpdate(id,req.body);
        if(!task) {
            console.log(error.message)
            res.status(500).json({message:error.message});
        }
        const updatedTask = await Todo.findById(id);
        res.status(200).json(updatedTask);
    }catch(error) {
        console.log(error.message)
        res.status(500).json({message:error.message});
    }
});

//Delete API
app.delete('/todo/:id' , async(req, res) => {
    const { id } = req.params;
    const task = await Todo.findByIdAndDelete(id);
    if(!task) {
        console.log(error.message)
        res.status(500).json({message:error.message});
    }
    res.status(200).json({message: "Task Deleted Successfully"});
});


mongoose.connect("mongodb+srv://priyanshisin01:zdceE8dp4UdpT8EM@cluster0.ea9dozy.mongodb.net/Node-Api?retryWrites=true&w=majority")
.then(()=> {
    console.log("Connected to database")
    app.listen(3000,()=> {
        console.log("Server is running on port 3000")
    });
})
.catch(()=> {
    console.log("connection failed!")
});
