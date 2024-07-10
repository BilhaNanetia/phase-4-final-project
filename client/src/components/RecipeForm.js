
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecipeForm = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Create Recipe</h1>
      <Formik
        initialValues={{
          title: '',
          description: '',
          ingredients: '',
          instructions: '',
        }}
        validate={values => {
          const errors = {};
          if (!values.title) {
            errors.title = 'Required';
          }
          if (!values.description) {
            errors.description = 'Required';
          }
          if (!values.ingredients) {
            errors.ingredients = 'Required';
          }
          if (!values.instructions) {
            errors.instructions = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await axios.post('/recipes', values);
            setSubmitting(false);
            navigate('/');
          } catch (error) {
            console.error('Error in creating recipe:', error);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="title">Title</label>
              <Field type="text" name="title" />
              <ErrorMessage name="title" component="div" />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Field type="text" name="description" />
              <ErrorMessage name="description" component="div" />
            </div>
            <div>
              <label htmlFor="ingredients">Ingredients</label>
              <Field type="text" name="ingredients" />
              <ErrorMessage name="ingredients" component="div" />
            </div>
            <div>
              <label htmlFor="instructions">Instructions</label>
              <Field type="text" name="instructions" />
              <ErrorMessage name="instructions" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RecipeForm;