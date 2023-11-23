import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!']
  },
  username: {
    type: String,
    required: [true, 'Email is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Username invalid!, it must have 8 - 20 alphanumeric letters and be unique!']
  },
  image: {
    type: String
  }
})

//"models" object stores all registered models, so if a model named "user" already exists, it assigns the existing model to that "user" model.. this allows reusability of existing models

//if not already present, then "models" object simply creates one and assigned to user var..

const User = models.User || model("User", userSchema);

export default User; 