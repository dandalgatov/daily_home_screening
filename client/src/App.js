import React, { useState } from 'react'
import axios from 'axios'
import {
  Form,
  Container,
  Checkbox
} from 'semantic-ui-react'

function App() {


  const submitForm = () => {
    if (formData.firstName && formData.lastName && formData.role && formData.phoneNumber) {
      axios.post('https://rocky-falls-55370.herokuapp.com/send', formData)
    setFormSubmitted(true)
    }
    

  }

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    otherRole: '',
    phoneNumber: '',
    group: '',
    symptoms: {
      highTemperature: false,
      soreThroat: false,
      uncontrolledCough: false,
      diarrheaVomitingAbdominalPain: false,
      headachesMuscleaches: false,
      lossTasteSmell: false,
    },
    exposures: {
      covidContact: false,
      exposureCovidArea: false,
      communityTransmission: false,
    },
    date: new Date().toLocaleDateString(),
    signature: '',
  })


  const handleChange = (e, data) => {
    setFormData({
      ...formData,
      [data.name]: data.value
    })
  }

  const handleCheckbox = (e, data) => {
    const currentValue = formData[data.name][data.value]
    formData[data.name][data.value] = !currentValue
    setFormData({ ...formData })
  }



  const roleOptions = [
    { key: 's', text: 'Student', value: 'student' },
    { key: 't', text: 'Teacher', value: 'teacher' },
    { key: 'a', text: 'Assistant', value: 'assistant' },
    { key: 'c', text: 'Caregiver', value: 'caregiver' },
    { key: 'o', text: 'Other', value: 'other' },
  ]

  const groupOptions = [
    { key: 'sk', text: 'Solnyshki', value: 'Solnyshki' },
    { key: 'si', text: 'Oduvanchiki', value: 'Oduvanchiki' },
    { key: 'vp', text: 'Vinni-Pukhi', value: 'Vinni-Pukhi' },
    { key: '145', text: 'JLP 145', value: 'JLP145' },
    { key: 'jlp', text: 'JLP', value: 'JLP' },
    { key: 'mb', text: 'Matroskiny/Barboskiny', value: 'Matroskiny/Barboskini' },
    { key: 'ms', text: 'Moomintrolli/Snusmumriki', value: 'Mummi/Snusmumriki' },
    { key: 'pf', text: 'Petsony/Findusy', value: 'Petsoni/Findusi' },
  ]




  return (
    <Container>
      <img src='/logoRCSeng.svg' alt="" style={{ width: '50%' }} />
    
        <h2>
          {`Daily Health Check Questionnaire - ${formData.date}`}<br />
          <i>Please complete every morning or afternoon before departing for the studio</i>
        </h2>

        <Form>

          <Form.Group widths='equal'>
            <Form.Input fluid required
              // error={true}
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
              label='Role'
              placeholder='Role'
              name='role'
              options={roleOptions}
              onChange={handleChange}
            />
          </Form.Group>
          {formData.role === 'other' ?
            <Form.Input
              fluid required
              label='Other:'
              placeholder='Please Specify'
              name='otherRole'
              onChange={handleChange}
            /> : ''}

          <Form.Group widths='equal'>
            {formData.role === 'other' ?
              <Form.Select fluid
                label='Group'
                placeholder='Group'
                name='group'
                options={groupOptions}
                onChange={handleChange}
              /> :
              <Form.Select fluid required
                label='Group'
                placeholder='Group'
                name='group'
                options={groupOptions}
                onChange={handleChange}
              />}
            <Form.Input fluid required
              type='tel'
              pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
              label='Telephone Number (XXX-XXX-XXXX)'
              placeholder='XXX-XXX-XXXX'
              name='phoneNumber'
              onChange={handleChange} />
          </Form.Group>

          <h3>SECTION 1: Symptoms</h3>
          <p>Below is the list of COVD-19 symptoms as specified by the CDC.
          Please check all that apply to you, if you are filling in the form for yourself,
        or to your child.</p>
          <Form.Group grouped>
            <Form.Field control={Checkbox}
              label='Temperature 100.0° F (37.7° C) or higher when taken by mouth'
              name='symptoms'
              value='highTemperature'
              onChange={handleCheckbox}
            />
            <Form.Field control={Checkbox}
              label='Sore throat'
              name='symptoms'
              value='soreThroat'
              onChange={handleCheckbox}
            />
            <Form.Field control={Checkbox}
              label='New uncontrolled cough that causes difficulty breathing (for students with chronic allergic/asthmatic cough, a change in their cough from baseline)'
              name='symptoms'
              value='uncontrolledCough'
              onChange={handleCheckbox}
            />
            <Form.Field control={Checkbox}
              label='Diarrhea, vomiting, or abdominal pain'
              name='symptoms'
              value='diarrheaVomitingAbdominalPain'
              onChange={handleCheckbox}
            />
            <Form.Field control={Checkbox}
              label='New onset of severe headaches, and muscle aches'
              name='symptoms'
              value='headachesMuscleaches'
              onChange={handleCheckbox}
            />
            <Form.Field control={Checkbox}
              label='New loss of taste or smell'
              name='symptoms'
              value='lossTasteSmell'
              onChange={handleCheckbox}
            />
          </Form.Group>


          <h3>SECTION 2: Close Contact/Potential Exposure</h3>
          <p>Please check all that apply.</p>
          <Form.Group grouped>
            <Form.Field control={Checkbox}
              label='You or your child had close contact (within 6 feet of an infected person for at least 15 minutes) with a person with confirmed COVID-19.'
              name='exposures'
              value='covidContact'
              onChange={handleCheckbox}
            />
            <Form.Field control={Checkbox}
              label='You or your child traveled to or lived in an area where the local, Tribal, territorial, or state health department is reporting large numbers of COVID-19 cases as described in the Community Mitigation Framework.'
              name='exposures'
              value='exposureCovidArea'
              onChange={handleCheckbox}
            />
            <Form.Field control={Checkbox}
              label='You or your child live in areas of high community transmission (as described in the Community Mitigation Framework) while the school remains open.'
              name='exposures'
              value='communityTransmission'
              onChange={handleCheckbox}
            />
          </Form.Group>

          <h3>Signature {formData.date}</h3>
          <Form.Input fluid required
            label='I hereby confirm that all the information provided in this form is correct.'
            placeholder='Please enter your full name'
            name='signature'
            onChange={handleChange} />







          <Form.Button
            color='green'
            onClick={submitForm}
            content='Submit'
          />


      </Form>
      {formSubmitted ?
        <h2>Thank you for submitting the formData</h2> : ''}

    </Container>
  );
}

export default App;
