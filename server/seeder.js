//  Gets db initial data from private folder
//  Insert data in db
Meteor.startup( function () {
  Assets.getText('data.json', function (error, data) {
    if (error)
      console.log('Data asset not found, not seeding ',error);
    else {
      var data = JSON.parse(data);
      //console.log('Data: ',data);
      //Seed db only if collections are empty
      if (Alumns.find().count() === 0 && Groups.find().count() === 0) {
      //Create alumns and get their ids
        var alumns = data.alumns.map(function (alumn) {
          var alumnId = Alumns.insert(alumn);
          return _.extend({_id: alumnId},alumn)
        });
        data.groups.forEach(function(group) {
          var membersId = group.members.map(function (member) {
            return _.find(alumns, function (alumn) {
              return alumn.nia == member.nia;
            })._id;
          });
          group = _.extend(group,{members: membersId});
          Groups.insert(group);
        });
        
      }
    }
  });
});



