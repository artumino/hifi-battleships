//
//  NB_Server.js
//  /scripts
//
//  Created by Corrado Co. on 05/10/18.
//  Copyright 2018 Corrado Co.
//
//  Writes the team composition as given by the server
//
//

(function(){
    const YELLOW_SUBMARINE_FBX_PATH = "atp:/NavalBattle/Yellow_Cartoon_Submarine_Final.fbx"
    const RED_SUBMARINE_FBX_PATH = "atp:/NavalBattle/Red_Cartoon_Submarine_Final.fbx"
    const LAUNCHBUTTON_FBX_PATH = "atp:/NavalBattle/LaunchButton_Final_Red.fbx"
    const SUBMARINE_DIMENSIONS = {x: 7.7175, y: 3.2999, z: 0.2196};
    const TEAMBOARDS_DIMENSIONS = {x: 1.50, y: 1.7525, z: 0.01};
    const GAME_DESCRIPTION = "To Join a Team press the button at the respective submarine.\n\nTo start a game press start button."

    //TeamBoards
    var yellowTeamBoardID;
    var redTeamBoardID;

    //Submarines
    var yellowSubmarineID;
    var redSubmarineID;

    //Misc
    var gameDescriptioID;


    function NB_Server()
    {

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
        this.yellowSubmarineID = Entities.addEntity({
            type: "Model",
            modelURL: YELLOW_SUBMARINE_FBX_PATH,
            position: Vec3.sum(properties.position, {x: 0, y: 0, z: 10}),
            rotation: properties.rotation,
            parentID: this.entityID,
            userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
            shapeType: "simple-compound",
            dimensions: SUBMARINE_DIMENSIONS
          });
        print("yellowSubmarineID created: " + this.yellowSubmarineID);

        this.redSubmarineID = Entities.addEntity({
            type: "Model",
            modelURL: RED_SUBMARINE_FBX_PATH,
            position: Vec3.sum(properties.position, {x: 0, y: 0, z: -10}),
            rotation: Quat.multiply(properties.rotation, Quat.fromPitchYawRollDegrees(0,180,0)),//al contrario
            parentID: this.entityID,
            userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
            shapeType: "simple-compound",
            dimensions: SUBMARINE_DIMENSIONS
          });
        print("redSubmarineID created: " + this.redSubmarineID);

        //Create TeamBoards
        var teamBoardsXOffset = (TEAMBOARDS_DIMENSIONS.x / 2) + (SUBMARINE_DIMENSIONS.x / 2) + 0.25;
        
        this.yellowTeamBoardID = Entities.addEntity({
            type: "Text",
            position: Vec3.sum(properties.position, {x: teamBoardsXOffset, y: 0, z: 10}),
            rotation: properties.rotation,
            parentID: this.entityID,
            text: "Yellow Team:",
            userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
            dimensions: TEAMBOARDS_DIMENSIONS
          });
        print("yellowTeamBoardID created: " + this.yellowTeamBoardID);
        
        this.redTeamBoardID = Entities.addEntity({
            type: "Text",
            position: Vec3.sum(properties.position, {x: -teamBoardsXOffset, y: 0, z: -10}),
            rotation: Quat.multiply(properties.rotation, Quat.fromPitchYawRollDegrees(0,180,0)),//al contrario
            parentID: this.entityID,
            text: "Red Team:",
            userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
            dimensions: TEAMBOARDS_DIMENSIONS
          });
        print("redTeamBoardID created: " + this.redTeamBoardID);
        
        //create more stuff TODO
        this.gameDescriptioID = Entities.addEntity({
            type: "Text",
            position: Vec3.sum(properties.position, {x: teamBoardsXOffset, y: 0, z: 0}),
            rotation: Quat.multiply(properties.rotation, Quat.fromPitchYawRollDegrees(0,90,0)),
            parentID: this.entityID,
            text: GAME_DESCRIPTION,
            userData: "{ \"grabbableKey\": { \"grabbable\": false } }",
            dimensions: {x: 2, y: 1.5, z:0.01}
          });
        print("gameDescriptioID created: " + this.gameDescriptioID);
    };
  
    return new NB_Server();
  });