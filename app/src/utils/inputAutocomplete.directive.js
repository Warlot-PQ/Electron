/**
 * Created by pqwarlot on 16/11/16.
 */
(function () {
  'use strict';
  angular.module('app')
      .directive('inputAutocomplete', [inputAutocompleteDirective]);

  function inputAutocompleteDirective() {
    return {
      restrict: 'AE',
      scope: {
        error: '=',
        errorMessage: '=',
        data: '='
      },
      templateUrl: 'src/utils/inputAutocomplete.html',
      link: function (scope, elem, attrs) {
        scope.uniqueId = attrs.uniqueId;
        scope.label = attrs.label;

        let autoCompleteUl;
        let doubleEnable = false;
        elem.bind("keydown", function (event) {
          console.log(event.which);
          doubleEnable = false;

          var $directive = $(this);
          var $inputDiv = $directive.find('.input-field'); // Div to append on
          var $autocomplete = autoCompleteUl = $inputDiv.find('ul');

          var firstLi = $autocomplete.find('li:nth-child(1)').first();
          console.log(firstLi.text());
        });
        elem.bind("dblclick", function (event) {
          if (!doubleEnable) {
            doubleEnable = true;
          } else {
            return;
          }
          var $directive = $(this);
          var $inputDiv = $directive.find('.input-field'); // Div to append on
          var $autocomplete = autoCompleteUl = $inputDiv.find('ul');

          for(let key in scope.allData.data) {
            console.log(key);
            var autocompleteOption = $('<li></li>');
            autocompleteOption.append('<span>'+ key +'</span>');
            $autocomplete.append(autocompleteOption);
          }

          // Set input value
          $autocomplete.on('click', 'li', function () {
            var $directive = $(this);
            var $input = $directive.closest('div').find('input');

            console.log($input);

            $input.val($(this).text().trim());
            $input.trigger('change');
            $autocomplete.empty();
          });
        });
        elem.bind("keydown", function () {
          if (autoCompleteUl) {
            autoCompleteUl.empty();
          }
        });

        scope.$watch('allData', function (allData) {
          $(`input#${scope.uniqueId}`).autocomplete(allData);
        });

        scope.allData = {
          data: {
            "Apple": null,
            "Nokia": null,
            "Roger": null,
            "Bil": null,
            "Videotron": null,
            "Vodafone": null,
            "Microsoft": null,
            "Samsung": null,
            "Google": 'http://placehold.it/250x250'
          }
        };

        scope.validData = function () {
          scope.error = !(scope.data in scope.allData.data);
        };
      }
    }
  }
})();