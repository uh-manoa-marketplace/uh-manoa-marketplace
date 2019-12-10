import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const messages = new Mongo.Collection('buyer');

const MessageSchema = new SimpleSchema({
  buyer: String,
  seller: String,
  message: String,
  time: Date,
}, { tracker: Tracker });

messages.attachSchema(MessageSchema);

export { messages, MessageSchema };
