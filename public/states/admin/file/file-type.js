'use strict';

angular
  .module('app')
  .controller('FileTypeController', FileTypeController);

function FileTypeController(FileTypeService, NotyService) {

  var File = this;

  File.type = null;

  File.addType = function () {
    FileTypeService.create(File.type, function(response){
      File.types = response;
      NotyService.success('Файлове тип ' + File.type.name + ' е създаден');
    });
  };

  File.removeType = function (type) {
    FileTypeService.remove(type._id, function(response){
      File.types = response;
      NotyService.success('Файлове тип ' + type.name + ' е премахнат');
    });
  };

  FileTypeService.findAll(function (response) {
    var typesLength = response.length;
    if(typesLength){
      typesLength > 1 ? NotyService.info('Заредени са ' + response.length + ' файлови типа') : NotyService.info('Зареден е 1 файлов тип');
    }else{
      NotyService.info('Няма файлови типове');
      NotyService.success('Добавете файлов тип като натиснете бутона [Добави]');
    }
    File.types = response;
  });
}