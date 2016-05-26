module.exports = function(baseUrl, ProfileService) {

  var Profile = this;

  Profile.baseUrl = baseUrl;

  ProfileService.find('57474ec5256c63ac84466394', function (res) {
    Profile.currentProfile = res;
  });

};