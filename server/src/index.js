import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


mongoose.connect(process.env.MONGO_URI)
.then(() => {

    app.listen(PORT, () => {
        console.log(`Connected to Mongodb. Server running on PORT ${PORT}`);
    });

})
.catch(err => console.log(err.message));

