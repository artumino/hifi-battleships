//#region Constants
//Files
const YELLOW_SUBMARINE_FBX_PATH = "atp:/NavalBattle/Yellow_Cartoon_Submarine_Final.fbx"
const RED_SUBMARINE_FBX_PATH = "atp:/NavalBattle/Red_Cartoon_Submarine_Final.fbx"
const LAUNCHBUTTON_FBX_PATH = "atp:/NavalBattle/LaunchButton_Final_Red.fbx"

const LAUNCHBUTTON_SCRIPT_PATH = "https://raw.githubusercontent.com/artumino/hifi-battleships/master/NB_LaunchButton.js"

//Dimensions
const SUBMARINE_DIMENSIONS = {x: 7.7175, y: 3.2999, z: 0.2196};
const LAUNCHBUTTON_DIMENSIONS = {x: 0.3595, y: 1.5122, z: 0.3595};
const TEAMBOARDS_DIMENSIONS = {x: 1.50, y: 1.7525, z: 0.01};
const PLAYGROUND_SIZE = {x: 10, z: 10};
const PLAYGROUND_DIVISIONS = {x: 15, y: 15};

//Strings
const GAME_DESCRIPTION = "To Join a Team press the button at the respective submarine.\n\nTo start a game press start button."


//Enums
const GameStage = {
    Register: 0,
    PreGame: 1,
    YellowVoting: 2,
    YellowVoted: 3,
    RedVoting: 4,
    RedVoted: 5,
    RedWin: 6,
    YellowWin: 7
};

const Team = {
    Yellow: 0,
    Red: 1,
    Both: 2
}
//#endregion

(function(){
    function NB_Lib()
    {

    }

    NB_Lib.prototype = 
    {
        entityID = "{}"
    };

    NB_Lib.prototype.getAbsolutePosition = function(relativePosition)
    {
        var position = Entities.getEntityProperties(this.entityID, ["position"]).position;
        return Vec3.sum(position, relativePosition);
    }

    return new NB_Lib();
});

function helloWorld()
{
    print("Hello World!");
}