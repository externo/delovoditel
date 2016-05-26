module.exports = function($http, baseUrl) {

  return {
    find: find
  };

  function find(id, callback) {
    $http.get(baseUrl + '/admin/user/' + id)
      .success(callback);
  }

};