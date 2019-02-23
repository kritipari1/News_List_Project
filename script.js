var app = angular.module("myApp", []);
app.config(['$routeProvider',
function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'index.html',
        controller: 'myCtrl',
        reloadOnSearch: false
    })
}]);
var api_url;
app.controller("myCtrl", function($scope, $http) {
  $scope.name = "kriti";
  $scope.newsDetails = "";
  $scope.flagFalse = 0;
  $scope.search = function(username) {
    count = 1;
    $scope.personCtrlFun(username);
  };
  $scope.personCtrlFun = function(username) {
    $http
      .get(
        "https://newsapi.org/v2/everything?q=" +
          username +
          "&apiKey=457d99e464d74f45869d6b07b2df4197"
      )
      .success(function(rdata, status, headers, config) {
        console.log(rdata);
        debugger;
        $scope.flagFalse = 1;
        $scope.newsDetails = rdata;
        var some = 0;
        $scope.orders1 = rdata.articles.slice(some * 10, (some + 1) * 10);
        var number = doThat(rdata.articles.length, 10);
         setInterval(countdown, 1000);
        if (rdata.articles.length >= 10) {
        }
        function doThat(number, divider) {
          while (number % divider !== 0) {
            number++;
          }
          return number;
        }
        setInterval(function a() {
          $scope.flagLeftCheck = false;
          if (number >= (count + 1) * 10) {
            $scope.orders1 = rdata.articles.slice(count * 10, (count + 1) * 10);
            $scope.$apply();
            count++;
             timeLeft = 29;
             setInterval(countdown, 1000);
            }
            else {
                 $scope.flagFalse = 0;
                return false;
            }
        }, 30000);
         var timeLeft = 29;
        var elem = document.getElementById('some_div');        
        function countdown() {
          if (timeLeft == 0) {
            // clearTimeout(timerId);
          } else {
            elem.innerHTML = timeLeft;
            timeLeft--;
          }
        }
      })
      .error(function(data, status, headers, config) {
        $scope.error = "error";
      });
  };
});
