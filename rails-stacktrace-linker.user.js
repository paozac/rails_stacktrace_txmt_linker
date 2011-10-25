// Grease Monkey Script 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script. Customized for Google Chrome
//
// To install, open this file with Google Chrome
//
// To uninstall, go to Tools/Extensions,
// select "Rails Stacktrace TextMate Linker", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Rails Stacktrace Texmtmate Linker
// @description   make your stack trace lines open in TextMate
// ==/UserScript==

if (nodes = document.getElementById("traces") && document.querySelectorAll("#traces pre>code")) {
  
  // Load jquery. The @require directory doesn't work with Chrome
  function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    script.addEventListener('load', function() {
      var script = document.createElement("script");
      script.textContent = "(" + callback.toString() + ")();";
      document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
  }

  function main() {    
    var base_path = $.trim($("body code").first().html().split(':')[1]);
    
    $("#Application-Trace code").each(function(item){
      var original_text = $(this).text();
      var tokens = original_text.split(':');
      var link = "txmt://open?url=file://" + base_path + "/" + tokens[0] + "&line=" + tokens[1];
      console.log(link);
      
      new_link = $("<a>");
      new_link.text(original_text);
      new_link.attr('href', link);
      $(this).replaceWith(new_link);
    });
  }

  // load jQuery and execute the main function
  addJQuery(main);
}
