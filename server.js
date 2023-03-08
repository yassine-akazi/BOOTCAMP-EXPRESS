const express = require("express");
const app = express();
const fs = require('fs')
const path = require("path")
const cookieParser = require('cookie-parser')


app.set("view engine" , "ejs");

app.use(express.urlencoded())
app.use(cookieParser()) 


app.get("/" ,function (req,res)  {
    const token = req.cookies.accessToken

    if (!token || token === "undefined" || token === 'null' ) {
        
        res.redirect("/login")
    }else {
        res.render("index.ejs")
    }
    
});
app.get("/register" ,function (req,res)  {
    res.render('register.ejs')
    console.log("is working");
});

app.get("/login" ,function (req,res)  {
    const token = req.cookies.accessToken
    if (!token || token === "undefined" || token === 'null' ) {
        res.render("login.ejs")
 
     }else {
         res.redirect("/")
     }
});

app.post("/register" ,function (req,res)  {
    const { name , email , password } = req.body ;

    fs.readFile(path.resolve(__dirname , "./" , "db.json") , (err , data ) => {
            if (err) throw err ; 
            const _data = JSON.parse(data.toString()) ;
            _data.push({ name , email , password  })
            
            fs.writeFile(
                path.resolve(__dirname, "./", "db.json"),
                JSON.stringify(_data),
                (err) => {
                    if (err) throw err;
                    console.log(_data);
                }
                );
                
    }) 

});  
app.post("/login" ,function (req,res)  {
    const { email , password } = req.body ;

    fs.readFile(path.resolve(__dirname , "./" , "db.json") , (err , data ) => {
            if (err) throw err ; 
        const _data = JSON.parse(data.toString());
        const user = _data.find((u)=> u.email === email )
        
            if(!user){
               return res.send("user not found") ;
            }
            if(user.password !== password) {
                return res.send("user password not...") ;
                
            }
            const token = jwt.sign(user, "sercret" , {expiresIn: '1d'})  
            res.cookie("accessToken" , token ,  {expires: new Date(new Date().setDate(new Date().getDate() + 1))} )
            res.redirect('/')
            
        
    }) 

});  


app.listen('4000' , function(){
    console.log('http://localhost:4000');
});