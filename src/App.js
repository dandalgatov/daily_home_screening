import React, { Component, useState } from 'react'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
  Container
} from 'semantic-ui-react'

function App() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    otherTitle: '',
    group: '',
    date: '',
    symptoms: [],
    exposures: [],
  })
  

  const handleChange = (e, data) => {
    setFormData({
        ...formData,
        [data.name]: data.value
    })
  }

  const [currentDate, setNewDate] = useState(null);
  const onChange = (event, data) => setNewDate(data.value);

  const titleOptions = [
    { key: 's', text: 'Student', value: 'student' },
    { key: 't', text: 'Teacher', value: 'teacher' },
    { key: 'a', text: 'Assistant', value: 'assistant' },
    { key: 'c', text: 'Caregiver', value: 'caregiver' },
    { key: 'o', text: 'Other', value: 'other' },
  ]

  const groupOptions = [
    { key: 'si', text: 'Oduvanchiki', value: 'Oduvanchiki' },
    { key: 'vp', text: 'Vinni-Pukhi', value: 'Vinni-Pukhi' },
    { key: '145', text: 'JLP 145', value: 'JLP145' },
    { key: 'jlp', text: 'JLP', value: 'JLP' },
    { key: 'mb', text: 'Matroskiny/Barboskini', value: 'Matroskiny/Barboskini' },
    { key: 'ms', text: 'Mummi/Snusmumriki', value: 'Mummi/Snusmumriki' },
    { key: 'pf', text: 'Petsoni/Findusi', value: 'Petsoni/Findusi' },
  ]



  return (
    <Container>
      <img src='/logoRCSeng.svg' alt="" style={{height: '10vh'}}/>
      <h2>
        Parents: Please complete this short form each morning and report your child’s information in the morning before your child leaves for school.
      </h2>

      <Form>

        <Form.Group widths='equal'>
          <Form.Input fluid required
            label='First name'
            placeholder='First name'
            name='firstName'
            onChange={handleChange} />
          <Form.Input fluid required
            label='Last name'
            placeholder='Last name'
            name='firstName'
            onChange={handleChange} />
          <Form.Select fluid required
            label='Title'
            placeholder='Title'
            name='title'
            onChange={handleChange}
            options={titleOptions}
          />
        </Form.Group>
        {formData.title === 'other' ? <Form.Input fluid required label='Other:' placeholder='Other:' /> : ''}
        
        
        
        
        
        
        
        <Form.Group widths='equal'>
          <Form.Select
            fluid
            label='Group'
            options={groupOptions}
            placeholder='Group'
          />
          <SemanticDatepicker fluid required label='Date' onChange={handleChange} />
        </Form.Group>

        






        <h3>SECTION 1: Symptoms</h3>
        <p>If your child has any of the following symptoms, that indicates a possible illness that may decrease the student’s ability to learn and also put them at risk for spreading illness to others. Please check your child for these symptoms:</p>

        <Form.Group grouped>
          <Form.Field control='input' type='checkbox'
            label='Temperature 100.4 degrees Fahrenheit or higher when taken by mouth'
          />
          <Form.Field control='input' type='checkbox'
            label='Sore throat'
          />
          <Form.Field control='input' type='checkbox'
            label='New uncontrolled cough that causes difficulty breathing (for students with chronic allergic/asthmatic cough, a change in their cough from baseline)'
          />
          <Form.Field control='input' type='checkbox'
            label='Diarrhea, vomiting, or abdominal pain'
          />
          <Form.Field control='input' type='checkbox'
            label='New onset of severe headache, especially with a fever'
          />
        </Form.Group>

        <h3>SECTION 2: Close Contact/Potential Exposure</h3>

        <Form.Group grouped>
          <Form.Field control='input' type='checkbox'
            label='Had close contact (within 6 feet of an infected person for at least 15 minutes) with a person with confirmed COVID-19'
          />
          <Form.Field control='input' type='checkbox'
            label='Traveled to or lived in an area where the local, Tribal territorial, or state health department is reporting large numbers of COVID-19 cases as described in the Community Mitigation Framework'
          />
          <Form.Field control='input' type='checkbox'
            label='Live in areas of high community transmission (as described in the Community Mitigation Framework) while the school remains open'
          />
        </Form.Group>





        <Form.Field
          id='form-button-control-public'
          control={Button}
          content='Submit'
        />
      </Form>
    </Container>
  );
}

export default App;
