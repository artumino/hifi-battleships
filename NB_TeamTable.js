//
//  NB_TeamTable.js
//  /scripts
//
//  Created by Corrado Co. on 05/10/18.
//  Copyright 2018 Corrado Co.
//
//  Writes the team composition as given by the server
//
//

(function(){
  const TEAM_CHANNEL = "com.corrado.TeamCompChannel";

  function NB_TeamTable()
  {
  };


  NB_TeamTable.prototype = {
    preload: function(entityID) {
      this.entityID = entityID;
      Messages.subscribe(TEAM_CHANNEL);
      Messages.dataReceived.connect(this.parseTeamComp);
    },
    unload: function(entityID) {
        //Unload....
    }
  };

  return new NB_TeamTable();
});