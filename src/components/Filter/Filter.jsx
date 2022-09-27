import PropTypes from 'prop-types';

import css from './filter.module.css';

function Filter({ addFilter, value }) {
  return (
    <div className={css.filterWrapper}>
      <label htmlFor="filter">
        Find contact by name
        <input
          value={value}
          type="text"
          name="filter"
          id="filter"
          onChange={e => addFilter(e)}
        />
      </label>
    </div>
  );
}

export default Filter;

Filter.propTypes = {
  addFilter: PropTypes.func.isRequired,
};
