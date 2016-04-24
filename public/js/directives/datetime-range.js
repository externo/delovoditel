'use strict';

angular
  .module('app')
  .directive("datetimeRange", function() {

    var hour = new Date().getHours() - 24;
    var month = new Date().getMonth() + 1;

    return {
      restrict: "A",
      link: function(scope, elem, attrs) {
        elem.keydown(false);
        elem.daterangepicker({
          opens: 'left',
          timePicker: true,
          timePicker24Hour: true,
          timePickerIncrement: 10,
          locale: {
            format: 'DD.MM.YYYY / HH:mm'
          },
          startDate: moment(new Date().setHours(hour)).format('DD.MM.YYYY / HH:mm'),
          endDate: moment(new Date().setMonth(month)).format('DD.MM.YYYY / HH:mm')
        });
      }
    }
  });