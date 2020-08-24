import React, { useState } from 'react'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {
  Button,
  Form,
  Container,
  Checkbox
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
    console.log(data)
    setFormData({
        ...formData,
        [data.name]: data.value
    })
  }

  const handleCheckbox = (e, data) => {
    setFormData({
        ...formData,
        [data.name]: [... formData[data.name], data.value]
    })
  }


  console.log(new Date().toISOString().slice(0,10))

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

  const symptopmOptions = [
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
            name='lastName'
            onChange={handleChange} />
          <Form.Select fluid required
            label='Title'
            placeholder='Title'
            name='title'
            options={titleOptions}
            onChange={handleChange}
          />
        </Form.Group>
        {formData.title === 'other' ? <Form.Input fluid required label='Other:' placeholder='Other:' /> : ''}
        
        
        
        
        
        
        
        <Form.Group widths='equal'>
          <Form.Select fluid required
            label='Group'
            placeholder='Group'
            name='group'
            options={groupOptions}
            onChange={handleChange}
          />
          <SemanticDatepicker fluid required
            label='Date'
            name='date'
            onChange={handleChange} />
        </Form.Group>







        <h3>SECTION 1: Symptoms</h3>
        <p>If your child has any of the following symptoms, that indicates a possible illness that may decrease the student’s ability to learn and also put them at risk for spreading illness to others. Please check your child for these symptoms:</p>

        <Form.Group grouped>
          

          <Form.Field control={Checkbox}
            label='Temperature 100.4 degrees Fahrenheit or higher when taken by mouth'
            name='symptoms'
            value='High Temperature'
            onChange={handleCheckbox}
          />
          <Form.Field control={Checkbox}
            label='Sore throat'
            name='symptoms'
            value='Sore Throat'
            onChange={handleCheckbox}
          />
          <Form.Field control={Checkbox}
            label='New uncontrolled cough that causes difficulty breathing (for students with chronic allergic/asthmatic cough, a change in their cough from baseline)'
            name='symptoms'
            value='Uncontrolled Cough'
            onChange={handleCheckbox}
          />
          <Form.Field control={Checkbox}
            label='Diarrhea, vomiting, or abdominal pain'
            name='symptoms'
            value='Diarrhea, vomiting, or abdominal pain'
            onChange={handleCheckbox}
          />
          <Form.Field control={Checkbox}
            label='New onset of severe headache, especially with a fever'
            name='symptoms'
            value='Severe Headache'
            onChange={handleCheckbox}
          />
        </Form.Group>

        <h3>SECTION 2: Close Contact/Potential Exposure</h3>

        <Form.Group grouped>
          <Form.Field control={Checkbox}
            label='Had close contact (within 6 feet of an infected person for at least 15 minutes) with a person with confirmed COVID-19'
            name='exposures'
            value='Close Contact with Confirmed Case of COVID-19'
            onChange={handleCheckbox}
          />
          <Form.Field control={Checkbox}
            label='Traveled to or lived in an area where the local, Tribal territorial, or state health department is reporting large numbers of COVID-19 cases as described in the Community Mitigation Framework'
            name='exposures'
            value='Traveled or Lived in the area with large number of COVID-19 cases'
            onChange={handleCheckbox}
          />
          <Form.Field control={Checkbox}
            label='Live in areas of high community transmission (as described in the Community Mitigation Framework) while the school remains open'
            name='exposures'
            value='Live in areas of high community transmission'
            onChange={handleCheckbox}
          />
        </Form.Group>



        <Form.Button color='green' 
        
        
        
        >Submit</Form.Button>



      </Form>
    </Container>
  );
}

export default App;
