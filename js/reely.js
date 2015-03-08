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


/*
React.render(
  <JSONobj data='
{"_meta":{"message":"ok","statusCode":200},"_links":{"self":{"href":"http://www.hyperlocalcontext.com/at/reelyactive"}},"devices":{"001bc50940100069":{"identifier":{"type":"EUI-64","value":"001bc50940100069","flags":{"transmissionCount":1}},"url":"http://reelyactive.com/metadata/001bc50940100069.json","href":"http://www.hyperlocalcontext.com/id/001bc50940100069"},"001bc5094010009a":{"identifier":{"type":"EUI-64","value":"001bc5094010009a","flags":{"transmissionCount":0}},"url":"http://reelyactive.com/metadata/001bc5094010009a.json","href":"http://www.hyperlocalcontext.com/id/001bc5094010009a"},"001bc509401000a1":{"identifier":{"type":"EUI-64","value":"001bc509401000a1","flags":{"transmissionCount":2}},"url":"http://reelyactive.com/metadata/001bc509401000a1.json","href":"http://www.hyperlocalcontext.com/id/001bc509401000a1"},"001bc50940100122":{"identifier":{"type":"EUI-64","value":"001bc50940100122","flags":{"transmissionCount":1}},"url":"http://reelyactive.com/metadata/parchemins.json","href":"http://www.hyperlocalcontext.com/id/001bc50940100122"},"001bc50940100187":{"identifier":{"type":"EUI-64","value":"001bc50940100187","flags":{"transmissionCount":0}},"url":"http://reelyactive.com/metadata/001bc50940100187.json","href":"http://www.hyperlocalcontext.com/id/001bc50940100187"},"1499e20ef09c":{"identifier":{"type":"ADVA-48","value":"1499e20ef09c","advHeader":{"type":"ADV_IND","length":21,"txAdd":"public","rxAdd":"public"},"advData":{"flags":["LE General Discoverable Mode","Simultaneous LE and BR/EDR to Same Device Capable (Controller)","Simultaneous LE and BR/EDR to Same Device Capable (Host)"],"manufacturerSpecificData":{"companyIdentifierCode":"004c","data":"09060109c0a801ac"}}},"url":"http://reelyactive.com/metadata/apple.json","href":"http://www.hyperlocalcontext.com/id/1499e20ef09c"},"5cf938d856c3":{"identifier":{"type":"ADVA-48","value":"5cf938d856c3","advHeader":{"type":"ADV_IND","length":21,"txAdd":"public","rxAdd":"public"},"advData":{"flags":["LE General Discoverable Mode","Simultaneous LE and BR/EDR to Same Device Capable (Controller)","Simultaneous LE and BR/EDR to Same Device Capable (Host)"],"manufacturerSpecificData":{"companyIdentifierCode":"004c","data":"09060110c0a8020d"}}},"url":"http://reelyactive.com/metadata/apple.json","href":"http://www.hyperlocalcontext.com/id/5cf938d856c3"},"84dd20eaf371":{"identifier":{"type":"ADVA-48","value":"84dd20eaf371","advHeader":{"type":"ADV_IND","length":9,"txAdd":"public","rxAdd":"public"},"advData":{"flags":["LE General Discoverable Mode","BR/EDR Not Supported"]}},"url":"http://reelyactive.com/metadata/df1.json","href":"http://www.hyperlocalcontext.com/id/84dd20eaf371"},"9059af1611bb":{"identifier":{"type":"ADVA-48","value":"9059af1611bb","advHeader":{"type":"ADV_NONCONNECT_IND","length":34,"txAdd":"public","rxAdd":"public"},"advData":{"flags":["LE General Discoverable Mode","BR/EDR Not Supported"],"completeLocalName":"ILOC-WT  ","txPower":"-23dBm","manufacturerSpecificData":{"companyIdentifierCode":"5990","data":"af1611bb610001"}}},"url":"http://reelyactive.com/metadata/bluetoothsmart.json","href":"http://www.hyperlocalcontext.com/id/9059af1611bb"},"98d6bb21045a":{"identifier":{"type":"ADVA-48","value":"98d6bb21045a","advHeader":{"type":"ADV_IND","length":21,"txAdd":"public","rxAdd":"public"},"advData":{"flags":["LE General Discoverable Mode","Simultaneous LE and BR/EDR to Same Device Capable (Controller)","Simultaneous LE and BR/EDR to Same Device Capable (Host)"],"manufacturerSpecificData":{"companyIdentifierCode":"004c","data":"09060016c0a80228"}}},"url":"http://reelyactive.com/metadata/apple.json","href":"http://www.hyperlocalcontext.com/id/98d6bb21045a"},"9c207bf15d41":{"identifier":{"type":"ADVA-48","value":"9c207bf15d41","advHeader":{"type":"ADV_IND","length":21,"txAdd":"public","rxAdd":"public"},"advData":{"flags":["LE General Discoverable Mode","Simultaneous LE and BR/EDR to Same Device Capable (Controller)","Simultaneous LE and BR/EDR to Same Device Capable (Host)"],"manufacturerSpecificData":{"companyIdentifierCode":"004c","data":"09060001c0a8006a"}}},"url":"http://reelyactive.com/metadata/apple.json","href":"http://www.hyperlocalcontext.com/id/9c207bf15d41"},"e0ebb83eae3c":{"identifier":{"type":"ADVA-48","value":"e0ebb83eae3c","advHeader":{"type":"ADV_NONCONNECT_IND","length":36,"txAdd":"random","rxAdd":"public"},"advData":{"flags":["LE General Discoverable Mode","BR/EDR Not Supported"],"manufacturerSpecificData":{"companyIdentifierCode":"004c","data":"02158deefbb9f7384297804096668bb4428100012258c5","iBeacon":{"uuid":"8deefbb9f7384297804096668bb44281","major":"0001","minor":"2258","txPower":"-59dBm"}}}},"url":"http://reelyactive.com/metadata/roximity.json","href":"http://www.hyperlocalcontext.com/id/e0ebb83eae3c"},"fb437129b9a4":{"identifier":{"type":"ADVA-48","value":"fb437129b9a4","advHeader":{"type":"ADV_IND","length":36,"txAdd":"random","rxAdd":"public"},"advData":{"flags":["LE General Discoverable Mode","BR/EDR Not Supported"],"manufacturerSpecificData":{"companyIdentifierCode":"004c","data":"0215b9407f30f5f8466eaff925556b57fe6d03510003b6","iBeacon":{"uuid":"b9407f30f5f8466eaff925556b57fe6d","major":"0351","minor":"0003","txPower":"-74dBm"}}}},"url":"http://reelyactive.com/metadata/estimote.json","href":"http://www.hyperlocalcontext.com/id/fb437129b9a4"}}}'>
  </JSONobj>,
  document.getElementById('content')
);
*/
