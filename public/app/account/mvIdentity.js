angular.module('app').factory('mvIdentity', function(){
    //var currentUser;
    return {
        currentUser: undefined,
        isAuthenticated: function(){
            return !!this.currentUser;
        }
    }
})