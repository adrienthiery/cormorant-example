var JSONobj = React.createClass({
  getDefaultProps: function() {
    return {
      data: '{}'
    };
  },
  render: function () {
    //Use all the types defined hereafter
    return (<div></div>);
  }
});


// Add mechanics of put JSON or Url in inputs => render
// + Put url as URL parameters => render

var Device = React.createClass({
    getDefaultProps: function(){
        return {
            "id" : "001bc50940100069",
            "tiraid" : {
                "identifier": {
                    "type":"EUI-64",
                    "value":"001bc50940100069",
                    "flags":{
                        "transmissionCount":1
                    }
                },
                "timestamp":"2015-03-02T21:46:07.014Z",
                "radioDecodings":
                    [{
                        "rssi":111,
                        "identifier":{
                            "type":"EUI-64",
                            "value":"001bc5094080001a"
                        }
                    }]
            },
            "links" : {
                "url":"http://reelyactive.com/metadata/001bc50940100069.json",
                "href":"http://www.hyperlocalcontext.com/id/001bc50940100069"
            },
        }
    },
    componentDidMount : function() {
        // Urls : GET and add to render (this.state parameters ?)
    },
    render: function() {
        return (
            <div className="device">
                <h1>{ this.props.id }</h1>
                <Tiraid data={ this.props.tiraid } />
                <p>url : <a target="_blank" href="{ this.props.links.url }">{ this.props.links.url }</a></p>
                <p>href : <a target="_blank" href="{ this.props.links.href }">{ this.props.links.href }</a></p>
            </div>
        );
    }
});

var Tiraid = React.createClass({
    getDefaultProps: function() {
        return { 
            identifier: {
                type: "EUI-64",
                value: "001bc50940100069",
                flags: {
                    transmissionCount: 0
                }
            },
            timestamp: "2015-03-02T20:10:41.338Z",
            radioDecodings: [
                {
                    rssi: 111,
                    identifier: {
                        type: "EUI-64",
                        value: "001bc5094080001a"
                    }
                }
            ]
        };
    },
    render: function() {
        return (<div className="tiraid">
        <div>
            { this.props.identifier.type } - { this.props.identifier.value }
        </div>
        <div>
            <h5>
                <img className="icon" src="http://context.reelyactive.com/images/context-identification.png" />
                ID Details
            </h5>
            <p>{ this.props.identifier.flags }</p>
        </div>
        <div>
            <h5>
                <img className="icon" src="http://context.reelyactive.com/images/context-time.png" />
                Timestamp Details
            </h5>
            <p>{ this.props.timestamp }</p>
        </div>
        <div>
            <h5>
                <img className="icon" src="http://context.reelyactive.com/images/context-location.png" />
                Location Details
            </h5>
            <p>{ this.props.radioDecodings }</p>
        </div></div>);
    }
});

var Person = React.createClass({
    getDefaultProps: function() {
        return {
              "@id": "http://person",
              "@type": "Person",
              "name": "John Doe",
              "owns": "http://product",
              "email": "john@reelyactive.com",
              "image": "http://something.com/JohnDoe.jpg",
              "alumniOf": "UCAM"
        }
    },
    render: function() {
        var extra;
        //if( this.props.length > this.getDefaultProps.length ){
        //      Generate default layout to put in extra for the additional params
        //}
        return (
        <div className="person">
            <h1>
                { this.props.name }
            </h1>
            <div>
                <img className="icon" src={this.props.image} />
                <p>Contact at { this.props.email }</p>
                <p>Alumni of { this.props.alumniOf }</p>  
                <p>Owns : <Product url={ this.props.owns } /></p>  
                { extra }
            </div>
        </div>
        );
    }
});

var Product = React.createClass({
    getDefaultProps: function() {
        return {
            "@id": "http://product",
            "@type": "Product",
            "model": "RA-T411",
            "manufacturer": "http://reelyactive.com/???" 
        }
    },
    render: function() {
        return (
        <div className="product">
            <h1>
                Product : { this.props.model }
            </h1>
            <p>Manufacterer : { this.props.manufacturer }</p>  
        </div>
        );
    }
});

React.render(
  <Device>
  </Device>,
  document.getElementById('device')
);

React.render(
  <Person>
  </Person>,
  document.getElementById('person')
);

React.render(
  <Tiraid>
  </Tiraid>,
  document.getElementById('tiraid')
);

