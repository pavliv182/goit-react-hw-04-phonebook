import PropTypes from 'prop-types';

import css from './contacts.module.css';

const Contacts = ({ data, deleteContact }) => {
  const elements = data.map(el => (
    <li className={css.item} key={el.id}>
      <span>
        {el.name}: {el.number}
      </span>
      <button type="button" onClick={() => deleteContact(el.id)}>
        Delete
      </button>
    </li>
  ));
  return <ul>{elements}</ul>;
};

export default Contacts;

Contacts.defaultProps = {
  data: [],
};

Contacts.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.string.isRequired,
      ]),
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
