import React, { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

function FormComponent({ addEntry }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthday: '',
    bloodGroup: ''
  });

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    addEntry(formData);
    setFormData({ firstName: '', lastName: '', email: '', birthday: '', bloodGroup:'' }); // Reset form
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <Input
          placeholder='First Name'
          name='firstName'
          value={formData.firstName}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder='Last Name'
          name='lastName'
          value={formData.lastName}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Input
          type='email'
          placeholder='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Input
          type='date'
          placeholder='Birthday'
          name='birthday'
          value={formData.birthday}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder='Blood Group'
          name='bloodGroup'
          value={formData.bloodGroup}
          onChange={handleChange}
        />
        </Form.Field>
      <Button type='submit' fluid primary>Submit</Button>
    </Form>
  );
}

export default FormComponent;