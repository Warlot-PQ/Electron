/**
 * Created by pqwarlot on 16/11/16.
 */
(function () {
  'use strict';
  angular.module('app')
      .controller('simpleFormController', ['$scope', 'IndexedDB', simpleFormController]);

  function simpleFormController($scope, IndexedDB) {
    $scope.select = {
      "valueSelected": "Option 1",
      "choices": ["Option 1", "Option 2", "Option 3"]
    };
    $scope.input = {
      "lastname": "",
      "firstname": "",
      brand: {
        value: "",
        notValid: ""
      }
    };
    $scope.error = {};




    IndexedDB.readAll();



    
    // Initialize modal
    $('.modal').modal();

    $scope.getDataOpenModal = function () {

      /* Encapsulate this */
      let lastname = $scope.input.lastname;
      let firstname = $scope.input.firstname;
      let option = $scope.select.valueSelected;
      let brand = $scope.input.brand.value;
      let brandNotValid = $scope.input.brand.notValid;

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
      if (!brand || brandNotValid) {
        $scope.error.brand = "Brand must be one of the given by the system!";
        return;
      } else {
        $scope.error.brand = "";
      }
      /**/

      // Save data
      // IndexedDB.save(
      //   {id: "4", name: "toto"},
      //   function () {
      //     showSuccessMessage($scope);
      //   }, function () {
      //       showErrorMessage($scope);
      //   });
      // IndexedDB.readAll();


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
