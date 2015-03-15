var HLC = React.createClass({
    getDefaultProps: function(){
        return {
            'url' : decodeURIComponent(getUrlVars()['url'])
        };
    },
    getInitialState: function() {
        return {data: {}};
    },
    componentDidMount: function() {
        if( getUrlVars()['data'] != undefined ){
            data = JSON.parse(decodeURIComponent(getUrlVars()['data']));
            this.setState({data: data});
        } else if( getUrlVars()['person_and_device'] != undefined ){ 
            $.ajax({
                url: decodeURIComponent(getUrlVars()['person_and_device']),
                dataType: 'json',
                success: function(data) {
                    this.setState({person_and_device: data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
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
        if( this.state.person_and_device != undefined ) {
            var device, person;
            if( this.state.person_and_device.device ){
                device = (<Device data={ this.state.person_and_device.device } />);
            }
            if( this.state.person_and_device.person ){
                person = (<Person data={ this.state.person_and_device.person } />);
            }
            return (<div>{ device }{ person }</div>);
        } else {
            return (<Devices data={ this.state.data.devices } />);
        }
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
            console.log( myData[key] );
            return (<Tiraid data={ myData[key] } />)
        });
        return (<div className="devices">{ nodes }</div>)
    }
});

var Device = React.createClass({
    getDefaultProps: function(){
        return {
            "data" : {
                manufacturer: null,
                model: null,
                portraitImageUrl: null
            }
        }
    },
    render: function() {
        var model, manufacturer, portraitImageUrl;
        if( this.props.data.model != null ){
            model=(<h1>{ this.props.data.model }</h1>);
        }
        if( this.props.data.manufacturer != null ){
            manufacturer=(<p>{ this.props.data.manufacturer }</p>);
        }
        if( this.props.data.portraitImageUrl != null ){
            portraitImageUrl=(<img src={ this.props.data.portraitImageUrl } />);
        }
        return (
            <div title="Device" className="device entity colored">
                {portraitImageUrl}{model}{manufacturer}
                <br className='clear' />
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
                    console.log( data );
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
        <div title="Tiraid" className="tiraid entity colored">
            <h1>{ this.props.identifier.type } - { this.props.identifier.value }</h1>
            <div>
                <h5>
                    <img className="icon" src="http://context.reelyactive.com/images/context-identification.png" />
                    ID Details: { this.props.identifier.flags }
                </h5>
            </div>
            <div>
                <h5>
                    <img className="icon" src="http://context.reelyactive.com/images/context-time.png" />
                    Timestamp Details: { this.props.timestamp }
                </h5>
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
            "data": {
                "companyName": null,
                "companyUrl": null,
                "firstName": null,
                "lastName": null,
                "linkedInPublicUrl": null,
                "portraitImageUrl": null,
                "twitterPersonalScreenName": null,
                "soundcloudUsername": null,
                "googlePlusProfileName": null,
                "retailUrl": null
            }
        }
    },
    render: function() {
        var companyName, companyUrl, name, linkedInPublicUrl, portraitImageUrl, twitterPersonalScreenName, soundcloudUsername, googlePlusProfileName, retailUrl;
        if ( this.props.data.companyName != null ){
            companyName = (<p>Company: { this.props.data.companyName }</p>);
        }
        if ( this.props.data.companyUrl != null  ){
            companyUrl = (<p>Website: <a href={ this.props.data.companyUrl } target='_blank'>see here</a></p>);
        }
        if ( this.props.data.firstName != null  && this.props.data.lastName != null ){
            name = (<h1>{ this.props.data.firstName } { this.props.data.lastName }</h1>);
        }
        if ( this.props.data.portraitImageUrl != null ){
            portraitImageUrl = (<img src={ this.props.data.portraitImageUrl } />);
        }
        if ( this.props.data.linkedInPublicUrl != null ){
            linkedInPublicUrl = (<div className='icon social'>
            <a href={ this.props.data.linkedInPublicUrl } target='_blank'>&#62232;</a>
        </div>);
        }
        if ( this.props.data.twitterPersonalScreenName != null ){
            twitterPersonalScreenName = (<div className='icon social'>
            <a href={ this.props.data.twitterPersonalScreenName } target='_blank'>&#62217;</a>
        </div>);
        }
        if ( this.props.data.soundcloudUsername != null ){
            soundcloudUsername = (<div className='icon social'>
            <a href={ this.props.data.soundcloudUsername } target='_blank'>&#62280;</a>
        </div>);
        }
        if ( this.props.data.googlePlusProfileName != null ){
            googlePlusProfileName = (<div className='icon social'>
            <a href={ this.props.data.googlePlusProfileName } target='_blank'>&#62223;</a>
        </div>);
        }
        return (<div title="Person" className="person entity colored">
            {portraitImageUrl}
            {name}
            {companyName}
            {companyUrl}
            <div>
                {linkedInPublicUrl}
                {twitterPersonalScreenName}
                {soundcloudUsername}
                {googlePlusProfileName}
            </div>
            <br className='clear' />
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

