/**
 * Created by pqwarlot on 17/11/16.
 */
class FileApp {
  constructor(uuid, title, author) {
    this.uuid = uuid;
    this.title = title;
    this.author = author;
  }

  toString() {
    return `(${uuid}, ${title}, ${author})`;
  }
}