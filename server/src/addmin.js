const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Admin } = require('./models/models.js'); 
const dotenv = require ('dotenv')

dotenv.config()

mongoose.connect(process.env.MONGO_URI); 

async function seedUser() {
    const hashedPassword = await bcrypt.hash('happyhappy', 10); 
    const newAdmin = new Admin({
      username: 'Leomarc',  
      password: hashedPassword,     
    });

    await newAdmin.save();
    console.log('Admin user created:', newAdmin);


    mongoose.connection.close();  
}

seedUser();