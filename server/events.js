
Events = new Meteor.Collection('plaevents');

Meteor.publish('allevents', function() {
  return Events.find();
});

