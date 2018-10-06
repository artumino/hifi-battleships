//
//  NB_Server.js
//  /scripts
//
//  Created by Corrado Co. on 05/10/18.
//  Copyright 2018 Corrado Co.
//
//  Generates the playground and handles the game
//
//

(function(){
    //Files
    const YELLOW_SUBMARINE_FBX_PATH = "atp:/NavalBattle/Yellow_Cartoon_Submarine_Final.fbx"
    const RED_SUBMARINE_FBX_PATH = "atp:/NavalBattle/Red_Cartoon_Submarine_Final.fbx"
    const LAUNCHBUTTON_FBX_PATH = "atp:/NavalBattle/LaunchButton_Final_Red.fbx"

    const LAUNCHBUTTON_SCRIPT_PATH = "https://raw.githubusercontent.com/artumino/hifi-battleships/master/NB_LaunchButton.js"

    //Dimensions
    const SUBMARINE_DIMENSIONS = {x: 7.7175, y: 3.2999, z: 0.2196};
    const LAUNCHBUTTON_DIMENSIONS = {x: 0.3595, y: 1.5122, z: 0.3595};
    const TEAMBOARDS_DIMENSIONS = {x: 1.50, y: 1.7525, z: 0.01};

    //Strings
    const GAME_DESCRIPTION = "To Join a Team press the button at the respective submarine.\n\nTo start a game press start button."


    //Enums
    const GameStage = {
        Register: 0,
        YellowVoting: 1,
        YellowVoted: 2,
        RedVoting: 3,
        RedVoted: 4,
        RedWin: 5,
        YellowWin: 6,
    };

    const Team = {
        Yellow: 0,
        Red: 1,
        Both: 2
    }

    //TeamBoards
    var yellowTeamBoardID;
    var redTeamBoardID;

    //Submarines
    var yellowSubmarineID;
    var yellowLaunchButtonID;
    var redSubmarineID;
    var redLaunchButtonID;

    //Misc
    var gameDescriptioID;

    //GameState
    var gameState =
    {
        stage: GameStage.Register,
        yellowPlayers: [],
        redPlayers: [],
        playerNames: {}
    };


    function NB_Server()
    {
        this.remotelyCallable = ["launchButtonPressed"];
    };

    NB_Server.prototype = {
      preload: function(entityID) {
        this.entityID = entityID;
        this.buildAll();
      },
      unload: function(entityID) {
          //Unload....
      }
    };

    NB_Server.prototype.buildAll = function() 
    {
        //getting properties of parent
        var properties = Entities.getEntityProperties(this.entityID, ["rotation", "position"]);

        //Create Submarines
        yellowSubmarineID = Entities.addEntity({
            type: "Model",
            modelURL: YELLOW_SUBMARINE_FBX_PATH,
            position: Vec3.sum(properties.position, {x: 0, y: 0, z: 10}),
            rotation: properties.rotation,
            parentID: this.entityID,
            userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
            shapeType: "simple-compound",
            dimensions: SUBMARINE_DIMENSIONS
          });
        print("yellowSubmarineID created: " + yellowSubmarineID);

        yellowLaunchButtonID = Entities.addEntity({
            type: "Model",
            modelURL: LAUNCHBUTTON_FBX_PATH,
            position: Vec3.sum(properties.position, {x: 0, y: 0, z: 10.25}),
            rotation: properties.rotation,
            parentID: this.entityID,
            userData: "{ \"grabbableKey\": { \"grabbable\": false }, \"teamId\": 0 }",
            shapeType: "simple-compound",
            script: LAUNCHBUTTON_SCRIPT_PATH,
            dimensions: LAUNCHBUTTON_DIMENSIONS
          });
        print("yellowLaunchButtonID created: " + yellowLaunchButtonID);

        redSubmarineID = Entities.addEntity({
            type: "Model",
            modelURL: RED_SUBMARINE_FBX_PATH,
            position: Vec3.sum(properties.position, {x: 0, y: 0, z: -10}),
            rotation: Quat.multiply(properties.rotation, Quat.fromPitchYawRollDegrees(0,180,0)),//al contrario
            parentID: this.entityID,
            userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
            shapeType: "simple-compound",
            dimensions: SUBMARINE_DIMENSIONS
          });
        print("redSubmarineID created: " + redSubmarineID);

        redLaunchButtonID = Entities.addEntity({
            type: "Model",
            modelURL: LAUNCHBUTTON_FBX_PATH,
            position: Vec3.sum(properties.position, {x: 0, y: 0, z: -10.25}),
            rotation: Quat.multiply(properties.rotation, Quat.fromPitchYawRollDegrees(0,180,0)),
            parentID: this.entityID,
            userData: "{ \"grabbableKey\": { \"grabbable\": false }, \"teamId\": 1 }",
            shapeType: "simple-compound",
            script: LAUNCHBUTTON_SCRIPT_PATH,
            dimensions: LAUNCHBUTTON_DIMENSIONS
          });
        print("redLaunchButtonID created: " + redLaunchButtonID);

        //Create TeamBoards
        var teamBoardsXOffset = (TEAMBOARDS_DIMENSIONS.x / 2) + (SUBMARINE_DIMENSIONS.x / 2) + 0.25;
        
        yellowTeamBoardID = Entities.addEntity({
            type: "Text",
            position: Vec3.sum(properties.position, {x: -teamBoardsXOffset, y: 0, z: 10}),
            rotation: Quat.multiply(properties.rotation, Quat.fromPitchYawRollDegrees(0,180,0)),//al contrario
            parentID: this.entityID,
            text: "Yellow Team:",
            userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
            dimensions: TEAMBOARDS_DIMENSIONS
          });
        print("yellowTeamBoardID created: " + yellowTeamBoardID);
        
        redTeamBoardID = Entities.addEntity({
            type: "Text",
            position: Vec3.sum(properties.position, {x: -teamBoardsXOffset, y: 0, z: -10}),
            rotation: properties.rotation,
            parentID: this.entityID,
            text: "Red Team:",
            userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
            dimensions: TEAMBOARDS_DIMENSIONS
          });
        print("redTeamBoardID created: " + redTeamBoardID);
        
        //create more stuff TODO
        gameDescriptioID = Entities.addEntity({
            type: "Text",
            position: Vec3.sum(properties.position, {x: -teamBoardsXOffset * 1.3, y: 0, z: 0}),
            rotation: Quat.multiply(properties.rotation, Quat.fromPitchYawRollDegrees(0,-90,0)),
            parentID: this.entityID,
            text: GAME_DESCRIPTION,
            userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
            dimensions: {x: 2, y: 1.5, z:0.01}
          });
        print("gameDescriptioID created: " + gameDescriptioID);
    };

    NB_Server.prototype.launchButtonPressed = function(entityID, eventInfo)
    {
        //Register player to the team
        var teamID = eventInfo[0];
        var playerID = eventInfo[1];
        var data = eventInfo[2]; //Optional

        if(gameState.stage == GameStage.Register)
        {
            var selectedTeam = (teamID == Team.Red) ? gameState.redPlayers : gameState.yellowPlayers;
            var oppositeTeam = (teamID == Team.Red) ? gameState.yellowPlayers : gameState.redPlayers;
            if(selectedTeam.indexOf(playerID) != -1)
            {
                this.announceToPlayer(playerID, "You are already registered to this team!");
            }
            else
            {
                var oppositeTeamIndex = oppositeTeam.indexOf(playerID);

                if(oppositeTeamIndex != -1)
                    oppositeTeam.splice(oppositeTeamIndex, 1); //Remove from opposite team, add to new

                selectedTeam.push(playerID);
                gameState.playerNames[playerID] = data;
                this.announceToPlayer(playerID, "Registered to team " + ((teamID == Team.Red) ? "Red" : "Yellow"));
            }

            this.updateTeams();
        }
        else
        {
            this.announceToPlayer(playerID, "The registration phase is over...");
        }
    };

    //Utilities
    NB_Server.prototype.updateTeams = function()
    {
        var redTeamComp = "Red Team:\n";
        var yellowTeamComp = "Yellow Team:\n";

        for (i = 0; i < gameState.yellowPlayers.length; i++)
        {
            yellowTeamComp += gameState.playerNames[gameState.yellowPlayers[i]]  + "\n";
        }

        for (i = 0; i < gameState.redPlayers.length; i++)
        {
            redTeamComp += gameState.playerNames[gameState.redPlayers[i]] + "\n";
        }

        Entities.editEntity(redTeamBoardID, {
            text: redTeamComp
        });
        Entities.editEntity(yellowTeamBoardID, {
            text: yellowTeamComp
        });
    }

    NB_Server.prototype.announceToPlayer = function(playerID, message)
    {
        Entities.callEntityClientMethod(playerID, this.entityID, "announceMessage", [message]);
    }

    NB_Server.prototype.broadcast = function(message, team)
    {
        var toPlayers;

        if(!team || team == Team.Both)
            toPlayers = gameState.redPlayers.concat(gameState.yellowPlayers);
        if(team == Team.Red)
            toPlayers = gameState.redPlayers;
        if(team == Team.Yellow)
            toPlayers = gameState.yellowPlayers;
        
        for (i = 0; i < toPlayers.length; i++)
            this.announceToPlayer(toPlayers[i], message);
    }
    return new NB_Server();
  });