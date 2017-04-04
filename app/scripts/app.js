'use strict';

angular.module('combinationsApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/combinar',{
            templateUrl:'views/combinar.html',
            controller: 'combinarController'
        });
        $routeProvider.when('/login',{
            templateUrl:'views/login.html',
            controller: 'loginController'
        });
        $routeProvider.otherwise({redirectTo: "/login"});
    }]);