var app = angular.module( 'ReelyActive', ['ngResource'] );

app.controller( "HLCController", function( $scope, $resource ){
    // Let's define the kind of calls we want to do
    $scope.reelySearch = $resource( 'http://www.hyperlocalcontext.com/:action' ,
        { action: 'at/reelyactive' } );
    
    // To search, we bind the input text field and the model 'searchKey'
    $scope.doLinkSearch = function() {
	document.getElementById( 'searchLinkButton' ).innerHTML += "<img id='loader' src='images/loader.gif' />";
        var searchKey = $scope.searchLinkKey;
        if ( searchKey != undefined ){
            if ( searchKey.length === 12 )
                var action_term = 'id/' + searchKey;
            else if( searchKey.indexOf( 'http://' ) != -1 )
                $scope.reelySearch = $resource( searchKey );
            else
	        var action_term = 'at/' + searchKey;
            $scope.requestResult = $scope.reelySearch.get( { action: action_term });
        } else {
            console.log( "Couldn't find search key : sending default." );
            $scope.requestResult = $scope.reelySearch.get();
        } 
	document.getElementById( "search" ).setAttribute( "class", "searched" );
	var element = document.getElementById( "loader" );
	element.parentElement.removeChild( element );
    }

    $scope.doJSONSearch = function() {
	document.getElementById( 'searchJSONButton' ).innerHTML += "<img id='loader' src='images/loader.gif' />";
        $scope.requestResult = JSON.parse( $scope.searchJSONKey );
	document.getElementById( "search" ).setAttribute( "class", "searched" );
	var element = document.getElementById( "loader" );
	element.parentElement.removeChild( element );
    }

} );

app.directive( 'identityLayout', function() {
    return {
        restrict: 'E',
        templateUrl: 'identity-layout.html'  
    };
});

app.directive( 'extrasLayout', function() {
    return {
        restrict: 'E',
        templateUrl: 'extras-layout.html'  
    };
});

app.directive( 'devices', function() {
    return {
        restrict: 'E',
        templateUrl: 'devices.html',
        controller: function( $resource ){
            // To get identity from the elements of results of the search
            this.getIdentity = function( device ){
                idSearch = $resource( device.url );
                device.identity = idSearch.get();
            }   

        },
        controllerAs: 'deviceCtrl' 
    };
});
