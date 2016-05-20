module.exports = function($http, baseUrl) {

  return {
    create: create,
    remove: remove,
    findAll: findAll
  };

  function create(site, callback) {
    $http.post(baseUrl + '/admin/court', site)
      .success(callback);
  }

  function remove(id, callback) {
    $http.delete(baseUrl + '/admin/court/' + id)
      .success(callback);
  }

  function findAll(callback) {
    $http.get(baseUrl + '/admin/court')
      .success(callback);
  }
};