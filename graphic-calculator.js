var graphcalc = (function(){
    var exports={};//accessible from outside
    function graph(canvas,functionInp,min,max){
        var tree= calculator.parse(functionInp);
        var dom=canvas[0];
        var output=[];
        for(var i=0;i<dom.width;i++){
            var value=calculator.evaluate(tree,{x:min+i/(1.0*min+max),e:Math.e,pi:Math.PI});//1.0* to make it floating
            output.push(value);
        }
        
        var ctx = dom.getContext('2d');
        console.log(output);
        var maxx=Math.max.apply(Math, output);//max amp
        var minn=Math.min.apply(Math,output);//min amp
            
        var gcanvas = $("<canvas></canvas>")[0]; //DOM object
        
        gcanvas.width = dom.width;
        gcanvas.height = dom.height-10;
        var gctx = gcanvas.getContext('2d');
        gctx.moveTo(0,dom.height-(output[0]-minn)/(maxx-minn)*dom.height);
        for(var i=0;i<dom.width-1;i++){
            
            gctx.lineTo(i+1, dom.height-(output[i+1]-minn)/(maxx-minn)*dom.height);
            
        }
        gctx.stroke();
        ctx.drawImage(gcanvas,0,5);// to leave upper and lower border by 5 pixcels
        canvas.on("mousemove",function(event){
            var mx = event.pageX;
            var my = event.pageY;
            var offset = canvas.offset();//{left: ..., top: ...}
            mx = Math.round(mx-offset.left);
            my=Math.round(my-offset.top);
            
        })
        
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
        inputdiv.append(inputfield);
        inputdiv.append(minmaxfield);
        $(div).append(canvas,inputdiv,plot);
        
        
    }
    exports.setup = setup;
   
    return exports;
}());

$(document).ready(function() {
    $('.graphcalc').each(function() {
        graphcalc.setup(this);  
    });
});