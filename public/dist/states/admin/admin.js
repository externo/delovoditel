module.exports = function($http, $location, auth, store, SoundService, NotyService, HistoryService) {

  var Admin = this;

  Admin.auth = auth;

  if (store) {
    Admin.profile = store.get('profile');
  }

  Admin.sound = true;

  Admin.login = function () {

    auth.signin({}, function (profile, token) {
      store.set('profile', profile);
      store.set('id_token', token);
      Admin.profile = store.get('profile');
      if (!Admin.profile.user_metadata){
        $location.path('/admin/profile');
        NotyService.warning('Попълнете личните си данни, които ще бъдат използвани при генерирани на бланки към делата');
      }else{
        $location.path('/admin/case');
      }
    }, function (error) {
      console.log(error);
    });

  };

  Admin.logout = function () {
    store.remove('profile');
    store.remove('id_token');
    auth.signout();
    $location.path('/admin/profile');
    Admin.profile = undefined;
  };

  Admin.editProfile = function () {

    var metadata = {"user_metadata": Admin.profile.user_metadata};
    $http.patch("https://iliata.eu.auth0.com/api/v2/users/" + Admin.profile.user_id, metadata)
      .success(function (res) {
        store.set('profile', res);
        var msg = 'Редактиране на профилните данни';
        SoundService.extract();
        NotyService.warning(msg);
        HistoryService.create(msg, 'warning');
      });

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

};