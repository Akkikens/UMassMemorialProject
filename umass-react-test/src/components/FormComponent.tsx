import React, { useState } from 'react';
import { Button, Form, Input, Select } from 'semantic-ui-react';
import { Entry } from '../interface/types'; 


interface FormComponentProps {
  addEntry: (entry: Omit<Entry, 'id'>) => void;
}

const bloodGroupOptions = [
  { key: 'a+', value: 'A+', text: 'A+' },
  { key: 'a-', value: 'A-', text: 'A-' },
  { key: 'b+', value: 'B+', text: 'B+' },
  { key: 'b-', value: 'B-', text: 'B-' },
  { key: 'ab+', value: 'AB+', text: 'AB+' },
  { key: 'ab-', value: 'AB-', text: 'AB-' },
  { key: 'o+', value: 'O+', text: 'O+' },
  { key: 'o-', value: 'O-', text: 'O-' },
];

const FormComponent: React.FC<FormComponentProps> = ({ addEntry }) => {
  const [formData, setFormData] = useState<Omit<Entry, 'id'>>({
    firstName: '',
    lastName: '',
    email: '',
    birthday: '',
    bloodGroup: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, { name, value }: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.SyntheticEvent<HTMLElement>, { name, value }: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = () => {
    // Here we check if any of the form fields are empty
    return formData.firstName && formData.lastName && formData.email && formData.birthday && formData.bloodGroup;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      addEntry(formData);
      setError(''); // Clear any previous errors
      setFormData({ firstName: '', lastName: '', email: '', birthday: '', bloodGroup: '' }); // Reset form
    } else {
      setError('All fields must be filled out'); // Set an error message
    }
  };

  return (
    <Form>
      <Form.Field
        control={Input}
        label='First Name'
        placeholder='First Name'
        name='firstName'
        value={formData.firstName}
        onChange={handleChange}
      />
      <Form.Field
        control={Input}
        label='Last Name'
        placeholder='Last Name'
        name='lastName'
        value={formData.lastName}
        onChange={handleChange}
      />
      <Form.Field
        control={Input}
        label='Email'
        placeholder='Email'
        name='email'
        type='email'
        value={formData.email}
        onChange={handleChange}
      />
      <Form.Field
        control={Input}
        label='Birthday'
        placeholder='Birthday'
        name='birthday'
        type='date'
        value={formData.birthday}
        onChange={handleChange}
      />
      <Form.Field
        control={Select}
        label='Blood Group'
        options={bloodGroupOptions}
        placeholder='Select Blood Group'
        name='bloodGroup'
        value={formData.bloodGroup}
        onChange={handleSelectChange}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button type='submit' onClick={handleSubmit} primary>Submit</Button>
    </Form>
  );
};

export default FormComponent;