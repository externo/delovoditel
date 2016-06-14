module.exports = function(baseUrl, ProfileService, FileService, NotyService, SoundService, HistoryService) {

  var Profile = this;

  Profile.baseUrl = baseUrl;
  Profile.currentProfile = null;      // temp variable for edit selected article

  Profile.editProfile = function () {

    var msg = 'Профилът Ви е редактиран';

    if (Profile.editImage) {
      FileService.remove(Profile.currentProfile.image);

      var file = Profile.editImage;
      var fileData = new FormData();
      fileData.append('file', file);
      var options = {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      };

      FileService.upload(fileData, options, function (res) {
        Profile.currentProfile.image = res;
        Profile.currentProfile.datetime = new Date();
        Profile.editImage = null;

        ProfileService.update(Profile.currentProfile, function (res) {
          Profile.currentProfile = res;

          NotyService.success(msg);
          HistoryService.create(msg, 'warning');
        });
      });
    } else {
      Profile.currentProfile.datetime = new Date();
      ProfileService.update(Profile.currentProfile, function (res) {
        Profile.currentProfile = res;

        NotyService.success(msg);
        HistoryService.create(msg, 'warning');
      });
    }

  };

  ProfileService.find('575ff26efa2bdcb4ff0097b5', function (res) {
    Profile.currentProfile = res;
  });

};
