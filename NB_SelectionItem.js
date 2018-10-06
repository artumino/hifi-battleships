//
//  NB_SelectionItem.js
//  /scripts
//
//  Created by Corrado Co. on 05/10/18.
//  Copyright 2018 Corrado Co.
//
//  Writes the team composition as given by the server
//
//

(function()
{
    function NB_SelectionItem()
    {
    };
  
  
    NB_SelectionItem.prototype = {
      preload: function(entityID) {
        this.entityID = entityID;
      },
      unload: function(entityID) {
          //Unload....
      }
    };

    
    NB_SelectionItem.prototype.hoverEnter = function(entityID, event)
    {
        Entities.editEntity(this.entityID, { color: { red: 10, green: 200, blue: 10} });
    }

    NB_SelectionItem.prototype.hoverOver = function(entityID, event)
    {
        Entities.editEntity(entityID, { color: { red: 255, green: 255, blue: 255} });
    }
    
    NB_SelectionItem.prototype.hoverEnterEntity = NB_SelectionItem.prototype.hoverEnter;
    NB_SelectionItem.prototype.hoverOverEntity = NB_SelectionItem.prototype.hoverOver;
  
    return new NB_SelectionItem();
  });