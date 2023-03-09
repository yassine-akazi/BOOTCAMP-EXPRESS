// Importing necessary modules
const express = require("express");
const app = express();
const fs = require('fs')
const path = require("path")
const cookieParser = require('cookie-parser')

// Setting view engine to ejs
app.set("view engine" , "ejs");

// Parsing request body and cookies
app.use(express.urlencoded())
app.use(cookieParser()) 

// Handling GET request for home page
app.get("/" ,function (req,res)  {
    const token = req.cookies.accessToken

    // Checking if user is authenticated
    if (!token || token === "undefined" || token === 'null' ) {
        // Redirecting to login page if not authenticated
        res.redirect("/login")
    }else {
        // Rendering home page if authenticated
        res.render("index.ejs")
    }
});

// Handling GET request for register page
app.get("/register" ,function (req,res)  {
    // Rendering register page
    res.render('register.ejs')
    console.log("is working");
});

// Handling GET request for login page
app.get("/login" ,function (req,res)  {
    const token = req.cookies.accessToken
    // Checking if user is authenticated
    if (!token || token === "undefined" || token === 'null' ) {
        // Rendering login page if not authenticated
        res.render("login.ejs")
     }else {
        // Redirecting to home page if authenticated
         res.redirect("/")
     }
});

// Handling POST request for register page
app.post("/register" ,function (req,res)  {
    const { name , email , password } = req.body ;

    // Reading data from database
    fs.readFile(path.resolve(__dirname , "./" , "db.json") , (err , data ) => {
        if (err) throw err ; 
        const _data = JSON.parse(data.toString()) ;
        
        // Adding new user to database
        _data.push({ name , email , password  })
        
        // Writing updated data to database
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

// Handling POST request for login page
app.post("/login" ,function (req,res)  {
    const { email , password } = req.body ;

    // Reading data from database
    fs.readFile(path.resolve(__dirname , "./" , "db.json") , (err , data ) => {
        if (err) throw err ; 
        const _data = JSON.parse(data.toString());
        const user = _data.find((u)=> u.email === email )
        
        // Checking if user exists in database
        if(!user){
            return res.send("user not found") ;
        }
        
        // Checking if entered password matches with database password
        if(user.password !== password) {
            return res.send("user password not...") ;
        }
        
        // Generating JWT token for user
        const token = jwt.sign(user, "sercret" , {expiresIn: '1d'})  
        
        // Setting token as cookie for authentication
        res.cookie("accessToken" , token ,  {expires: new Date(new Date().setDate(new Date().getDate() + 1))} )
        
        // Redirecting to home page
        res.redirect('/')
    }) 
});  

// logout
app.post("/logout" , function (req,res) {
    res.cookie("accessToken", undefined) 
    res.redirect('/login')
    
})

// Starting server
app.listen('4000' , function(){
    console.log('http://localhost:4000');
}); 
