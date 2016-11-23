/**
 * Created by pqwarlot on 16/11/16.
 */
(function () {
  'use strict';
  angular.module('app')
      .controller('simpleFormController', ['IndexedDB', simpleFormController]);

  function simpleFormController(IndexedDB) {
    let ctx = this;

    ctx.select = {
      "valueSelected": "Option 1",
      "choices": ["Option 1", "Option 2", "Option 3"]
    };
    ctx.input = {
      "lastName": "",
      "firstName": "",
      "brand": {
        "value": "",
        "notValid": ""
      }
    };
    // Error data about each input
    ctx.error = {};
    // Data displayed after "save it" button clicked
    ctx.status = {};

    ctx.getDataOpenModal = getDataOpenModal;

    activate();

    function activate() {
      // Initialize modal
      $('.modal').modal({
        dismissible: false, // Modal can be dismissed by clicking outside of the modal
        complete: function() { location.reload(); } // Callback for Modal close
      });
    }

    function getDataOpenModal() {
      let firstName = ctx.input.firstName;
      let lastName = ctx.input.lastName;
      let option = ctx.select.valueSelected;
      let brand = ctx.input.brand.value;
      let brandNotValid = ctx.input.brand.notValid;

      if (!firstName) {
        ctx.error.firstName = "Firstname cannot be empty!";
        return;
      } else {
        ctx.error.firstName = "";
      }
      if (!lastName) {
        ctx.error.lastName = "Lastname cannot be empty!";
        return;
      } else {
        ctx.error.lastName = "";
      }
      if (!option in ctx.select.choices) {
        ctx.error.option = "Option cannot be empty!";
        return;
      } else {
        ctx.error.option = "";
      }
      if (!brand || brandNotValid) {
        ctx.error.brand = "Brand must be one of the given by the system!";
        return;
      } else {
        ctx.error.brand = "";
      }

      // Save data
      let newClient = new ClientApp(new Date().getTime(), firstName, lastName, option, brand);
      let promise = IndexedDB.save(newClient);
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
      ctx.status = {
        "title": "Success",
        "content": "Information successfully saved: new " + newClient.toString() + "."
      };
    }

    function showErrorMessage() {
      ctx.status = {
        "title": "Error",
        "content": "Something went wrong. Information not saved."
      };
    }
  }
})();
