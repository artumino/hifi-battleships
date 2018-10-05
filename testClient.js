//
//  TestClient.js
//  /scripts
//
//  Created by Corrado Co. on 05/10/18.
//  Copyright 2018 Corrado Co.
//
//  TestClient script
//
//
"use strict";

(function(){

  function TestClient()
  {
    this.remotelyCallable = ["displayMessage"];
  };


  TestClient.prototype = {
    preload: function(entityID) {
      this.entityID = entityID;
    },
    btnPress: function(entityID, pointerEvent) {
      Entities.callEntityServerMethod(this.entityID, "echo", ["Hello World", MyAvatar.sessionUUID]);
    },
    displayMessage: function(entityID, message) {
      Window.displayAnnouncement(message);
    },
    unload: function(entityID) {
        //Unload....
    }
  };

  TestClient.prototype.startNearGrab = TestClient.prototype.btnPress;
  TestClient.prototype.startNearTrigger = TestClient.prototype.btnPress;
  TestClient.prototype.startFarTrigger = TestClient.prototype.btnPress;
  TestClient.prototype.clickDownOnEntity = TestClient.prototype.btnPress;

  return new TestClient();
});