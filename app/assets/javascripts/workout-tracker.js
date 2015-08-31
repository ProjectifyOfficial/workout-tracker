var app = angular.module('workoutTracker', []);

app.config([
    "$httpProvider", function($httpProvider) {
        return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }
]);

app.controller('NavbarCtrl', ['$scope', '$http', 'tabView', function($scope, $http, tabView) {
    tabView.set();
    $scope.tabView = tabView.get();
}]);

//session timer
app.factory('sessionTimer', [function(){
    return function(scope){
        //session timer
        var timeoutItem;

        setInactive = function(){
            scope.clientInactive = true; //true
            scope.$apply();
            window.clearTimeout(timeoutItem);
        };

        startTimer = function(){
            timeoutItem = window.setTimeout(setInactive, 1800000); //after 30 minutes
        };

        resetTimer = function(e){
            window.clearTimeout(timeoutItem);
            //start counting again
            startTimer();
        };

        function setup() {
            this.addEventListener("mousemove", resetTimer, false);
            this.addEventListener("mousedown", resetTimer, false);
            this.addEventListener("keypress", resetTimer, false);
            this.addEventListener("DOMMouseScroll", resetTimer, false);
            this.addEventListener("mousewheel", resetTimer, false);
            this.addEventListener("touchmove", resetTimer, false);
            this.addEventListener("MSPointerMove", resetTimer, false);

            startTimer();
        };
        setup(); //call
        //end session timer
    }
}]);

//simple pagination
app.factory('simplePager', [function(){
    return function(apps, pag_num){
        numPages = apps.length/pag_num;
        pages = []
        for(i=0;i<apps.length;i+=pag_num){
            if(i+pag_num>=apps.length){
                //slice to end
                pages.push(apps.slice(i))
            } else {
                pages.push(apps.slice(i, i+pag_num))
            }
        };
        return pages;
    };
}]);

app.service('tabView', ['$rootScope', function($rootScope) {
    var tabView = this;

    tabView.set = function(){
        parseUrl();
        localStorage.setItem('tabView', currentTab);
    };

    tabView.get = function(){
        currentTab = localStorage.getItem('tabView');

        if(currentTab === null) {
            tabView.set();
            parseUrl();
        };
        return currentTab;
    };

    function parseUrl(){
        var urlPath = location.pathname.split('/');
        if(urlPath[1] === 'cms' && urlPath[2] === undefined) {
            currentTab = '';
        } else if(urlPath[1] === 'cms' && urlPath[2] !== undefined) {
            currentTab = urlPath[2];
        } else {
            currentTab = urlPath[1];
        }
    };
}]);

app.run();

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}
