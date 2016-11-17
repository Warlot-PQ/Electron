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
      "lastname": "",
      "firstname": "",
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
      $('.modal').modal();
    }

    function getDataOpenModal() {
      let lastname = ctx.input.lastname;
      let firstname = ctx.input.firstname;
      let option = ctx.select.valueSelected;
      let brand = ctx.input.brand.value;
      let brandNotValid = ctx.input.brand.notValid;

      if (!lastname) {
        ctx.error.lastname = "Lastname cannot be empty!";
        return;
      } else {
        ctx.error.lastname = "";
      }
      if (!firstname) {
        ctx.error.firstname = "Firstname cannot be empty!";
        return;
      } else {
        ctx.error.firstname = "";
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
      /**/

      // Save data
      // IndexedDB.save(
      //   {id: "4", name: "toto"},
      //   function () {
      //     showSuccessMessage();
      //   }, function () {
      //       showErrorMessage();
      //   });
      //let items = IndexedDB.readAll();
      //console.log(items);
      showSuccessMessage();

      // Open the modal
      $('.modal').modal('open');
    }

    function showSuccessMessage() {
      ctx.status = {
        "title": "Success",
        "content": "Information successfully saved"
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
