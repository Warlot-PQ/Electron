/**
 * Created by pqwarlot on 16/11/16.
 */
(function () {
  'use strict';
  angular.module('app')
      .controller('clientFormController', ['IndexedDB', clientFormController]);

  const keyPath = "uuid";
  const objectStoreName = "clients";
  const objectStoreVersion = 1;
  const indexes = [{name: "by_name", column: "lastName", option: {unique: false}}];
  const uuid = require('uuid');
  const dataset = [
    {uuid: uuid(), title: "Monsieur", firstName: "Jeremy", lastName: "Scarella", company: "eBusiness Information", workPosition: "Consultant", address: "75020", phoneNumber: "0612345678", children: false},
    {uuid: uuid(), title: "Monsieur", firstName: "Pierre-Quentin", lastName: "Warlot", company: "eBusiness Information", workPosition: "Consultant", address: "94230", phoneNumber: "0687654321", children: false}
  ];
  const idbTable = new IDBTableApp(keyPath, objectStoreName, objectStoreVersion, indexes, dataset);

  function clientFormController(IndexedDB) {
    let ctx = this;

    ctx.title = {
      "valueSelected": "",
      "choices": ["", "Monsieur", "Madame"]
    };
    ctx.input = {
      "firstName": "",
      "lastName": "",
      "company": "",
      "workPosition": "",
      "address": "",
      "phoneNumber": "",
      "children": ""
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
      let title = ctx.title.valueSelected;
      let firstName = ctx.input.firstName;
      let lastName = ctx.input.lastName;
      let company = ctx.input.company;
      let workPosition = ctx.input.workPosition;
      let address = ctx.input.address;
      let phoneNumber = ctx.input.phoneNumber;
      let children = ctx.input.children;

      if (!title) {
        ctx.error.title = "La civilité ne peut pas être vide !";
        return;
      } else {
        ctx.error.title = "";
      }
      if (!firstName) {
        ctx.error.firstName = "Le prénom ne peut pas être vide !";
        return;
      } else {
        ctx.error.firstName = "";
      }
      if (!lastName) {
        ctx.error.lastName = "Le nom ne peut pas être vide !";
        return;
      } else {
        ctx.error.lastName = "";
      }
      if (!address) {
        ctx.error.address = "L'adresse ne peut pas être vide !";
        return;
      } else {
        ctx.error.address = "";
      }
      if (!phoneNumber) {
        ctx.error.phoneNumber = "Le numéro de téléphone ne peut pas être vide !";
        return;
      } else {
        ctx.error.phoneNumber = "";
      }
      if (!children) {
        ctx.error.children = "La sélection enfant(s) ne peut pas être vide !";
        return;
      } else {
        ctx.error.children = "";
      }

      // Save data
      let newClient = new ClientApp(uuid(), title, firstName, lastName, company, workPosition, address, phoneNumber, children);
      let promise = IndexedDB.save(idbTable, newClient);
      promise.then(function (data) {
        showSuccessMessage(data);
      }, function (error) {
        console.log(error);
      });

      // Open the modal
      $('.modal').modal('open');
    }

    function showSuccessMessage(newClient) {
      ctx.status = {
        "title": "Succès",
        "content": "Les informations ont été correctement sauvegardées : " + newClient.toString()
      };
    }

    function showErrorMessage() {
      ctx.status = {
        "title": "Erreur",
        "content": "Une erreur a été rencontrée. Les informations n'ont pas pu être sauvegardées."
      };
    }
  }
})();
