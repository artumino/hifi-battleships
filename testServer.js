//
//  TestServer.js
//  /scripts
//
//  Created by Corrado Co. on 05/10/18.
//  Copyright 2018 Corrado Co.
//
//  TestServer script
//
//
"use strict";

(function(){

  function TestServer()
  {
    this.remotelyCallable = ["echo"];
  };

  TestServer.prototype = {
    preload: function(entityID) {
      this.entityID = entityID;
    },
    echo: function(entityID, message, playerID) {
      Entities.callEntityClientMethod(playerID, this.entityID, "displayMessage", [message]);
    },
    unload: function(entityID) {
        //Unload....
    }
  };

  return new TestServer();
});