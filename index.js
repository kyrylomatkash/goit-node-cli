const { program } = require("commander");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./src/contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const getAll = await listContacts();
      return console.table(getAll);

    case "get":
      const contactID = await getContactById(id);
      return console.log(contactID);

    case "add":
      const newContact = await addContact({ name, email, phone });
      return console.log(newContact);

    case "remove":
      const updateContact = await removeContact(id);
      return console.log(updateContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
