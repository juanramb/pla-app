Apps = new Meteor.Collection('apps');

Meteor.publish('allapps', function() {
  return Apps.find();
});
