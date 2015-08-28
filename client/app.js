// Polymer body fixes
Meteor.startup(function() {
  $('body')
    .attr('unresolved', '')
    .attr('class','fullbleed layout vertical polymer-theme');


});
Template.myNav.helpers({
  statusIcon: function () {
    return Meteor.status().status ? 'cloud-done' : 'cloud-off';
  },
  status: function () {
    return Meteor.status().status;
  }
});
