import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';

export default function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul>
      {contacts.map(({ name, number, id }) => (
        <li className={s.item} key={uuidv4()}>
          <p>
            {name} : {number}
          </p>
          <button onClick={() => onDeleteContact(id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
