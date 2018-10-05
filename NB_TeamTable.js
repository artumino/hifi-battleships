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

    function BM_TeamTable()
    {
      this.remotelyCallable = ["updateTeamComp"];
    };
  
  
    BM_TeamTable.prototype = {
      preload: function(entityID) {
        this.entityID = entityID;
        this.text = "Hello \n World";
      },
      updateTeamComp: function(entityID, teamInfos) {
        
      },
      unload: function(entityID) {
          //Unload....
      }
    };
  
    return new TestClient();
  });