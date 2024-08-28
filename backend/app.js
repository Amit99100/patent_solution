const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const { isAuthenticated } = require('./middleware/auth')
const nodemailer = require('nodemailer');

//IMPORT ROUTES
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');


const { resetpassword } = require('./controllers/resetpassword');
const { forgetpassword } = require('./controllers/forgetpassword');

const path = require("path");


// CONNECT DATABASE      .then is promise ( you shouold should know )




const uri = "mongodb+srv://akm1632456:fvYpKSKCmWnNz1sq@patentapp.pwfedco.mongodb.net/?retryWrites=true&w=majority&appName=patentapp";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Connection error', err));

// mongoose.connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// })
//     .then(() => console.log('DB connected'))
//     .catch((err) => console.log(err));

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    limit: '100mb',
    extended: true
}));
app.use(cookieParser()); // to remove token and logout the users ( to user )
app.use(cors());



// ROUTES MIDDLEWARE
app.use("/api", authRoutes)
app.use("/api", productRoutes)
app.use("/api", categoryRoutes)

app.use("/api", resetpassword)
app.use("/api", forgetpassword)



//for userdashboard 
// const questionRoutes = require('./routes/question');
// app.use('/api/questions', questionRoutes);
// This is for master dashboard 



//* verfiy token 




////// ** 

// This is end of master dashboard


const __dirname1 = path.resolve();
console.log("Current Directory:", __dirname1);

let ans;

if (process.env.NODE_ENV === "production") {
    // Remove both 'backend' and 'patent app' portions from the path
    ans = path.resolve(__dirname1); // Move up two directory levels

    console.log("Adjusted Directory:", ans);

    app.use(express.static(path.join(ans, 'frontend', 'build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(ans, 'frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        console.log("Ans in development:", ans);
        res.send('API is running.. maurya');
    });
}
// --------------------------deployment------------------------------


//ERROR MIDDLEWARE
app.use(errorHandler);

const port = process.env.PORT || 8000;


app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})