import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

class ContactForm extends Component {
  static defaultProps = {
    initialName: '',
    initialNumber: '',
  };

  static propTypes = {
    initialName: PropTypes.string.isRequired,
    initialNumber: PropTypes.string.isRequired,
  };

  state = {
    name: this.props.initialName,
    number: this.props.initialNumber,
  };

  handleNameChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      contacts: [],
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <div>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <label htmlFor="">Name</label>

          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleNameChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
          <label htmlFor="">Number</label>
          <input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleNameChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
          <button type="submit">Add contact</button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
