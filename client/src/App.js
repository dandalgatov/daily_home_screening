import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";
// import 'react-phone-input-2/lib/semantic-ui.css'
// import PhoneInput from 'react-phone-input-2'
// import InputMask from "react-input-mask";
import MaskedInput from "react-input-mask";

import { Form, Container, Checkbox, Modal, Button } from 'semantic-ui-react'

function App(props) {
  //Hooks
  const { register, handleSubmit, watch, errors } = useForm();

  //Data Section
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    otherRole: '',
    group: '',
    phoneNumber: '',
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

//Functionality Section
  
  const handleChange = (e, data) => {
    console.log(data)
    setFormData({
      ...formData,
      [data.name]: data.value
    })
  }

  const handlePhoneChange = (e, data) => {
    // const value = e.target.value;
    // console.log(value)
    // console.log(data)
    // console.log(e)
    // setFormData({
    //   ...formData,
    //   [data.name]: data.value
    // })
  }

  const handleCheckbox = (e, data) => {
    const currentValue = formData[data.name][data.value]
    formData[data.name][data.value] = !currentValue
    setFormData({ ...formData })
  }

  const submitForm = () => {
    if (formData.firstName && formData.lastName && formData.role && formData.phoneNumber) {
      axios.post('https://rocky-falls-55370.herokuapp.com/send', formData)
      setFormSubmitted(true)
    }
  }

  const onSubmit = data => console.log(data);

//Page Render
  return (
    <Container>
      {/* Title */}
      <img src='/logoRCSeng.svg' alt="" style={{ width: '50%' }} />
      <h2>{`Daily Health Check Questionnaire - ${formData.date}`}<br />
      <i>Please complete every morning or afternoon before departing for the studio</i></h2>

      <Form>
        {/* 1st Row */}
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
            label='Role'
            placeholder='Role'
            name='role'
            options={roleOptions}
            onChange={handleChange}
          />
        </Form.Group>
        {/* Optional "Other" section based on above "Role" selector */}
        {formData.role === 'other' ?
          <Form.Input
            fluid required
            label='Other:'
            placeholder='Please Specify'
            name='otherRole'
            onChange={handleChange}
          /> : ''
        }
        {/* 2nd Row */}
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
          {/* <Form.Input as={InputMask}
            fluid require
            type='tel'
            mask="999.999.999-99"
            label='Telephone Number (XXX-XXX-XXXX)'
            placeholder='XXX-XXX-XXXX'
            name='phoneNumber'
            onChange={handleChange} /> */}
          {/* <Form.Field >
            <MaskedInput
              label='r'
              mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Form.Field> */}

          {/* <Form.Input
            fluid required
            control={PhoneInput}
            label='Telephone Number'
            name='phoneNumber'
            onChange={handleChange}

          /> */}
          <MaskedInput required
            // value={formData.phoneNumber}
            name="phoneNumber"
            label='Phone Number'
            // inputRef={register({
            //   validate: {
            //     inputTelRequired: isNotFilledTel
            //   }
            // })}
            mask='(999) 999-9999'
            // alwaysShowMask
            placeholder='(999) 999-9999'
            onChange={(e) => setFormData({
                ...formData,
                phoneNumber: e.target.value
              })}
            // value={props.value}
          >
            <Form.Input type="tel" autoComplete="tel-national" />
          </MaskedInput>
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
        <Modal
          open={formSubmitted}
          header='Thank you'
          content='Your response has been sent.'
          action={<Button color='black' >Test</Button>}
        />
      </Form>
    </Container>
  );
}

export default App;
