/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//need to include the angular library in the header of the index file
//<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>

//declare the twitter controller for soak
var twitterApp = angular.module('soakdigital.twittter.controller',[]);

twitterApp.controller('twitterController',[ '$scope','$http', function ($scope,$http){

var updateMessage = function($scope){
var date = new Date();
var date_seconds = date.getSeconds();

$scope.message = "Seconds: " + date_seconds;
$scope.clock = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

//show message
$scope.show_message = date_seconds > 30;
}

setInterval(function(){$scope.$apply(updateMessage)},0);

}]);
