/**
 * Created by pqwarlot on 16/11/16.
 */
(function () {
  'use strict';
  angular.module('app')
      .controller('clientFormController', ['clientFactory', clientFormController]);

  const uuid = require('uuid');

  function clientFormController(clientFactory) {
    const _clientFactory = clientFactory;
    let vm = this;

    vm.title = {
      "valueSelected": "",
      "choices": ["", "Monsieur", "Madame"]
    };
    vm.input = {
      "firstName": "",
      "lastName": "",
      "company": "",
      "workPosition": "",
      "address": "",
      "phoneNumber": "",
      "children": ""
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
      let title = vm.title.valueSelected;
      let firstName = vm.input.firstName;
      let lastName = vm.input.lastName;
      let company = vm.input.company;
      let workPosition = vm.input.workPosition;
      let address = vm.input.address;
      let phoneNumber = vm.input.phoneNumber;
      let children = vm.input.children;

      if (!title) {
        vm.error.title = "La civilité ne peut pas être vide !";
        return;
      } else {
        vm.error.title = "";
      }
      if (!firstName) {
        vm.error.firstName = "Le prénom ne peut pas être vide !";
        return;
      } else {
        vm.error.firstName = "";
      }
      if (!lastName) {
        vm.error.lastName = "Le nom ne peut pas être vide !";
        return;
      } else {
        vm.error.lastName = "";
      }
      if (!address) {
        vm.error.address = "L'adresse ne peut pas être vide !";
        return;
      } else {
        vm.error.address = "";
      }
      if (!phoneNumber) {
        vm.error.phoneNumber = "Le numéro de téléphone ne peut pas être vide !";
        return;
      } else {
        vm.error.phoneNumber = "";
      }
      if (!children) {
        vm.error.children = "La sélection enfant(s) ne peut pas être vide !";
        return;
      } else {
        vm.error.children = "";
      }

      // Save data
      let promise = _clientFactory.add(
          new ClientApp(uuid(), title, firstName, lastName, company, workPosition, address, phoneNumber, children));

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
        "title": "Succès",
        "content": "Les informations ont été correctement sauvegardées : " + newClient.toString()
      };
    }

    function showErrorMessage() {
      vm.status = {
        "title": "Erreur",
        "content": "Une erreur a été rencontrée. Les informations n'ont pas pu être sauvegardées."
      };
    }
  }
})();
