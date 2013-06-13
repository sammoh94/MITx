/**
 * A simple web inspector.
 *
 * Intended to be a singleton: this only exists once per page, so it
 * attaches itself to the BODY element.
 */
var Inspector = function($) {
  exports = {};

  // The root element of the inspector.
  var root = null;

  var template = ""
    + "<div class='tray'>"
    + "  <textarea class='text-editor'></textarea>"
    + "  <div class='property-editor'>"
    + "    <div class='node-lookup'>"
    + "      <input class='selector' /><input class='nth' />"
    + "       <button>Search</button>"
    + "    </div>"
    + "    <div class='property-list'>"
    + "     <p class = 'para'></p>"
    + "    </div>" 
    + "  </div>" 
    + "</div>" 
    + "<div class='handle'></div>";

  /*
   * Construct the UI
   */
  

  var toggle = function(){
    if (root.css("top") == "0px"){
    root.animate({"top":"-300px"},500);
  }
    else{
    root.animate({"top":"0px"},500);
    }
  };
  var searchBySelector = function(){
    //fetch the text entered into text box and pass it to jquery and get results
    //get the html from the results and put into other textbox
    var selectorbox = root.find('.selector');
    var selectorStr = selectorbox.val();
    var selection = $(selectorStr);
    var html = selection.html();
    var textEditor = root.find(".text-editor");
    textEditor.val(html);
    displayProperty();

  };

  var changePage = function(e){
    if (e.keyCode == 13){
      e.preventDefault();
      e.stopPropagation();
      var textEditor = root.find(".text-editor");
      var init_val = textEditor.val();
      var selectorbox = root.find('.selector');
      var selectorStr = selectorbox.val();
      var selection = $(selectorStr);
      selection.html(init_val);

    }
  };

  function displayProperty() {
    var selectorbox = root.find('.selector');
    var selectorStr = selectorbox.val();
    var selection = $(selectorStr);
    var properties = root.find('.para');
    var propertyDisplay = root.find('.property-list');
    var w = "width: "+selection.width()+"\n";
    var h = "height: "+selection.height()+"\n";  
    var name = "Tag Type: "+ selection.get(0).tagName.toLowerCase();
    var position = selection.offset();
    var positionStr = " Position: "+"("+position.left+","+position.top+")";
    var children = String(selection.children().length);
    var childrenStr = " Children: "+children;
    var strDisplay = h+" "+w+name+positionStr+childrenStr;

    propertyDisplay.html(strDisplay);
    propertyDisplay.css("color","black");
    propertyDisplay.css("font-size","14pt");

}

  exports.initialize = function() {
    root = $("<div class='inspector'></div>").appendTo($('body'));
    root.append(template);
    root.find(".handle").on("click", toggle);
    root.find(".node-lookup button").on("click", searchBySelector);
    root.find(".text-editor").on("keydown", changePage);
  };

  exports.toggle = toggle;

  return exports;
};

/*****************************************************************************
 * Boot up the web inspector!
 *
 * This will enable you to COPY AND PASTE this entire file into any web page
 * to inspect it.
 *
 * XXX TODO!
 *  Change the CSS link below to point to the full URL of your CSS file!
 *
 *  You shouldn't need to touch anything else below.
 *
 *****************************************************************************/
(function() {
    var createInspector = function() {
      window.inspector = Inspector(jQuery);
      window.inspector.initialize();
    }

    // Add the CSS file to the HEAD
    var css = document.createElement('link');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('type', 'text/css');
    css.setAttribute('href', 'web-inspector.css'); // XXX TODO CHANGEME!!
    document.head.appendChild(css);

    if ('jQuery' in window) {
      createInspector(window.jQuery);
    } else {
      // Add jQuery to the HEAD and then start polling to see when it is there
      var scr = document.createElement('script');
      scr.setAttribute('src','http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
      document.head.appendChild(scr);
      var t = setInterval(function() {
        if ('jQuery' in window) {
          clearInterval(t); // Stop polling 
          createInspector();
        }
      }, 50);
    }
})();
