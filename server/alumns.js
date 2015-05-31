Alumns = new Meteor.Collection('alumns');
Meteor.publish('allalumns', function() {
  return Alumns.find();
});

