const express = require("express");
const app = express();
const authRouter = require("./routes/authRoute")
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { profileRouter } = require("./routes/profileRoute");

dotenv.config();


app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/profile",profileRouter);


async function connection(){
    try {
        console.log("Database is connecting....");
        connectDB();
        console.log("Database is connected");
        app.listen(process.env.PORT,()=>{
            console.log("server running on port:",process.env.PORT);
            
        })

        
    } catch (error) {
        console.log(error);
    }

}

connection();