import React from 'react';
import { Component } from 'react';
// import { Form } from './form/form';
import { nanoid } from 'nanoid';
import { FilterCon } from './FilterContacts/FilterContacts';
import { ContactList } from './ContactsList/ContactList';
import { Layout } from './Layout';
import { Title, TitleBook } from './App.styled';
import { GlobalStyle } from './GlobalStyled';
import { FormFormik } from './form/FormFormik';

// const contactList = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const contactStorage = JSON.parse(localStorage.getItem('contactList'));
    // console.log(contactStorage);
    if (contactStorage) {
      this.setState({
        contacts: contactStorage,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contactList', JSON.stringify(this.state.contacts));
    }
  }

  filtered = event => {
    this.setState({ filter: event.target.value });
    console.log(this.state.filter);
  };

  addContacts = formValues => {
    const { name, number } = formValues;
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (this.state.contacts.some(cont => cont.name === contact.name)) {
      return alert(`${contact.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(cont => cont.id !== id),
    }));
    console.log(id);
  };

  render() {
    const visibleContact = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <Layout>
        <Title>PHONEBOOK</Title>

        <FormFormik addContacts={this.addContacts} />

        <TitleBook>CONTACTS</TitleBook>

        <FilterCon filter={this.state.filter} contFilter={this.filtered} />

        <ContactList
          dataRender={visibleContact}
          onClickDelete={this.deleteContact}
        />
        <GlobalStyle />
      </Layout>
    );
  }
}
