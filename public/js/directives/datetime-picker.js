'use strict';

angular
  .module('app')
  .directive("datetimePicker", function() {

    return {
      restrict: "A",
      link: function(scope, elem, attrs) {
        elem.keydown(false);
        elem.daterangepicker({
          timePicker: true,
          timePicker24Hour: true,
          timePickerIncrement: 10,
          maxDate:new Date('2016-12-01'),
          locale: {
            format: 'DD.MM.YYYY / HH:mm'
          },
          startDate: moment(new Date()).format('DD.MM.YYYY / HH:mm'),
          singleDatePicker: true,
          showDropdowns: true
        });
      }
    }
  });