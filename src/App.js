import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from 'components/ContactList';

class App extends Component {
  static defaultProps = {
    initialContacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    initialFilter: '',
  };

  static propTypes = {
    initialContacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }),
    ),
    initialFilter: PropTypes.string.isRequired,
  };

  state = {
    contacts: this.props.initialContacts,
    filter: this.props.initialFilter,
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts: contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  duplicateValidator = name =>
    this.state.contacts.find(contact => contact.name === name);

  contactFormSubmitHandler = ({ name, number }) => {
    this.duplicateValidator(name)
      ? alert(`${name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [{ name, number, id: uuidv4() }, ...prevState.contacts],
        }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    const { filter } = this.state;

    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.contactFormSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
