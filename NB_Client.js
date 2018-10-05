//
//  NB_Client.js
//  /scripts
//
//  Created by Corrado Co. on 05/10/18.
//  Copyright 2018 Corrado Co.
//
//  Client-side utilities for the server, announcer, etc.
//
//

(function(){

    function NB_Client()
    {
      this.remotelyCallable = ["announceMessage"];
    };
  
  
    NB_Client.prototype = {
      preload: function(entityID) {
        this.entityID = entityID;
        Entities.editEntity(entityID, {
            text: "Hello \n World"
        });
      },
      announceMessage: function(entityID, message) {
        Window.displayAnnouncement(message);
      },
      unload: function(entityID) {
          //Unload....
      }
    };
  
    return new NB_Client();
  });