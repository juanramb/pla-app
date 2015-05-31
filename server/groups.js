Groups = new Meteor.Collection('groups');
Meteor.publish('allgroups', function() {
  return Groups.find();
});
