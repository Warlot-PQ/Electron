/**
 * Created by jscarella on 22/11/16.
 */
class NewClientApp {

  constructor(uuid, title, firstName, lastName, company, workPosition, address, phoneNumber, children) {
    this.uuid = uuid;
    this.title = title;
    this.firstName = firstName;
    this.lastName = lastName;
    this.company = company;
    this.workPosition = workPosition;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.children = children;
  }

  toString() {
    return `Client [uuid = ${this.uuid}, civilité = ${this.title}, prénom = ${this.firstName}, nom = ${this.lastName}, entreprise = ${this.company}, position occupée = ${this.workPosition}, adresse = ${this.address}, téléphone = ${this.phoneNumber}, enfants = ${this.children}]`;
  }
}