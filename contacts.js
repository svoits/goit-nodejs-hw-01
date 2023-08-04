const fs = require("node:fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

// Returns an array of contacts.
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

// Returns the contact object with this id. Returns null if no contact with this id is found.
async function getContactById(contactId) {
  const id = String(contactId);
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
}

// Returns the object of the added contact.
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

// Returns the deleted contact object. Returns null if no contact with this id is found.
async function removeContact(contactId) {
  const id = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
