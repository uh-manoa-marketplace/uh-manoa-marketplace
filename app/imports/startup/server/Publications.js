import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
<<<<<<< HEAD
import { Items } from '../../api/item/Item';
=======
import { Items } from '../../api/item/Items';
>>>>>>> issue-007

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.find();
  }
  return this.ready();
});

<<<<<<< HEAD
Meteor.publish('Item', function publish() {
=======

Meteor.publish('Items', function publish() {
>>>>>>> issue-007
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Items.find({ owner: username });
  }
  return this.ready();
});

<<<<<<< HEAD
Meteor.publish('ItemAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.find();
=======
/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('ItemsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Items.find();
>>>>>>> issue-007
  }
  return this.ready();
});
