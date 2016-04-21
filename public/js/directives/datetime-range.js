'use strict';

angular
  .module('app')
  .directive("datetimeRange", function() {
    return {
      restrict: "A",
      link: function(scope, elem, attrs) {
        elem.daterangepicker({
          timePicker: true,
          timePicker24Hour: true,
          timePickerIncrement: 10,
          locale: {
            format: 'DD.MM.YYYY / HH:mm'
          },
          startDate: '01.01.2015 / 00:00',
          endDate: '31.12.2025 / 23:59'
        });
      }
    }
  });