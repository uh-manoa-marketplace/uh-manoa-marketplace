import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const buyer = new Mongo.Collection('buyer');
const seller = new Mongo.Collection('seller');

const MessageSchema = new SimpleSchema({
  buyer: String,
  seller: String,
  message: String,
  time: Date,
}, { tracker: Tracker });

buyer.attachSchema(MessageSchema);
seller.attachSchema(MessageSchema);

export { buyer, seller, MessageSchema };
