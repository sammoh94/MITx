var graphcalc = (function(){
    var exports={};//accessible from outside
    function graph(canvas,functionInp,min,max){
        var tree= calculator.parse(functionInp);
        var dom=canvas[0];
        var gcanvas = $("<canvas></canvas>")[0]; //DOM object
        gcanvas.width = canvas.width;
        gcanvas.height = canvas.height-10;
        
        var gctx = gcanvas.getContext('2d');
        
        var ctx = canvas.getContext('2d');
        
        console.log(output);
        
        var maxx=calculator.evaluate(calculator.parse(max));//max amp
        
        var minn=calculator.evaluate(calculator.parse(min));//min amp
        
        var xStep = (maxx-minn/(400));
        var xval = [];
        // filling the values of x in the array
        for (var i = 0; i < 400; i++) {
            xval.push(i*xStep+min);
        }
        var yval=[];
        // filling the corresponding values of y for each x into an array
        for(var i=0;i<=xval.length;i++){
            var value=calculator.evaluate(tree,{x:xval[i],e:Math.E,pi:Math.PI});//1.0* to make it floating
            yval.push(value);
        }
        // determine the actual min-y/max-y value
        var myMinY = yval[100];
        var myMaxY = yval[210];
        for (var val = 0; val < yval.length; val++) {
            if (yval[val]<myMinY){
                myMinY = xval[val];
            }
            if ((yval[val])>myMaxY){
                myMaxY = yval[valy]; 
            }
            
        }
        // fill up the graph with values so that it can be drawn
        var yStep = 1.25*(myMaxY-myMinY)/400;
        var xyGraph = [];
        for (var j = 0; j <yval.length; j++) {
            xyGraph[j] = 200 - Math.floor(yval[j]/yStep);
        }
        
        gctx.strokeStyle = "red";
        gctx.lineWidth = 2;
        gctx.beginPath();
        
        gctx.moveTo(0,xyGraph[0]);
        for(var i=0;i<xyGraph.length;i++){
            gctx.lineTo(i, xyGraph[i]);
            
        }
        gctx.stroke();
        ctx.drawImage(gcanvas,0,0);
        return gcanvas;// to leave upper and lower border by 5 pixcels

        
        // to leave upper and lower border by 5 pixcels
        // canvas.on("mousemove",function(event){
        //     var mx = event.pageX;
        //     var my = event.pageY;
        //     var offset = canvas.offset();//{left: ..., top: ...}
        //     mx = Math.round(mx-offset.left);
        //     my=Math.round(my-offset.top);
            
        // })
        
    }    
    function setup(div){
        var canvas = $('<canvas></canvas>');
        
        var inputdiv = $('<div></div>');
        var inputfield = $('<div>f(x):</div>');
        var func = $('<input></input>', {id: "funck", type:"text",size:50});
        inputfield.append(func);
        
        var minmaxfield = $('<div>min x:</div>');
        var min = $('<input></input>', {id: "minkey", type: "text", size: 50});
        minmaxfield.append(min);
        
        var max = $('<input></input>', {id: "max",type: "text", size: 50});
        minmaxfield.append("     max:");
        minmaxfield.append(max);
        
        var plot = $('<button>Plot</button>');
        plot.bind("click", function(){
            graph(canvas,func.val(),min.val(),max.val());
        });
        var clear = $('<button>Clear</button>');
        clear.bind("click",function(){
            func.val('');
            min.val('');
            max.val('');
        });
        inputdiv.append(inputfield);
        inputdiv.append(minmaxfield);
        $(div).append(canvas,inputdiv,plot,clear);
    }
    exports.setup = setup;
   
    return exports;
}());

$(document).ready(function() {
    $('.graphcalc').each(function() {
        graphcalc.setup(this);  
    });
});