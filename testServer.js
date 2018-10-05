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
      print("Loaded server entity " + entityID);
    },
    echo: function(entityID, infos) {
      print("Called echo with params " + infos[0] + " and " + infos[1]);
      Entities.callEntityClientMethod(infos[1], this.entityID, "displayMessage", [infos[0]]);
    },
    unload: function(entityID) {
        //Unload....
    }
  };

  return new TestServer();
});