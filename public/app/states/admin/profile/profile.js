module.exports = function(baseUrl, ProfileService) {

  var Profile = this;

  Profile.baseUrl = baseUrl;

  ProfileService.find('', function (res) {
    Profile.currentProfile = res;
  });

};