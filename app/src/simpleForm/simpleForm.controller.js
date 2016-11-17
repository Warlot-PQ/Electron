/**
 * Created by pqwarlot on 16/11/16.
 */
(function () {
  'use strict';
  angular.module('app')
      .controller('simpleFormController', ['$scope', simpleFormController]);

  function simpleFormController($scope) {
    $scope.select = {
      "valueSelected": "Option 1",
      "choices": ["Option 1", "Option 2", "Option 3"]
    };
    $scope.input = {
      "lastname": "",
      "firstname": "",
      "brand": ""
    };
    $scope.error = {};

    // Initialize modal
    $('.modal').modal();

    $scope.getDataOpenModal = function () {

      /* Encapsulate this */
      let lastname = $scope.input.lastname;
      let firstname = $scope.input.firstname;
      let option = $scope.select.valueSelected;
      let brand = $scope.input.brand;

      if (!lastname) {
        $scope.error.lastname = "Lastname cannot be empty!";
        return;
      } else {
        $scope.error.lastname = "";
      }
      if (!firstname) {
        $scope.error.firstname = "Firstname cannot be empty!";
        return;
      } else {
        $scope.error.firstname = "";
      }
      if (!option in $scope.select.choices) {
        $scope.error.option = "Option cannot be empty!";
        return;
      } else {
        $scope.error.option = "";
      }
      console.log($scope.input.brand);
      if (!brand) {
        $scope.error.brand = "Brand must be one of the given by the system!";
        return;
      } else {
        $scope.error.brand = "";
      }
      /**/

      showSuccessMessage($scope);

      // Open the modal
      $('.modal').modal('open');
    };
  }

  function showErrorMessage(scope) {
    scope.status = {
      "title": "Success",
      "content": "Information successfully saved"
    };
  }

  function showSuccessMessage(scope) {
    scope.status = {
      "title": "Error",
      "content": "Something went wrong. Information not saved."
    };
  }
})();
