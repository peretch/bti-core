// This model will be commented as an example of
// how to add TypeScript interfaces to mongoose

import mongoose from 'mongoose';

// An interface to describe required properties
// to create a ticket
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

// Interface that describes the properties
// That a Ticket DOCUMENT/instance has
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  createdAt: string;
}

// An interface that describes the properties
// that the Ticket MODEL has
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

// Ticket Schema definition
const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      // This will transform the returned object after creating ticket
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// Instead of creating a new ticket by using constructor,
// we are going to use this function as workaraund to avoid typescript errors with types
// statics property documentation - https://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
