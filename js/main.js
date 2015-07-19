React = require(['../bower_components/react/react', '../cormorant/tools', '../cormorant/main'], function(React,
tools, getReactComponent){
  var req = new XMLHttpRequest();
  req.open( "GET", 'data/test-owns.json' );
  req.send();
  setTimeout( function(){
    var myJSON = req.response;
    myJSON = JSON.parse( myJSON );
    var component = getReactComponent(myJSON);
    React.render(
      React.createElement(component, {props: myJSON}),
      document.getElementById('content')
    );
  }, 500);
});
