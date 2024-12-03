import css from './ContactForm.module.css';

import { ErrorMessage, Formik, Form, Field } from 'formik';
import { useId } from 'react';

import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
// import { addContact } from '../../redux/contactsSlice';

const phoneRegexp = /^[0-9]{3}-[0-9]{2}-[0-9]{2}$/;

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .matches(phoneRegexp, "The phone number must match the format 'xxx-xx-xx'")
    .required('Required'),
});

const initialValues = {
  name: '',
  number: '',
};

const ContactForm = () => {

  const dispatch = useDispatch();

  const nameId = useId();
  const numberId = useId();

  const handleSubmit = (values, actions) => {
    const onAddContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    dispatch(addContact(onAddContact));

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <label className={css.text} htmlFor="nameId">
          Name
        </label>
        <Field
          className={css.field}
          type="text"
          name="name"
          id={nameId}
          placeholder="Enter name"
        />
        <ErrorMessage className={css.error} name="name" component="span" />

        <label className={css.text} htmlFor="numberId">
          Number
        </label>
        <Field
          className={css.field}
          type="text"
          name="number"
          id={numberId}
          placeholder="111-11-11"
        />
        <ErrorMessage className={css.error} name="number" component="span" />

        <button className={css.buttonSubmit} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
