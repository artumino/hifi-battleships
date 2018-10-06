//
//  NB_LaunchButton.js
//  /scripts
//
//  Created by Corrado Co. on 05/10/18.
//  Copyright 2018 Corrado Co.
//
//  Writes the team composition as given by the server
//
//

(function(){

    function NB_LaunchGameButton()
    {
    };
  
  
    NB_LaunchGameButton.prototype = {
      preload: function(entityID) {
        this.entityID = entityID;
      },
      btnPress: function(entityID, pointerEvent) {
        var properties = Entities.getEntityProperties(this.entityID, ["userData", "parentID"]);
        var userData = JSON.parse(properties.userData);
        Entities.callEntityServerMethod(properties.parentID, "launchGameButtonPressed", [userData.teamId, MyAvatar.sessionUUID, MyAvatar.sessionDisplayName]);
      },
      unload: function(entityID) {
          //Unload....
      }
    };
  
    NB_LaunchGameButton.prototype.startNearGrab = NB_LaunchGameButton.prototype.btnPress;
    NB_LaunchGameButton.prototype.startNearTrigger = NB_LaunchGameButton.prototype.btnPress;
    NB_LaunchGameButton.prototype.startFarTrigger = NB_LaunchGameButton.prototype.btnPress;
    NB_LaunchGameButton.prototype.clickDownOnEntity = NB_LaunchGameButton.prototype.btnPress;

    return new NB_LaunchGameButton();
  });