/* 
 * Camera Controller
 */


//declare the time controller for soak
var cameraApp = angular.module('soakdigital.camera.controller',[]);

cameraApp.controller('cameraController',[ '$scope','$http', function ($scope){

$scope.myPictures = [];
$scope.$watch('myPicture', function(value) {
   if(value) {
      myPictures.push(value);
   }
}, true);

}]);
