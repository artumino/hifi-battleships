//
//  NB_Server.js
//  /scripts
//
//  Created by Corrado Co. on 05/10/18.
//  Copyright 2018 Corrado Co.
//
//  Writes the team composition as given by the server
//
//

(function(){

    function NB_Server()
    {

    };
    
    NB_Server.prototype = {
      preload: function(entityID) {
        this.entityID = entityID;
        this.buildAll();
      },
      updateTeamComp: function(entityID, teamInfos) {
        
      },
      unload: function(entityID) {
          //Unload....
      }
    };

    NB_Server.prototype.buildAll = function() 
    {
        print("Sono vivo");
    };
  
    return new NB_Server();
  });