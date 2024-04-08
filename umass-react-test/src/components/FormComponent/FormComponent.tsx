import React, { useState } from 'react';
import { Button, Form, Input, Select , Grid , Message } from 'semantic-ui-react';
import { Entry } from '../../interface/types'; 


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
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (isFormValid()) {
      addEntry(formData);
      setError(''); // Clear any previous errors
      setFormData({ firstName: '', lastName: '', email: '', birthday: '', bloodGroup: '' }); // Reset form
    } else {
      setError('All fields must be filled out'); // Set an error message
    }
  };

  const validateEmail = (email: string) => {
    return email.includes('@');
  };

  const inputStyle = { paddingLeft: '10px', marginLeft: '10px'};

  return (
      <Form error={!!error}>
        <Grid stackable>
        <Grid.Row columns="equal"> 
        <Grid.Column width={8}>
              <Form.Field
                control={Input}
                label='First Name'
                placeholder='First Name'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                style={inputStyle}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field
                control={Input}
                label='Last Name'
                placeholder='Last Name'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                style={inputStyle}
              />
            </Grid.Column>
          </Grid.Row>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Form.Field
            control={Input}
            label='Email'
            placeholder='Email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Form.Field
            control={Input}
            label='Birthday'
            placeholder='Birthday'
            name='birthday'
            type='date'
            value={formData.birthday}
            onChange={handleChange}
            style={inputStyle}
          />
        </Grid.Column>
        <Grid.Column>
          <Form.Field
            control={Select}
            label='Blood Group'
            options={bloodGroupOptions}
            placeholder='Select Blood Group'
            name='bloodGroup'
            value={formData.bloodGroup}
            onChange={handleSelectChange}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    {error && <Message error content={error} />}
    <Button type='submit' onClick={handleSubmit} primary>Submit</Button>
  </Form>
);
};

export default FormComponent;