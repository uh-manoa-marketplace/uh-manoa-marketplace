import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Messages = new Mongo.Collection('Messages');

/** Define a schema to specify the structure of each document in the collection. */
const MessageSchema = new SimpleSchema({
  message: String,
  buyer: String,
  seller: String,
  createdAt: Date,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Messages.attachSchema(MessageSchema);

/** Make the collection and schema available to other code. */
export { Messages, MessageSchema };
