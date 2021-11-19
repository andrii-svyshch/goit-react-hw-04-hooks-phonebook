import s from './Filter.module.css';
import PropTypes from 'prop-types';

export default function Filter({ value, onChange }) {
  return (
    <div className={s.filter}>
      <label>
        Find contacts by name
        <input type="text" value={value} onChange={onChange}></input>
      </label>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
