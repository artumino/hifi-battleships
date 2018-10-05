//
//  BM_TeamTable.js
//  /scripts
//
//  Created by Corrado Co. on 05/10/18.
//  Copyright 2018 Corrado Co.
//
//  Writes the team composition as given by the server
//
//

(function(){

    function NB_TeamTable()
    {
      this.remotelyCallable = ["updateTeamComp"];
    };
  
  
    NB_TeamTable.prototype = {
      preload: function(entityID) {
        this.entityID = entityID;
        Entities.editEntity(entityID, {
            text: "Hello \n World"
        });
      },
      updateTeamComp: function(entityID, teamInfos) {
        
      },
      unload: function(entityID) {
          //Unload....
      }
    };
  
    return new NB_TeamTable();
  });