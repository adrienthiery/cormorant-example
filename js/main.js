React = require(['../bower_components/react/react', '../cormorant/tools', '../cormorant/main'], function(React,
tools, getReactComponent){
  var req = new XMLHttpRequest();
  req.open( "GET", 'data/test-compacted.json' );
  req.send();
  setTimeout( function(){
    var myJSON = req.response;
    myJSON = JSON.parse( myJSON );
    var component = getReactComponent(myJSON);
    React.render(
      React.createElement(component, myJSON),
      document.getElementById('content')
    );
  }, 500);
});
