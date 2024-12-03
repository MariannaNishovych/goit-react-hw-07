import { useDispatch, useSelector } from 'react-redux';
import css from './SearchBox.module.css';
import { setFilterValue } from '../../redux/filtersSlice';

const SearchBox = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filter.name || '');
  const handleFilter = (evt) => {
    dispatch(setFilterValue(evt.target.value));
  }
  return (
    <div className={css.container}>
      <p className={css.text}>Find contacts by name</p>
      <input
        className={css.input}
        type="text"
        name="searchContact"
        placeholder="Enter search name"
        value={filter}
        onChange={handleFilter}
      />
    </div>
  );
};

export default SearchBox;
