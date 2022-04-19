// This model will be commented as an example of
// how to add TypeScript interfaces to mongoose

import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface to describe required properties
// to create a user
interface UserAttrs {
  email: string;
  password: string;
}

// Interface that describes the properties
// That a User DOCUMENT/instance has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// An interface that describes the properties
// that the User MODEL has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// User Schema definition
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      // This will transform the returned object after creating user
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// Remember we use "function" keyword because is a class.
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// Instead of creating a new user by using constructor,
// we are going to use this function
// statics property documentation - https://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
