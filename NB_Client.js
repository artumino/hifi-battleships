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
    this.remotelyCallable = ["announceMessage", "startGame"];
  };

  var selectionQuadsIDs = [];

  NB_Client.prototype = {
    preload: function(entityID) {
      this.entityID = entityID;
      var that = this;
      Script.include("NB_Lib.js", function() {
        print("NB_Lib loaded!");
        that.lib = new NB_Lib(that.entityID);
    });
    },
    announceMessage: function(entityID, message) {
      Window.displayAnnouncement(message);
    },
    unload: function(entityID) {
        //Unload....
    }
  };

  NB_Client.prototype.startGame = function(entityID, team)
  {
    //Genera i cubi per la scelta in locale....
    print("Starting client game...");
    this.buildSelectionQuad(0,0,team);
  };

  NB_Client.prototype.buildSelectionQuad = function(x, y, team)
  {
    var position = this.lib.getCellCenter(x,y,team);
    print("Spawning at cell 0,0 with location: x=" + position.x + " y=" +position.y + " z=" + position.z);
    var rotation = Entities.getEntityProperties(this.entityID, ["rotation"]).rotation;
    var xIncrement = PLAYGROUND_SIZE.x / PLAYGROUND_DIVISIONS.x;
    var zIncrement = PLAYGROUND_SIZE.z / PLAYGROUND_DIVISIONS.y;

    var currentScriptURL = Entities.getEntityProperties(this.entityID, ["script"]).script;
    var scriptURLBase = currentScriptURL.substring(0, currentScriptURL.lastIndexOf('/')) + "/NB_SelectionItem.js";
    
    selectionQuadsIDs.push(Entities.addEntity({
      type: "Shape",
      shape: "Quad",
      position: position,
      rotation: rotation,
      parentID: this.entityID,
      userData: "{ \"grabbableKey\": { \"grabbable\": false }}",
      collisionless: true,
      canCastShadow: false,
      clientOnly: true,
      script: scriptURLBase,
      dimensions: {x: xIncrement, z: zIncrement}
    }));
  };

  return new NB_Client();
});