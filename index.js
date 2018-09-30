var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

const app = express();

var users=[
    {
        name:"xxxx",
        password:"yyyy"
    },
    {
        name:"admin",
        password:"admin"
    }
]


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(express.static('./'));

app.get('/', (req,res)=>{
    res.sendfile('index.html');
});

app.post('/login',(req,res)=>{
    var message;
    for(var user of users){
        if(user.name!=req.body.name){
            message="Wrong Name";
        }
        else{
            if(user.password!=req.body.password){
                message="Wrong Password";
                break;
            }
            else
            {
                var token = jwt.sign(user,"done");
                message="Login Success"
                break;
            }
        }
    }
    //if token is present pass the token to client else respective message
    if(token)
    {
        res.status(200).json({
            message,token
        });
    }
    else
    {
        res.status(403).json({
            message
        });
    }
});

app.use((req,res,next)=>{
    //check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token)
    {
        //Decode the token
        jwt.verify(token,"done",(err,decod)=>{
            if(err)
            {
                res.status(403).json({
                    message:"wrong token"
                });
            }
            else{
                //if decoded then call next route so that respective route is called
                req.decoded=decod;
                next();
            }
        });
    }
    else
    {
        res.status(403).json({
            message:"No token received"
        })
    }
})

app.post('/getusers',(req,res)=>{
    var user_list=[]
    users.forEach((user)=>{
        user_list.push({"name":user.name});
    })
    res.send(JSON.stringify({users:user_list}));
});

app.listen(3000, function(){
    console.log('Listening on port 3000');
});