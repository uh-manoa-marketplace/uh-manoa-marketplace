import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Favorites = new Mongo.Collection('Favorites');

/** Define a schema to specify the structure of each document in the collection. */
const FavoritesSchema = new SimpleSchema({
  category: {
    type: String,
    allowedValues: ['electronics', 'books', 'supplies', 'furniture', 'miscellaneous'],
    defaultValue: 'electronics',
  },
  name: String,
  price: Number,
  image: String,
  owner: String,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
  description: String,
  liked: [String],
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Favorites.attachSchema(FavoritesSchema);

/** Make the collection and schema available to other code. */
export { Favorites, FavoritesSchema };
