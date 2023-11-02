const express = require('express');
const nocache=require('nocache')
const router = express.Router();

const credentials = {
  email: "sanju@gmail.com",
  password: "logan123"
};
//login user
router.post('/login',nocache(),(req, res) => {
  if (req.body.email === credentials.email && req.body.password === credentials.password) {
    req.session.user = req.body.email;
    res.redirect('/route/dashboard');
  }else if(credentials.email !=req.body.email){
    let emailErr=encodeURIComponent("Invalid email")
    res.redirect('/?invalid_email='+emailErr)
  }else{
    let passwordErr=encodeURIComponent("Invalid password")
    res.redirect('/?invalid_password='+passwordErr)
  }
});

const authuser=(req,res,next)=>{
  if(req.session.user){
    next()
  }else{
    res.render('base',{title:"invalid"})
  }
}
//route for dashbord
router.get('/dashboard',authuser,nocache(),(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user: req.session.user,title:"Dashboard"})
    }else{
      return res.redirect('/')
    }
});
//route for logout
router.get('/logout',(req,res)=> {
  req.session.destroy(function(err){
    if(err){
      console.log(err)
      res.send("Error")
    }else{
    let passedVariable = encodeURIComponent('Logged out successfully');
        res.redirect('/?valid=' + passedVariable);
    }
  });
});


module.exports = router;

