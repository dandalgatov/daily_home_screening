import React, { useState } from 'react'
import axios from 'axios'
import MaskedInput from "react-input-mask";
import { Header, Form, Container, Checkbox, Modal, Button } from 'semantic-ui-react'

function App(props) {

  //Hooks
  const [formError, setFormError] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: {
      value: '',
      error: false,
    },
    lastName: {
      value: '',
      error: false,
    },
    role: {
      value: '',
      error: false,
    },
    otherRole: {
      value: '',
      error: false,
    },
    group: {
      value: '',
      error: false,
    },
    phoneNumber: {
      value: '',
      error: false,
    },
    signature: {
      value: '',
      error: false,
    },
    date: new Date().toLocaleDateString(),
    flags: {
      highTemperature: false,
      soreThroat: false,
      uncontrolledCough: false,
      diarrheaVomitingAbdominalPain: false,
      headachesMuscleaches: false,
      lossTasteSmell: false,
      covidContact: false,
      exposureCovidArea: false,
      communityTransmission: false,
    },
  })

  //Dropdown Options
  const roleOptions = [
    { key: 's', text: 'Student', value: 'student' },
    { key: 't', text: 'Teacher', value: 'teacher' },
    { key: 'a', text: 'Assistant', value: 'assistant' },
    { key: 'c', text: 'Caregiver', value: 'caregiver' },
    { key: 'admin', text: 'Admin', value: 'admin' },
    { key: 'o', text: 'Other', value: 'other' },
  ]

  const groupOptions = [
    { key: 'sk', text: 'Solnyshki', value: 'Solnyshki' },
    { key: 'si', text: 'Oduvanchiki', value: 'Oduvanchiki' },
    { key: '145', text: 'JLP 145', value: 'JLP145' },
    { key: 'jlp', text: 'JLP', value: 'JLP' },
    { key: 'mb', text: 'Matroskiny/Barboskiny', value: 'Matroskiny/Barboskini' },
    { key: 'ms', text: 'Moomintrolli/Snusmumriki', value: 'Mummi/Snusmumriki' },
    { key: 'pf', text: 'Petsony/Findusy', value: 'Petsoni/Findusi' },
  ]

  //Functionality 

  const handleChange = (e, data) => {
    const { name, value } = data || e.target
    let invalidValue = false
    if (name === 'flags') {
      const formDataCopy = { ...formData }
      formDataCopy.flags[value] = !formDataCopy.flags[value]
      setFormData(formDataCopy)
    } else {
      if (name === 'phoneNumber' && value[13] === '_' ) {
        invalidValue = true
      } else if (value.length < 1){
        invalidValue = true
      }
      setFormData({
        ...formData,
        [name]: {
          value: value,
          error: invalidValue,
        }
      })
    }
  }


  const submitForm = () => {

    const formDataCopy = { ...formData }
    const { firstName, lastName, role, otherRole, group, phoneNumber, signature } = formDataCopy
    const admin = formDataCopy.role.value === 'admin'
    const other = formDataCopy.role.value === 'other'

    if (!firstName.value) formDataCopy.firstName.error = true
    if (!lastName.value) formDataCopy.lastName.error = true
    if (!role.value) formDataCopy.role.error = true
    if (!other) { formDataCopy.otherRole.error = false }
    else if (!otherRole.value) { formDataCopy.otherRole.error = true }
    if (other || admin) { formDataCopy.group.error = false }
    else if (group.value === '') { formDataCopy.group.error = true }
    if (admin) { formDataCopy.phoneNumber.error = false }
    else if (!phoneNumber.value) { formDataCopy.phoneNumber.error = true }
    if (!signature.value) formDataCopy.signature.error = true
    setFormData(formDataCopy)

    if (!firstName.error
      && !lastName.error
      && !role.error
      && !otherRole.error
      && !group.error
      && !phoneNumber.error
      && !signature.error) {
      console.log(formDataCopy)
      axios.post('https://rocky-falls-55370.herokuapp.com/send', formDataCopy)
      setFormError(false)
      setFormSubmitted(true)
    } else  setFormError(true) 
  }


  //Page Render
  return (
    <Container>
      {/* Title */}
      <img src='/logoRCSeng.svg' alt="" style={{ width: '50%' }} />
      <h2>{`Daily Health Check Questionnaire - ${formData.date}`}<br />
        <i>Please complete every morning or afternoon before departing for the studio</i></h2>

      <Form noValidate="novalidate">

        {/* 1st Row */}
        <Form.Group widths='equal' id="form_start">
          <Form.Input fluid required
            label='First name'
            placeholder='First name'
            name='firstName'
            onChange={handleChange}
            error={formData.firstName.error ? true : false}
          />
          <Form.Input fluid required
            label='Last name'
            placeholder='Last name'
            name='lastName'
            onChange={handleChange}
            error={formData.lastName.error ? true : false}
          />
          <Form.Select fluid required
            label='Role'
            placeholder='Role'
            name='role'
            options={roleOptions}
            onChange={handleChange}
            error={formData.role.error ? true : false}
          />
        </Form.Group>

        {/* 2nd Row */}
        {formData.role.value === 'admin' ? '' : // If admin, no need for group or phone number
          <Form.Group widths='equal'>
            {formData.role.value === 'other' ? // If role is other, swap group input to otherRole input
              <Form.Input
                fluid required
                label='Other:'
                placeholder='Please Specify'
                name='otherRole'
                onChange={handleChange}
                error={formData.otherRole.error ? true : false}
              /> :
              <Form.Select fluid required
                label='Group'
                placeholder='Group'
                name='group'
                value={formData.Group}
                options={groupOptions}
                onChange={handleChange}
                error={formData.group.error ? true : false}
              />
            }
            <MaskedInput required
              name="phoneNumber"
              label='Phone Number'
              mask='(999) 999-9999'
              placeholder='(999) 999-9999'
              onChange={handleChange}
              error={formData.phoneNumber.error ? true : false}
            >
              <Form.Input type="tel" autoComplete="tel-national" />
            </MaskedInput>
          </Form.Group>
        }

        <h3>SECTION 1: Symptoms</h3>
        <p>Below is the list of COVD-19 symptoms as specified by the CDC.
        Please check all that apply to you, if you are filling in the form for yourself,
        or to your child.</p>
        <Form.Group grouped>
          <Form.Field control={Checkbox}
            label='Temperature 100.0° F (37.7° C) or higher when taken by mouth'
            name='flags'
            value='highTemperature'
            onChange={handleChange}
          />
          <Form.Field control={Checkbox}
            label='Sore throat'
            name='flags'
            value='soreThroat'
            onChange={handleChange}
          />
          <Form.Field control={Checkbox}
            label='New uncontrolled cough that causes difficulty breathing (for students with chronic allergic/asthmatic cough, a change in their cough from baseline)'
            name='flags'
            value='uncontrolledCough'
            onChange={handleChange}
          />
          <Form.Field control={Checkbox}
            label='Diarrhea, vomiting, or abdominal pain'
            name='flags'
            value='diarrheaVomitingAbdominalPain'
            onChange={handleChange}
          />
          <Form.Field control={Checkbox}
            label='New onset of severe headaches, and muscle aches'
            name='flags'
            value='headachesMuscleaches'
            onChange={handleChange}
          />
          <Form.Field control={Checkbox}
            label='New loss of taste or smell'
            name='flags'
            value='lossTasteSmell'
            onChange={handleChange}
          />
        </Form.Group>

        <h3>SECTION 2: Close Contact/Potential Exposure</h3>
        <p>Please check all that apply.</p>
        <Form.Group grouped>
          <Form.Field control={Checkbox}
            label='You or your child had close contact (within 6 feet of an infected person for at least 15 minutes) with a person with confirmed COVID-19.'
            name='flags'
            value='covidContact'
            onChange={handleChange}
          />
          <Form.Field control={Checkbox}
            label='You or your child traveled to or lived in an area where the local, Tribal, territorial, or state health department is reporting large numbers of COVID-19 cases as described in the Community Mitigation Framework.'
            name='flags'
            value='exposureCovidArea'
            onChange={handleChange}
          />
          <Form.Field control={Checkbox}
            label='You or your child live in areas of high community transmission (as described in the Community Mitigation Framework) while the school remains open.'
            name='flags'
            value='communityTransmission'
            onChange={handleChange}
          />
        </Form.Group>

        <h3>Signature {formData.date}</h3>
        <Form.Input fluid required
          label='I hereby confirm that all the information provided in this form is correct.'
          placeholder='Please enter your full name'
          name='signature'
          onChange={handleChange}
          error={formData.signature.error ? true : false}
        />

        <Form.Button
          color='green'
          onClick={submitForm}
          content='Submit'
          error={formError ? {
            content: 'Fill out all the required fields and try again.',
            pointing: 'left',
          } : false }
        />
        <Modal open={formSubmitted}>
          <Header icon='checked calendar' content='Thank You!' />
          <Modal.Content><p>
            Your response has been sent. Would you like to fill out another one?
          </p></Modal.Content>
          <Modal.Actions>
            <Button color='green' content='New Form' icon='undo'
              onClick={() => {
                window.location.reload(false)
                window.scrollTo(0, 0)
              }}
            />
          </Modal.Actions>
        </Modal>
      </Form>
    </Container>
  );
}
export default App;