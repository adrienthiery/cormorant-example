require('js/jquery.min.js');
React = require('react');

var HLC = React.createClass({
    getDefaultProps: function(){
        return {
            'url' : getUrlVars()['url']
        };
    },
    getInitialState: function() {
        return {data: {}};
    },
    componentDidMount: function() {
        if( getUrlVars()['data'] != undefined ){
            data = JSON.parse(decodeURIComponent(getUrlVars()['data']));
            this.setState({data: data});
        } else if( this.props.url != undefined ){
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                success: function(data) {
                    this.setState({data: data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    },
    render: function() {
        return ( <Devices data={ this.state.data.devices } /> );
    }
});

var Devices = React.createClass({
    getDefaultProps: function() {
        return {
            'data' : {}
        };
    },
    render: function() {
        var myData = this.props.data;
        var nodes = Object.keys(this.props.data).map(function(key) {
            return (<Device data={ myData[key] } />)
        });
        return (<div className="devices">{ nodes }</div>)
    }
});

var Device = React.createClass({
    getDefaultProps: function(){
        return {
            "data" : {
            "id" : "xxxxxxxxxxxxxxxx",
            "tiraid" : {
                "identifier": {
                    "type":"TYPE",
                    "value":"xxxxxxxxxxxxxxxx",
                    "flags":{
                        "transmissionCount": 99
                    }
                },
                "timestamp":"20yy-mm-ddThh:ii:ss.xxxx",
                "radioDecodings":
                    [{
                        "rssi": 99,
                        "identifier":{
                            "type":"TYPE",
                            "value":"xxxxxxxxxxxxxxxx"
                        }
                    }]
            },
            "url":"http://reelyactive.com/metadata/xxxxxxxxxxx.json",
            "href":"http://www.hyperlocalcontext.com/id/xxxxxxxxxxxxxxxx",
            }
        }
    },
    render: function() {
        return (
            <div title="Device" className="device entity">
                <h1>{ this.props.data.id }</h1>
                <Tiraid data={ this.props.data.tiraid } />
                <p>url : <MetaData url={ this.props.data.url } /></p>
                <p>href : <a target="_blank" className="btn" href={ this.props.data.href }>API</a></p>
            </div>
        );
    }
});

var MetaData = React.createClass({
    getDefaultProps: function() {
        return {
            'url' : "http://www.hyperlocalcontext.com/id/xxxxxxxxxxxxxxxx"
        }
    },
    componentDidMount: function(){
        var theUrl = this.props.url;
        var theComponent = this;
        $('.meta-data').on('click', function(e){
            $.ajax({
                url: theUrl,
                dataType: 'json',
                success: function(data) {
                    theComponent.setState({data: data});
                    React.render(
                      <Person data={ theComponent.state.data.person } />,
                      document.getElementById('person')
                    );
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        });
    },
    render: function() {
        return (<div>
            <button className="btn meta-data" data-url={ this.props.url }>Meta Data</button>
            <div id="person"></div>
        </div>)
    }
});

var Tiraid = React.createClass({
    getDefaultProps: function() {
        return { 
            "identifier": {
                "type": "EUI-64",
                "value": "001bc50940100069",
                "flags": {
                    "transmissionCount": 0
                }
            },
            "timestamp": "2015-03-02T20:10:41.338Z",
            "radioDecodings": [
                {
                    "rssi": 111,
                    "identifier": {
                        "type": "EUI-64",
                        "value": "001bc5094080001a"
                    }
                }
            ]
        };
    },
    render: function() {
        return (
        <div title="Tiraid" className="tiraid entity">
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
                <RadioDecodings data={ this.props.radioDecodings } />
            </div>
        </div>
        );
    }
});

var RadioDecodings = React.createClass({
    getDefaultProps: function() {
        return [];
    },
    render: function() {
        if( this.props.data.length > 1 ){
            var nodes = this.props.data.map(
                function( radioDecoding ){
                    return (<RadioDecoding data={ radioDecoding } />);
                }
            );
        } else {
            var nodes = (<RadioDecoding data={ this.props.data[0] } />);
        }
        return nodes
    }
});

var RadioDecoding = React.createClass({
    getDefaultProps: function() {
        return {};
    },
    render: function() {
        return (
            <div>
                <p>RSSI: { this.props.data.rssi }</p>
                <p>ID: { this.props.data.identifier.type } - { this.props.data.identifier.value }</p>
            </div>
        )
    }
});

var Person = React.createClass({
    getDefaultProps: function() {
        return {
            "@id": "http://person",
            "@type": "Person",
            "name": "John Doe",
            "owns": [
                {
                  "@id": "productdb:iphone5.html",
                  "@type": "schema:Product",
                  "model": "iphone5",
                  "schema:productID": "mac:01:23:45:67:89:ab"
                },
                {
                  "@id": "productdb:DasKapital.html",
                  "@type": "schema:Product",
                  "model": "Das Kapital v1",
                  "schema:productID": "mac:01:23:45:67:89:ab"
                }
            ],
            "email": "john@reelyactive.com",
            "image": "http://something.com/JohnDoe.jpg",
            "alumniOf": "XXXXXXXXXXX"
        }
    },
    render: function() {
        var alumni;
        if ( this.props.alumniOf ){
            alumni = (<p>Alumni of { this.props.alumniOf }</p>);
        }
        var productsNodes = this.props.owns.map( function(product) {
            return (<p><Product data={ product } /></p>);
        });
        return (<div title="Person" className="person entity">
            <h1>
                { this.props.data.name }
            </h1>
            <div>
                <img className="icon" src={this.props.image} />
                <p>Contact at { this.props.email }</p>
                { alumni }
                <p>Owns:</p>
                { productsNodes }  
            </div>
        </div>);
    }
});

var Product = React.createClass({
    getDefaultProps: function() {
        return {
            "data" : {
                "@id": "http://product",
                "@type": "Product",
                "model": "RA-T411",
                "manufacturer": "http://reelyactive.com/???" 
            }
        }
    },
    render: function() {
        var manufacturer;
        if( this.props.data.manufacturer )
            manufacturer  = (<p>Manufacterer : { this.props.data.manufacturer }</p>);
        return (<div title="Product" className="product entity">
            <h1>Product : { this.props.data.model }</h1>
            { manufacturer }
        </div>);
    }
});

React.render(
  <HLC />,
  document.getElementById('content')
);

