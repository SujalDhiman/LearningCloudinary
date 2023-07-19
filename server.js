require("dotenv").config()
const express=require("express")
const app=express()
const cors=require("cors")
const fileupload=require("express-fileupload")
const cloudinary=require("cloudinary").v2
          
//cloudinary configurations
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


//setting Middlewares
app.use(express.json())
app.use(cors())

app.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:5500")
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
    res.setHeader("Access-Control-Allow-Headers","Content-Type")
    console.log("Request Received")
    next()
})

app.get("/hello",(req,res)=>{
    res.send("Hello World")
})

app.post("/dataCatch",async(req,res)=>{
    let detail=[]

    //For multiple Files
    for(let i=0;i<req.files.myFiles.length;i++)
    {
        let result=await cloudinary.uploader.upload(req.files.myFiles[i].tempFilePath,{folder:"photographs"});
        detail.push(result)
    }

    //for single file
    // const gotFile=req.files.myFiles
    // const result=await cloudinary.uploader.upload(gotFile.tempFilePath,{folder:"photographs"})

    console.log(result)
    res.status(200).send("File Uploaded")


})

app.listen(process.env.PORT,function (){
    console.log("Server is Up")
})