const fs = require("node:fs/promises");
const path = require("path");
const { randomBytes } = require("crypto");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Error reading contacts: " + error.message);
  }
}

async function getContactById(id) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact || null;
}

async function addContact(contactInfo) {
  try {
    const getAll = await listContacts();
    const randomId = randomBytes(16).toString("hex");
    const newContact = { id: randomId, ...contactInfo };
    getAll.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(getAll, null, 2));

    console.log(`Contact added successfully. ID: ${newContact.id}`);

    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error.message);
    throw new Error("Error adding contact: " + error.message);
  }
}
async function removeContact(id) {
  try {
    const getAll = await listContacts();
    const index = getAll.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    const [result] = getAll.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(getAll, null, 2));
    console.log(`Contact with ID ${id} has been successfully removed.`);
    return result;
  } catch (error) {
    throw new Error("Error removing contact: " + error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
