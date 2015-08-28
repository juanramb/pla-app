

Meteor.methods({
  createEvent: function (event) {
    var newEvent = {  eventId: event.header["Event-Id"],
                      sourceId: event.header["Source-Id"],
                      body: event.body,
                      header: event.header
                   };
    try {
      Events.insert( newEvent ) // newEvent);
    } catch(err) {
      console.log('Cannot insert event: ',event);
      console.log(err);
    };
    if (event.header.application)
      Apps.upsert({name: event.header.application}, {name: event.header.application})
    if (event.header['Source-Id'] && event.header.application === 'svn') {
      var sourceId = event.header['Source-Id'];
      var parseable = event.body.replace(/'/g,'\"');
      try {
        var body = JSON.parse(parseable);
      } catch (err) {
        console.log('Cannot parse body as JSON: ', parseable);
      }
      if (body[2]) {
        var nia=body[2];
        var alumn = Alumns.findOne({nia: nia});

        if (alumn && alumn._id) {
          console.log('for alumn: ',alumn.nia);
          console.log('su sourcesId: ',alumn.sourcesId);
          console.log('tenemos un sourceId: ',sourceId);
          var alumnId = alumn._id;
          if (alumn.sourcesId) {
            if (_.indexOf(alumn.sourcesId, sourceId) === -1)
              alumn.sourcesId.push(sourceId);
          } else {
            var sourcesId = [ sourceId ];
            console.log('sourcesId nuevo: ',sourcesId);
            alumn.sourcesId = sourcesId;
          }
          Alumns.upsert({_id: alumnId},alumn);
        }
      }
    }
  }
});
