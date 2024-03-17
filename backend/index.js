import express from 'express';
import mongoose from 'mongoose';
import userRoutes from '../backend/Routes/Users.js';
import cors from 'cors'
const app = express();
const PORT  = 8080



app.use(express.json())
app.use(cors())
app.get('/',(req, res) => {
    res.send('Hello World!')
})

app.use('/v1/users',userRoutes);


mongoose.connect("mongodb://0.0.0.0:27017/maps",
  { useNewUrlParser: true, }
)
.then(() => console.log('MongoDB connection established.'))
.catch((error) => console.error("MongoDB connection failed:", error.message))

app.listen(PORT, async () => {
    try {
      console.log(`Server running at PORT:${PORT} 🚀`);
    } catch (err) {
      console.log(err);
    }
});
