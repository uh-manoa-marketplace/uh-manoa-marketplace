import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Items } from '../../api/item/Items';
import { Favorites } from '../../api/favorite/Favorites';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
/** Initialize the database with a default data document. */
function addItem(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Items.insert(data);
}

/** Initialize the collection if empty. */
if (Items.find().count() === 0) {
  if (Meteor.settings.defaultItems) {
    console.log('Creating item data.');
    Meteor.settings.defaultItems.map(data => addItem(data));
  }
}

/** Initialize the database with a default data document. */
function addFavorite(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Favorites.insert(data);
}

/** Initialize the collection if empty. */
if (Favorites.find().count() === 0) {
  if (Meteor.settings.defaultFavorites) {
    console.log('Creating favorites data.');
    Meteor.settings.defaultFavorites.map(data => addFavorite(data));
  }
}
