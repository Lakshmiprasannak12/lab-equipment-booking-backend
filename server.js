const dns=require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const app=require("./src/app");
const connectMongoDB=require("./src/config/db");
require("dotenv").config();
connectMongoDB().then(()=>{
    app.listen(5000,()=>{
        console.log("server is running  on port 5000");
    })
})