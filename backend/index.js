require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');
const port = process.env.PORT || 3000;
const startServer = async () => {
    try{
        await connectDB();
        app.listen(port, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
        })
    }catch(error){
        console.log('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();