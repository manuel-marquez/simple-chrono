/* 
 * Time Controller
 */
//need to include the angular library in the header of the index file
//<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>

//declare the time controller for soak
var timeApp = angular.module('soakdigital.time.controller',[]);

timeApp.controller('timeController',[ '$scope','$http', function ($scope){

    //set chrono message
    $scope.chrono_message = "Start";
    //define the status of the chrono, false = off, true = on
    var chrono_status = false;
    //time at which the chrono is set
    var chrono_start_time;
    //stop chrono
    var chrono_stop_time;    
    //stop chrono
    var chrono_time;

    /**
     * Declare updateClock method
     * @param {type} $scope
     * @returns {undefined}
     */
    var updateClock = function($scope){
        var date = new Date();
        var date_seconds = date.getSeconds();

        /* Set the time */
        //pad digits with a 0 if less than 10
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        //update the clock
        $scope.clock = hours + ":" + minutes + ":" + seconds;
        if ( chrono_status ) {
            updateMessage();
        }
//        $scope.message = "Seconds: " + date_seconds;

        //show message when each minute is over 30 seconds
        $scope.show_message = true;//chrono_status;
    }

    /**
     * Start chrono
     * @returns {undefined}
     */
    $scope.setChrono = function () {
        var chrono_message = $scope.chrono_message;
        if ( !chrono_status || !chrono_start_time ) {
            startChrono();
            $scope.chrono_message = "Stop";
            $scope.chrono_status_class = " chrono_off";
        } else if (chrono_start_time) {
            stopChrono();
            $scope.chrono_message = "Start";
            $scope.chrono_status_class = " chrono_on";
        }
    }

    /**
     * Start Chrono time
     * @returns {undefined}
     */
    function startChrono() {
        var date = new Date();
        chrono_start_time = date.getTime();
        chrono_status = true; //its on
    }

    /**
     * Start Chrono time
     * @returns {undefined}
     */
    function stopChrono() {
        var date = new Date();
        chrono_stop_time = date.getTime();
        chrono_status = false; //its off
    }

    /**
     * Reset chrono
     * @returns {undefined}
     */
    function resetChrono() {
        chrono_start_time = null;
        chrono_stop_time  = null;
    }


    /**
     * Caculate Chrono based on chrono_start_time and current time
     * @returns {undefined}
     */
    function calculateChrono () {
        var result = 0;
        if ( chrono_start_time > 0 ) {
            var date = new Date();
            result = date.getTime() - chrono_start_time;
        }
        return result;
    }

    /**
     * Update chrono
     * @returns {undefined}
     */
    var updateMessage = function () {
        var total_chrono = calculateChrono();
        
        var totalSec = total_chrono / 1000;
        var hours = parseInt( totalSec / 3600 ) % 24;
        var minutes = parseInt( totalSec / 60 ) % 60;
        var seconds = parseInt( totalSec % 60 );
        var decseconds = parseInt( total_chrono % 100 );

        $scope.message = "Chrono: " + (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds)+ ":" + (decseconds  < 10 ? "0" + decseconds : decseconds);
    }

//set interval so updateClock happends in a loop of 0 milli sec intervals
setInterval(function(){$scope.$apply(updateClock)},0);

}]);
