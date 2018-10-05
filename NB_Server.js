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

    //LeaderBoards
    var yellowLeaderBoardID;
    var redLeaderBoardID;

    //Submarines
    var yellowSubmarineID;
    var redSubmarineID;


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


        this.yellowSubmarineID = Entities.addEntity({
            type: "Model",
            modelURL: YELLOW_SUBMARINE_FBX_PATH,
            position: Vec3.sum(properties.position, {x: 0, y: 0, z: 10}),
            rotation: properties.rotation,
            parentID: this.entityID,
            dimensions: SUBMARINE_DIMENSIONS
          });
        print("yellowSubmarineID created: " + yellowSubmarineID);

        this.redSubmarineID = Entities.addEntity({
            type: "Model",
            modelURL: RED_SUBMARINE_FBX_PATH,
            position: Vec3.sum(properties.position, {x: 0, y: 0, z: -10}),
            rotation: Vec3.multiplyVbyV(properties.rotation, {x: 1, y: -1, z: 1}),//al contrario
            parentID: this.entityID,
            dimensions: SUBMARINE_DIMENSIONS
          });
        print("redSubmarineID created: " + redSubmarineID);
        
        //create more stuff TODO
    };
  
    return new NB_Server();
  });