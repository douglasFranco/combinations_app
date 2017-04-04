'use strict';

angular.module('combinationsApp')
    .controller('loginController', ['$scope', 'loginLogout', function($scope, loginLogout){   

        loginLogout.onLoad();

        $scope.signIn = function(){
           loginLogout.signIn();
        };

    }])
    .controller('combinarController', ['$scope', 'processDataFactory', 'loginLogout', function($scope, processDataFactory, loginLogout){
        
        $scope.user = loginLogout.getUserData();
        
        $scope.signOut = function(){
            loginLogout.signOut();
        };

        $scope.disconnect = function(){
            loginLogout.disconnect();
        };

        $scope.tableResults = [];                
        $scope.processSubmit = function(){
            //remove white spaces and split to do the array 
            var stringToArray = $scope.data.stringData.replace(/\s/g,'').split("");
            //remove duplicated data
            var stringOutput = stringToArray.filter(function(elem, index, self) {
                return index === self.indexOf(elem);
            });   
            //get the result of process from factory
            var resultProcess = processDataFactory.combinations(stringOutput , $scope.data.operatorData);
            var result = {entrada: stringOutput, resultado: resultProcess};            
            $scope.tableResults.push(result);
            delete $scope.data;
            $scope.enterDataform.$setPristine();
        };
    }])
;