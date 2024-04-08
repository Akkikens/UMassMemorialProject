import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select , Grid , Message } from 'semantic-ui-react';
import { Container } from 'react-bootstrap';
import { Entry } from '../../interface/types'; 

interface FormComponentProps {
  addOrUpdateEntry: (entryData: Entry | Omit<Entry, 'id'>) => void;
  existingEntry: Entry | null;
  cancelEdit?: () => void; // Add this line if it's needed
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

const FormComponent: React.FC<FormComponentProps> = ({ addOrUpdateEntry, existingEntry, cancelEdit
 }) => {
  const [formData, setFormData] = useState<Omit<Entry, 'id'>>({
    firstName: '',
    lastName: '',
    email: '',
    birthday: '',
    bloodGroup: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (existingEntry) {
      setFormData(existingEntry);
    }
  }, [existingEntry]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, { name, value }: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.SyntheticEvent<HTMLElement>, { name, value }: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName) {
      newErrors.firstName = 'Please enter your first name.';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Please enter your last name.';
    }
    if (!formData.email) {
      newErrors.email = 'Please enter your email address.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.birthday) {
      newErrors.birthday = 'Please enter your birthday.';
    }
    if (!formData.bloodGroup) {
      newErrors.bloodGroup = 'Please select your blood group.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (validateForm()) {
    if (existingEntry) {
      // Update an existing entry, including the id
      addOrUpdateEntry({ ...formData, id: existingEntry.id });
    } else {
      // Add a new entry, omitting the id
      addOrUpdateEntry(formData);
    }
    // Reset form
    setFormData({ firstName: '', lastName: '', email: '', birthday: '', bloodGroup: '' });
  }
};


  const validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const inputStyle = { paddin: '1rem',  };

  const formPaddingStyle = {
    padding: '1rem', 
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid stackable>
        <Grid.Row columns="equal">
          <Grid.Column>
            <Form.Field
              control={Input}
              label={() => <label style={{ paddingLeft: '20px' }}>First Name</label>}
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName ? true : false} // Ensure error is a boolean or a string message
              style={inputStyle} // This applies to the Input, not the label
            />
          </Grid.Column>
          <Grid.Column>
            <Form.Field
              control={Input}
              label="Last Name"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              style={inputStyle}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Field
              control={Input}
              label={() => <label style={{ paddingLeft: '20px' }}>Email</label>}
              placeholder="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              style={inputStyle}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal">
          <Grid.Column>
            <Form.Field
              control={Input}
              label={() => <label style={{ paddingLeft: '20px' }}>Birthday</label>}
              placeholder="Birthday"
              name="birthday"
              type="date"
              value={formData.birthday}
              onChange={handleChange}
              error={errors.birthday}
              style={inputStyle}
            />
          </Grid.Column>
          <Grid.Column>
            <Form.Field
              control={Select}
              label="Blood Group"
              options={bloodGroupOptions}
              placeholder="Select Blood Group"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleSelectChange}
              error={errors.bloodGroup}
              style={inputStyle}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {Object.values(errors).length > 0 && (
        <Message error header="Validation Error" list={Object.values(errors)} />
      )}
      <Container className="d-flex justify-content-center my-4">
      <Button type='submit' className='' primary>Submit</Button>
    </Container>
      
    </Form>
  );
};

export default FormComponent;