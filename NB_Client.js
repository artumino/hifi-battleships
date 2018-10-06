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
    this.buildSelectionQuad(0,0,team);
  };

  NB_Client.prototype.buildSelectionQuad = function(x, y, team)
  {
    var rotation = Entities.getEntityProperties(this.entityID, ["rotation"]).rotation;
    var xIncrement = PLAYGROUND_SIZE.x / PLAYGROUND_DIVISIONS.x;
    var zIncrement = PLAYGROUND_SIZE.z / PLAYGROUND_DIVISIONS.y;
    selectionQuadsIDs.push(Entities.addEntity({
      type: "Shape",
      shape: "Quad",
      position: this.lib.getCellCenter(x,y,team),
      rotation: rotation,
      parentID: this.entityID,
      userData: "{ \"grabbableKey\": { \"grabbable\": false }}",
      collisionless: true,
      canCastShadow: false,
      clientOnly: true,
      script: 'NB_SelectionItem.js',
      dimensions: {x: xIncrement, z: zIncrement}
    }));
  };

  return new NB_Client();
});