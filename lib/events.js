

Meteor.methods({
  createEvent: function (event) {
    Events.insert({eventId: event.header["Event-Id"], body: event.body, header: event.header});
  }
});
