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

  const TEAM_CHANNEL = "com.corrado.TeamCompChannel";

  function NB_Client()
  {
    this.remotelyCallable = ["announceMessage"];
  };


  NB_Client.prototype = {
    preload: function(entityID) {
      this.entityID = entityID;
      Messages.subscribe(TEAM_CHANNEL);
      Messages.dataReceived.connect(this.parseTeamComp);
    },
    announceMessage: function(entityID, message) {
      Window.displayAnnouncement(message);
    },
    parseTeamComp: function(channel, data, senderID, localOnly) 
    {
      if(senderID == this.entityID)
      {
        var redTeamComp = "Red Team:\n";
        var yellowTeamComp = "Yellow Team:\n";
        var redTeamBoardID = data.redTeamBoardID;
        var yellowTeamBoardID = data.yellowTeamBoardID;

        for (i = 0; i < data.yellowPlayers.length; i++)
            yellowTeamComp += AvatarList.getAvatar(data.yellowPlayers[i]).displayName + "\n";

        for (i = 0; i < data.redPlayers.length; i++)
            redTeamComp += AvatarList.getAvatar(data.redPlayers[i]).displayName + "\n";

        Entities.editEntity(redTeamBoardID, {
            text: redTeamComp
        });
        Entities.editEntity(yellowTeamBoardID, {
            text: yellowTeamComp
        });
      }
    },
    unload: function(entityID) {
        //Unload....
        Messages.dataReceived.disconnect(this.parseTeamComp);
        Messages.unsubscribe(TEAM_CHANNEL);
    }
  };

  return new NB_Client();
});