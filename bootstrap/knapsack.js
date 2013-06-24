
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

			if (item.loc == "fridge"){
				if (currentknapsackWeight+item.itemWeight<=maxWeight){
					item.loc = "knapsack";
					currentknapsackWeight+=item.itemWeight;
					currentknapsackValue+=item.itemValue;
				}

				else{
					var alert = $('<div class = "alert"></div>')

				}
			}

			else if (item.loc == "knapsack"){
				item.loc = "fridge";
				currentknapsackWeight-=item.itemWeight;
				currentknapsackValue-=item.itemValue;
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

		function getMaxWeight(){
			return knapMaxWeight;
		}
		return {on: event_handler.on, initPosition: initPosition, 
			moveObject: moveObject, getWeight: getWeight, 
			getValue: getValue, getItems: getItems, getMaxWeight: getMaxWeight};
		
	}

	function Controller(model){

		var event_handlers = eventHandler();

		function setPosition(){
			return model.initPosition();
		}

		function clicked(item){
			if(!model.moveObject(item)){
				event_handlers.trigger("fullsack",item);
			}
			else{
				model.moveObject(item);
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

		var model = Model(listOfItems,14);
		var controller = Controller(model);
		var view = View(div,model,controller);

		var listOfItems = [];
		listOfItems.push(
			{
				name: "soda",
				loc: "fridge",
				itemWeight: 2,
				itemValue: 4,
			},{
				name: "cereal",
				loc: "fridge",
				itemValue: 10,
				itemWeight: 6
			},{
				name: "pizza",
				loc: "fridge",
				itemValue:11,
				itemWeight:8
			},{
				name: "bread",
				loc:"fridge",
				itemValue:5,
				itemWeight:4
			},{
				name:"blueberries",
				loc:"fridge",
				itemValue:20,
				itemWeight:14
			},{
				name:"ramen",
				loc:"fridge",
				itemValue:3,
				itemWeight:5
			}
		);
		console.log(model.getMaxWeight());

		$('.homediv').on("click", function(event){

			var clickedItemId = event.target.id;
			var clickedItemLoc = event.target.className;
			console.log(clickedItemId);

			for (var itemId in listOfItems){

				if (clickedItemId === listOfItems[itemId].name && clickedItemLoc == listOfItems[itemId].loc){
					if (listOfItems[itemId].itemWeight+model.getWeight()<=model.getMaxWeight()){
						controller.clicked(listOfItems[itemId]);
						$('.bar').width($('.bar').width()+model.getWeight()+100);
						$('.clicksound')[0].play();
						console.log("played sound");
						clickedItemLoc = "knapsack";
						listOfItems[itemId].loc = "knapsack";
						$('.weight').html(model.getWeight());
						$('.amount').html(model.getValue());
						$('.knapdiv').append(event.target);
					}
					else{
						$('.clicksound')[2].play();
						$('.alert').css("visibility","visible");
					}	
				}
				

			}		
		});

		$('.knapdiv').on("click", function(event){
			
			var clickedItemId = event.target.id;
			var clickedItemLoc = event.target.className;
			if (clickedItemLoc === "fridge"){
				clickedItemLoc = "knapsack";
			}
			console.log(clickedItemLoc);
			for (var itemId in listOfItems){
				if (clickedItemId === listOfItems[itemId].name && clickedItemLoc == listOfItems[itemId].loc){
					$('.alert').css("visibility","hidden");
					$('.clicksound')[1].play();
					console.log("played sound");
					controller.clicked(listOfItems[itemId]);
					clickedItemLoc = "fridge"; 
					listOfItems[itemId].loc = "fridge";
					$('.weight').html(model.getWeight());
					$('.amount').html(model.getValue());
					console.log(clickedItemId+".png")
					$('.homediv').append(event.target);
				}

			}
		});


		
	}
	return {setup:setup}
}());

$(document).ready(function(){
	$('.knap').each(function(){
		knapsack.setup($(this));
	});
	
	$('#help').popover({placement:'bottom'});
	$('#elem').popover();
	$('#elem1').popover();


});


