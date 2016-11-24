/**
 * Created by pqwarlot on 16/11/16.
 */
(function () {
  'use strict';
  angular.module('app')
      .controller('simpleFormController', ['clientFactory', simpleFormController]);

  function simpleFormController(clientFactory) {
    const _clientFactory = clientFactory;
    let vm = this;

    vm.select = {
      "valueSelected": "Option 1",
      "choices": ["Option 1", "Option 2", "Option 3"]
    };
    vm.input = {
      "lastName": "",
      "firstName": "",
      "brand": {
        "value": "",
        "notValid": ""
      }
    };
    // Error data about each input
    vm.error = {};
    // Data displayed after "save it" button clicked
    vm.status = {};

    vm.getDataOpenModal = getDataOpenModal;

    activate();

    function activate() {
      // Initialize modal
      $('.modal').modal({
        dismissible: false, // Modal can be dismissed by clicking outside of the modal
        complete: function() { location.reload(); } // Callback for Modal close
      });
    }

    function getDataOpenModal() {
      let firstName = vm.input.firstName;
      let lastName = vm.input.lastName;
      let option = vm.select.valueSelected;
      let brand = vm.input.brand.value;
      let brandNotValid = vm.input.brand.notValid;

      if (!firstName) {
        vm.error.firstName = "Firstname cannot be empty!";
        return;
      } else {
        vm.error.firstName = "";
      }
      if (!lastName) {
        vm.error.lastName = "Lastname cannot be empty!";
        return;
      } else {
        vm.error.lastName = "";
      }
      if (!option in vm.select.choices) {
        vm.error.option = "Option cannot be empty!";
        return;
      } else {
        vm.error.option = "";
      }
      if (!brand || brandNotValid) {
        vm.error.brand = "Brand must be one of the given by the system!";
        return;
      } else {
        vm.error.brand = "";
      }

      // Save data
      let newClient = new ClientApp(new Date().getTime(), firstName, lastName, option, brand);
      let promise = clientFactory.add(newClient);
      promise.then(function (data) {
        showSuccessMessage(data);
      }, function (error) {
        showErrorMessage();
        console.log(error);
      });

      // Open the modal
      $('.modal').modal('open');
    }

    function showSuccessMessage(newClient) {
      vm.status = {
        "title": "Success",
        "content": "Information successfully saved: new " + newClient.toString() + "."
      };
    }

    function showErrorMessage() {
      vm.status = {
        "title": "Error",
        "content": "Something went wrong. Information not saved."
      };
    }
  }
})();
