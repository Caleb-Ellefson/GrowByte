import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  }
});
//When you get back user pass it through this method to remove password
UserSchema.methods.toJSON = function(){
  let obj = this.toObject()
  delete obj.password
  return obj
}

export default mongoose.model('User', UserSchema);