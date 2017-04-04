'use strict';

angular.module('combinationsApp')
    .service('loginLogout', function(){

        this.onLoad = function(){
            gapi.load('auth2', function() {
                gapi.auth2.init();
            });
        }

        this.signIn = function(){              
            var auth2 = gapi.auth2.getAuthInstance();        
            auth2.signIn().then(function(){
                console.log('User signed in.');                             
                window.location.replace("#!/combinar"); 
            });
        };

        this.getUserData = function(){            
            var auth2 = gapi.auth2.getAuthInstance();
            var profile = auth2.currentUser.get().getBasicProfile();
            var profileData = {nome: profile.getName(), email: profile.getEmail(), imageUrl: profile.getImageUrl()};           
            return profileData;
        };
                
        this.signOut = function(){
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {   
                console.log('User signed out.');
            });
        };

        this.disconnect = function(){
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {  
                auth2.disconnect(); 
                console.log('User disconnected.');
            });
        };      
    })
    .factory('processDataFactory', function() {
        var procData = {};
        procData.combinations = function(string, operator) {
            var i, j, combs, head, tailcombs;	
            if (operator > string.length || operator <= 0) {
                return [];
            }	
            if (operator === string.length) {
                return [string];
            }	
            if (operator === 1) {
                combs = [];
                for (i = 0; i < string.length; i++) {
                    combs.push([string[i]]);
                }
                return combs;
            }	
            combs = [];
            for (i = 0; i < string.length - operator + 1; i++) {
                head = string.slice(i, i + 1);
                tailcombs = procData.combinations(string.slice(i + 1), operator - 1);
                for (j = 0; j < tailcombs.length; j++) {
                    combs.push(head.concat(tailcombs[j]));
                }
            }
            return combs;
        };
        return procData;    
    })
;
    