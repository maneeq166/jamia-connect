async function passportLogin(req,res){
    res.json({ message: "Logged in via passport session", user: req.user });
}


module.exports = {
    passportLogin
}