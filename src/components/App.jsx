import { useState, useEffect, useRef } from 'react';
import { Notify } from 'notiflix';
import Section from './Section';
import Phonebook from './Phonebook';
import Contacts from './Contacts';
import Filter from './Filter';
import Notification from './Notification';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);
  // console.log(firstRender);

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    // console.log(contacts);
    //  если const contacts существует и у него есть длинна то:
    if (contacts?.length) {
      setContacts(contacts);
    }
    firstRender.current = false;
  }, []);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const addContact = data => {
    if (contacts.find(el => el.name === data.name)) {
      Notify.failure('This contact is already in phonebook');
      return;
    }

    setContacts(prevState => [...prevState, data]);

    Notify.success('Contact added succesfully!');
  };

  const addFilter = e => {
    setFilter(e.target.value);
  };

  const filterContacts = () => {
    if (filter) {
      const filteredContacts = contacts.filter(el =>
        el.name.toLowerCase().includes(filter.toLowerCase())
      );
      return filteredContacts;
    }

    return contacts;
  };

  const deleteContact = id => {
    setContacts(prevState => [...prevState.filter(el => el.id !== id)]);
  };

  // const { addContact, addFilter, filterContacts, deleteContact } = this;
  return (
    <>
      <Section title="Phonebook">
        <Phonebook addContact={addContact} />
      </Section>
      <Section title="Contacts">
        {contacts.length ? (
          <>
            <Filter addFilter={addFilter} value={filter} />
            <Contacts data={filterContacts()} deleteContact={deleteContact} />
          </>
        ) : (
          <Notification message="Add new contact" />
        )}
      </Section>
    </>
  );
};
