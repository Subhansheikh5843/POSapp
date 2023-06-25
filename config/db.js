import mongoose from "mongoose";

const connectDB = async()=>{
try {
  const conn = mongoose.connect(process.env.MONGO_URL)
  console.log(`Connectd to Mongodb database ${mongoose.connection.host}` .bgMagenta.white)
} catch (error) {
  console.log(`MongoDB Error ${error}` .bgRed.white)
}
}

export default connectDB