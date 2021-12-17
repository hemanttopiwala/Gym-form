const express=require('express');
const path=require('path');
const app=express();
const fs=require('fs');


const port=80;

//EXPRESS RELATED STUFF
app.use('/static',express.static('static'));// For serving static files
app.use(express.urlencoded()); // for data reach from form to express


//PUG RELATED STUFF
app.set('view-engine','pug');// Set the templete engine
app.set('views',path.join(__dirname , 'views'));// to set the views directory


//end points
app.get('/',(req,res)=>{

    const params={title:"Pubg is the best game",
                    message:"this don't give any earning for middel class boy"}
    res.status(200).render('index.pug',params);
});

app.post('/',(req,res)=>{

    console.log(req.body);

    let name=req.body.name;
    let age=req.body.age;
    let gender=req.body.gender;
    let address=req.body.address;
    let more=req.body.more;


    let outputTowrite=`The name of the client is ${name}, ${age} years old , ${gender}, residing  in ${address} and more about him/her ${more}`;
    const params={
        message:"Your form is submiited successfully",
    }

    fs.writeFileSync('output.txt',outputTowrite);
    res.status(200).render('index.pug',params);
})


// start the server
app.listen(port,()=>{
    console.log(`Hey application started successfully on ${port}`);
});