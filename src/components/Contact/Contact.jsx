import { FaPhone, FaUser } from 'react-icons/fa';
import css from './Contact.module.css';

const Contact = ({ id, name, number, onDelete }) => {
  return (
    <>
      <li className={css.item}>
        <div>
          <p>
            <FaUser />
            {name}
          </p>
          </div>

          <div>
          <p>
            <FaPhone />
            {number}
          </p>
          <button className={css.button} onClick={() => onDelete(id)}>
            Delete
          </button>
        </div>
      </li>
    </>
  );
};

export default Contact;
