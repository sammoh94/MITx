
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

	function Model(items,knapMaxWeight){
		var maxWeight = knapMaxWeight;
		var currentknapsackWeight = 0;
		var currentknapsackValue = 0;
		var event_handler = eventHandler();

		function initPosition(){
			for (var item in items){
				items[item].loc = "Fridge";
			}
			event_handler.trigger("initialized");

		}
		function moveObject(item){

			if (item.loc == "Fridge"){
				if (currentknapsackWeight+item.itemWeight<=maxWeight){
					item.loc = "Knapsack";
					currentknapsackWeight-=item.itemWeight;
					currentknapsackValue-=item.itemValue;
				}

				else{
					var alert = $('<div class = "alert"></div>')

				}
			}

			else if (item.loc == "Knapsack"){
				item.loc = "Fridge";
				currentknapsackWeight+=item.itemWeight;
				currentknapsackValue+=item.itemValue;
			}
			event_handler.trigger("moved", item);
		}
		

		function getWeight(){
			return currentknapsackWeight;
		}

		function getValue(){
			return currentknapsackValue;
		}

		function getItems(){
			return items;
		}
		return {on: event_handler.on, initPosition: initPosition, 
			moveObject: moveObject, getWeight: getWeight, 
			getValue: getValue, getItems: getItems};
		
	}

	function Controller(model){

		var event_handlers = eventHandler();

		function setPosition(){
			return model.initPosition();
		}

		function clicked(){
			if(!model.moveObject(item)){
				event_handlers.trigger("fullsack",item);
			}
			else{
				model.moveObject();
			}
		}

		return{on:event_handlers.on, setPosition:setPosition, clicked:clicked};
		
	}

	function View(div,model,controller,color){

		// var home_div = $('<div class = "homediv"></div>');
		// var fridge = $('<img class = "fridge" id = "fridge" src = "fridge.jpg"></img>');
		// var soda = $('<img class = "fridge" id = "soda" src = "soda.png" title= "Soda"></img>');
		// var fruits = $('<img class = "fridge" id = "fruits" src = "fruits.png" />');
		// home_div.append(fridge,soda,fruits);

		// var myItems = model.getItems();
		// 	for (var thisItem in myItems){
		// 		console.log(myItems[thisItem]);
		// 		.append($('<div class = "specifics"></div>').text("$"+myItems[thisItem].itemValue+", "+myItems[thisItem].itemWeight+"kg"));
		// 	}
			

		// var knapsack_div  = $('<div class = "knapdiv"></div>');
		// var myKnapSack = $('<img class = "mySack" id = "idSack" src = "suitcase.jpg" />');
		// knapsack_div.append(myKnapSack);

		// div.append(knapsack_div,home_div);


	return {};

}

	function setup(div){

		var listOfItems = [];
		listOfItems.push(
			{
				image: "soda.png",
				loc: "Fridge",
				itemWeight: "2",
				itemValue: "4"
			},{
				image: "fruits.png",
				loc: "Fridge",
				itemValue: "10",
				itemWeight: "6"
			},{
				image: "pizza.png",
				loc: "Fridge",
				itemValue:"15",
				itemWeight:"8"
			},{
				image: "bread.png",
				loc:"Fridge",
				itemValue:"30",
				itemWeight:"14"
			}
		);

		var model = Model(listOfItems,30);
		var controller = Controller(model);
		var view = View(div,model,controller);
	}
	return {setup:setup}
}());

$(document).ready(function(){
	$('.knap').each(function(){
		knapsack.setup($(this));
	});
	$('[rel = tooltip]').tooltip();

});


