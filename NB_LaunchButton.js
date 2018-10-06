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

    function NB_LaunchButton()
    {
    };
  
  
    NB_LaunchButton.prototype = {
      preload: function(entityID) {
        this.entityID = entityID;
      },
      btnPress: function(entityID, pointerEvent) {
        var properties = Entities.getEntityProperties(this.entityID, ["userData", "parentID"]);
        var userData = JSON.parse(properties.userData);
        Entities.callEntityServerMethod(properties.parentID, "launchButtonPressed", [userData.teamId, MyAvatar.sessionUUID, MyAvatar.sessionDisplayName]);
      },
      unload: function(entityID) {
          //Unload....
      }
    };
  
    NB_LaunchButton.prototype.startNearGrab = NB_LaunchButton.prototype.btnPress;
    NB_LaunchButton.prototype.startNearTrigger = NB_LaunchButton.prototype.btnPress;
    NB_LaunchButton.prototype.startFarTrigger = NB_LaunchButton.prototype.btnPress;
    NB_LaunchButton.prototype.clickDownOnEntity = NB_LaunchButton.prototype.btnPress;

    return new NB_LaunchButton();
  });