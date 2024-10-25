import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: '', 
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    }
  });

  // Fetch contacts from API on component mount
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setContacts(response.data))
      .catch(error => console.error("Error fetching contacts:", error));
  }, []);

  // Add a contact
  const addContact = () => {
    axios.post(API_URL, newContact)
      .then(response => {
        setContacts([...contacts, { ...response.data, id: Date.now() }]);
        setNewContact({
          name: '', 
          username: '',
          email: '',
          address: {
            street: '',
            suite: '',
            city: '',
            zipcode: '',
            geo: { lat: '', lng: '' }
          }
        }); // Reset form
      })
      .catch(error => console.error("Error adding contact:", error));
  };

  // Update a contact
  const updateContact = (id) => {
    const updatedContact = contacts.find(contact => contact.id === id);
    axios.put(`${API_URL}/${id}`, updatedContact)
      .then(response => {
        setContacts(contacts.map(contact => 
          contact.id === id ? { ...response.data } : contact
        ));
      })
      .catch(error => console.error("Error updating contact:", error));
  };

  // Delete a contact
  const deleteContact = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setContacts(contacts.filter(contact => contact.id !== id));
      })
      .catch(error => console.error("Error deleting contact:", error));
  };

  return (
    <div>
      <h1>Contact Manager</h1>
      
      {/* Form to add new contact */}
      <div>
        <input 
          type="text" 
          placeholder="Name" 
          value={newContact.name} 
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Username" 
          value={newContact.username} 
          onChange={(e) => setNewContact({ ...newContact, username: e.target.value })} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={newContact.email} 
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Street" 
          value={newContact.address.street} 
          onChange={(e) => setNewContact({ 
            ...newContact, 
            address: { ...newContact.address, street: e.target.value } 
          })} 
        />
        <input 
          type="text" 
          placeholder="Suite" 
          value={newContact.address.suite} 
          onChange={(e) => setNewContact({ 
            ...newContact, 
            address: { ...newContact.address, suite: e.target.value } 
          })} 
        />
        <input 
          type="text" 
          placeholder="City" 
          value={newContact.address.city} 
          onChange={(e) => setNewContact({ 
            ...newContact, 
            address: { ...newContact.address, city: e.target.value } 
          })} 
        />
        <input 
          type="text" 
          placeholder="Zipcode" 
          value={newContact.address.zipcode} 
          onChange={(e) => setNewContact({ 
            ...newContact, 
            address: { ...newContact.address, zipcode: e.target.value } 
          })} 
        />
        <input 
          type="text" 
          placeholder="Latitude" 
          value={newContact.address.geo.lat} 
          onChange={(e) => setNewContact({ 
            ...newContact, 
            address: { 
              ...newContact.address, 
              geo: { ...newContact.address.geo, lat: e.target.value } 
            } 
          })} 
        />
        <input 
          type="text" 
          placeholder="Longitude" 
          value={newContact.address.geo.lng} 
          onChange={(e) => setNewContact({ 
            ...newContact, 
            address: { 
              ...newContact.address, 
              geo: { ...newContact.address.geo, lng: e.target.value } 
            } 
          })} 
        />
        <button onClick={addContact}>Add Contact</button>
      </div>

      {/* List of contacts */}
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            <p>Name: {contact.name}</p>
            <p>Username: {contact.username}</p>
            <p>Email: {contact.email}</p>
            <p>Address: {contact.address.street}, {contact.address.suite}, {contact.address.city}, {contact.address.zipcode}</p>
            <p>Geo: {contact.address.geo.lat}, {contact.address.geo.lng}</p>
            <button onClick={() => updateContact(contact.id)}>Update</button>
            <button onClick={() => deleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactManager;
