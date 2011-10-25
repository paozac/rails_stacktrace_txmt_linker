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
    var base_path = $.trim($("body code:contains('Rails.root')").first().html().split(':')[1]);    
    var lines = $("#Application-Trace code").text().split("\n");
    
    $("#Application-Trace code").empty();
    
    $.each(lines, function(idx, line) {
      var tokens = line.split(':');
      var link = "txmt://open?url=file://" + base_path + "/" + tokens[0] + "&line=" + tokens[1];
      
      new_link = $("<a>");
      new_link.text(line);
      new_link.attr('href', link);
      $("#Application-Trace code").append(new_link).append("\n");
      
    });
  }

  // load jQuery and execute the main function
  addJQuery(main);
}
