
var knapsack = (function(){


	function eventHandler(){
		var handlers = {};
		
		function on(event_string, callback){
			var cblist = handlers[event_string];

			if (cblist===undefined){
				cblist=[];
				handlers[event_string] = cblist
			}

			cblist.push(callback);
		}

		function trigger(event_string,data) {
	    // current list of callbacks for this event_string
	    var cblist = handlers[event_string];

	    if (cblist !== undefined)
		for (var i = 0; i < cblist.length; i += 1)
		    cblist[i](data);
	}

	// externally accessible vars & functions
	return {on: on, trigger: trigger};
    }    

	function Model(items,knapMaxWeight, knapMaxVal){
		var maxWeight = knapMaxWeight;
		var maxVal = knapMaxVal; 
		var currentknapsackWeight = 0;
		var currentknapsackValue = 0;
		var event_handler = eventHandler();

		function initPosition(){
			for (var item in items){
				items[item].location = "Home";
			}
			event_handler.trigger("initialized");

		}
		function moveObject(item){

			if (item.location == "Home"){
				if (currentknapsackWeight+item.itemWeight<=maxWeight){
					item.location = "Knapsack";
					knapsackWeight-=item.itemWeight;
					knapsackValue-=item.itemValue;
				}

				else{
					var alert = $('<div class = "alert"></div>')

				}
			}

			else if (item.location == "Knapsack"){
				item.location = "Home";
				knapsackWeight+=item.itemWeight;
				knapsackValue+=item.itemValue;
			}
			event_handler.trigger("moved", item);
		}
		

		function getWeight(){
			return knapsackWeight;
		}

		function getValue(){
			return knapsackValue;
		}

		function getItems(){
			return items;
		}
		return {on: event_handler.on, initPosition: initPosition, 
			moveObject: moveObject, getWeight: getWeight, 
			getValue: getValue, getItems: getItems};
		
	}

	function Controller(model){

		function setPosition(){
			return model.initPosition();
		}

		function moveTheObject(){
			return model.moveObject();
		}

		
	}

	function View(div,model,controller,color){
		//div that contains the images
		var img_div = $('<div class = "imgdiv"></div>');
		var knap_div = $('<div class = "knapdiv"></div>');
		var home_div = $('<div class = "homediv"></div>');
		img_div.append(knap_div,home_div);

		var text_div  = $('<div class = "textdiv"></div>');

		$(div).append(img_div);


	return {};

}

	function setup(div){
		var model = Model();
		var controller = Controller(model);
		var home_view = View(div,model,controller);
		var sack_view = View(div,model,controller);
	}
	return {setup:setup}
}());

$(document).ready(function(){
	$('.knap').each(function(){
		knapsack.setup($(this));
	});

});