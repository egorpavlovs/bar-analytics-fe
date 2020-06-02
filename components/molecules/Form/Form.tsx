import React from 'react';
import styled from 'styled-components';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, Form as FormikForm } from 'formik';
import { FormFieldType, FormType, OptionType } from '../../../config/types';

const FormWrapper = styled.div`
  max-width: 40rem;
  margin: 0 auto;
  input,
  textarea,
  select {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    border-radius: 0.3rem;
    border: 1px solid rgb(179, 179, 179);
  }
  input[type='checkbox'],
  input[type='radio'] {
    width: auto;
  }
  textarea {
    resize: vertical;
  }
`;
const FormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 1rem;
`;
const Label = styled.label`
  margin-bottom: 0.5rem;
  display: block;
`;
const ErrorWrapper = styled.div`
  font-size: 0.9rem;
  color: red;
  padding: 0.5rem 0 0 1rem;
`;

const Form = ({ form }: { form: FormType }) => {
  const { fields, submit } = form;
  const formByName = mapKeys(fields, 'name');
  const initialValues = mapValues(formByName, 'initialValue');
  const validationSchema = Yup.object().shape(mapValues(formByName, 'validationSchema'));
  // todo custom components to the fields, strict types
  return (
    <FormWrapper>
      <Formik initialValues={initialValues} onSubmit={submit} validationSchema={validationSchema}>
        {() => (
          <FormikForm>
            <FormContainer>
              {fields.map((field: FormFieldType, i: number) => {
                const { type, name, label, placeholder, options, action, title } = field;
                const isInput = !(type === 'textarea' || type === 'select');
                return (
                  <div key={`${name}${i}`}>
                    {title && <Label htmlFor={name}>{title}</Label>}
                    <Field
                      type={isInput ? type : null}
                      as={!isInput && type}
                      name={name}
                      onClick={action}
                      id={name}
                      data-testid={`test-${name}`}
                      placeholder={placeholder}
                    >
                      {type === 'select' && options
                        ? options.map((option: OptionType, j: number) => {
                            const { value, label: optionLabel } = option;
                            return (
                              <option value={value} key={`${value}${j}`}>
                                {optionLabel}
                              </option>
                            );
                          })
                        : null}
                    </Field>
                    {label && type === 'checkbox' && <label htmlFor={name}>{label}</label>}
                    <ErrorMessage name={name}>{msg => <ErrorWrapper>{msg}</ErrorWrapper>}</ErrorMessage>
                  </div>
                );
              })}
            </FormContainer>
          </FormikForm>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default Form;
