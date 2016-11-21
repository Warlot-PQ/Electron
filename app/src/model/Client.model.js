/**
 * Created by jscarella on 21/11/16.
 */
class ClientApp {
  constructor(uuid, firstName, lastName, option, brand) {
    this.uuid = uuid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.option = option;
    this.brand = brand;
  }

  toString() {
    return `Client [id = ${this.uuid}, firstName = ${this.firstName}, lastName = ${this.lastName}, option = ${this.option}, brand = ${this.brand}]`;
  }
}