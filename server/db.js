const mongoose = require("mongoose")

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
      } catch (err) {
        console.log(err);
      }
}


module.exports = connectToDb