// Polymer body fixes
Meteor.startup(function() {
  $('body')
    .attr('unresolved', '')
    .attr('fullbleed', '')
    .attr('fit', '')
    .attr('class','polymer-theme');
});
