'use strict';

angular
  .module('app')
  .factory('FileService', FileService)
  .directive('appFilereader', function ($q) {

    var slice = Array.prototype.slice;

    return {
      restrict: 'A',
      require: '?ngModel',
      link: function (scope, element, attrs, ngModel) {
        if (!ngModel) return;

        ngModel.$render = function () { };

        element.bind('change', function (e) {
          var element = e.target;
          if (!element.value) return;

          element.disabled = true;
          $q.all(slice.call(element.files, 0).map(readFile))
            .then(function (values) {
              if (element.multiple) ngModel.$setViewValue(values);
              else ngModel.$setViewValue(values.length ? values[0] : null);
              element.value = null;
              element.disabled = false;
            });

          function readFile(file) {
            var deferred = $q.defer();

            var reader = new FileReader();
            reader.onload = function (e) {
              deferred.resolve(e.target.result);
            };
            reader.onerror = function (e) {
              deferred.reject(e);
            };
            reader.readAsDataURL(file);

            return deferred.promise;
          }

        }); //change

      } //link

    }; //return

  }) //appFilereader
  .directive('fileModel', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function () {
          scope.$apply(function () {
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }]);

function FileService($http) {

  return {
    create: create,
    find: find,
    update: update,
    remove: remove
  };

  function create(site, callback) {
    $http.post('/api/website', site)
      .success(callback);
  }

  function find(callback) {
    $http.get('/admin/case/:id/file')
      .success(callback);
  }

  function update(id, site, callback) {
    $http.put('/api/website/' + id, site)
      .success(callback);
  }

  function remove(id, callback) {
    $http.delete('/api/website/' + id)
      .success(callback);
  }
}