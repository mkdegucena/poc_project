(function() {

  return {
    events: {
	'ticket.save': 'ticketSaveHandler',
    },
   	greeDictionary: {
		"dragonsouls" : ["dragansouls", "dragonsoulz", "dagonsouls", "dagonsols", "dragonsoul", "dragonsol", "ragonsol", "dragunsols", "dragonsols", "dragonballs"],
		"league of war:mercenaries" : ["leag of war: mercenaries", "leag of wor: mercenaries", "leg of war:  mercienaries", "leag of war: mercenaries", "leag of war: mercenaries", "league of war: mercienaries", "league of war: mercienaries", "league of war: mercienaries", "league of war: mercienaries", "league of war: mercienaries"],
		"knights & dragons" : ["nights & dragons","knight & dragon","night & dragon","knight & dragons","nine & dragon","nine and dragons","knight & dragons","knoghts & dragans","king & dragon","knights & dragon"],
		"crime city" : ["crime sin", "rhyme city", "crime ciyty", "crime cityy", "crime cihty", "crime cithy", "crjme city", "crine city", "crije city", "rhyme sitti"],
		"modern war" : ["modrn war", "modrn wor", "model war", "modern wor", "mdern war", "modal war", "model warr", "modeel war", "mdoel war", "model raw"],
		"kingdom age" : ["kimgdom age", "kinfdom age", "kintdom age", "kinydom ache", "kingdom ache", "kimdom age", "kingsom age", "kingeom age", "kingrom age", "kingdam age"]
	},
    ticketSaveHandler: function() {
    	// set a main return
    	var mainReturn = false;

    	// reset to global
    	var _this = this;

    	// set the comment object
		var comment = _this.comment();
		
		// get the current text and clear the tags // cleaning
		var currentComment = comment.text().replace(/(<([^>]+)>)/ig,"").toLowerCase();
		
		for (var originalTitle in _this.greeDictionary) {
			// set some parent rebreak
			var doBreak = false;
			// set tht title error list
			var titleErrorList = _this.greeDictionary[originalTitle];
		    // did we find it correct? if no do some searching in every
		    if (currentComment.search(originalTitle) >= 0) {
		    	// we do have correct 
		    	console.log("We found correct spelling nothing doooo on" + originalTitle);
		    	doBreak = true;
		    	mainReturn = true;
		    // do we have the error spelling in the title
		    } else {
		    	// find the error on every list
		    	for ( var i = 0; i < titleErrorList.length; i ++ ) { 
    				if(currentComment.search(titleErrorList[i]) >= 0) {
    					console.log(titleErrorList[i]);
    					console.log("we found the error please recommend this title:" + originalTitle);
    					// do some rebreaking on the parent
    					doBreak = true;
    					break;
    				}
				}
		    }

	    	if (doBreak) {
				break;
			}

		}
		// return
    	return mainReturn;
    },
  };

}());
