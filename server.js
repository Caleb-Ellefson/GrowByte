import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
//NODEMON
const app = express()
//logs requests 
import morgan from "morgan";
import connectDB from './db/connect.js';
import { nanoid } from 'nanoid';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

//public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';


// Routers
import deviceRouter from './routes/deviceRouter.js';
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'

//Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js'


app.use(express.json())
app.use(cookieParser())

const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, './client/dist')));

//Use Morgan if in development mode
if (process.env.NODE_ENV === 'development'){ 
    app.use(morgan('dev'))
}

app.use('/api/v1/devices', authenticateUser, deviceRouter)
app.use('/api/v1/users' ,authenticateUser, userRouter )
app.use('/api/v1/auth' , authRouter )

// app.get('*', (req,res)=>{
//   res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
// })

app.use('*', (req, res) => {
  res.status(404).json({msg: 'not found'})
})

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
  

