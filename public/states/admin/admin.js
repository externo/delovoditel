'use strict';

angular
  .module('app')
  .controller('AdminController', AdminController);

function AdminController($location, auth, store, SoundService) {

  var Admin = this;

  Admin.auth = auth;
  Admin.sound = true;

  Admin.login = function() {

    auth.signin({}, function(profile, token){
      store.set('profile', profile);
      store.set('id_token', token);
      $location.path('/admin/case');
    }, function(error){
      console.log(error);
    });

  };

  Admin.logout = function() {
    store.remove('profile');
    store.remove('id_token');
    auth.signout();
    $location.path('/admin/profile');
  };

  Admin.toggleSound = function () {
    if (Admin.sound) {
      SoundService.stop();
      Admin.sound = false;
    } else {
      SoundService.start();
      Admin.sound = true;
    }
  };

}