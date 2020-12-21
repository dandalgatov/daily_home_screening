import React, { useState } from 'react'
import qs from 'qs'
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

    s1: {
      value: false,
      label: 'Temperature 100.0° F (37.7° C) or higher when taken by mouth'
    },
    s2: {
      value: false,
      label: 'Sore throat'
    },
    s3: {
      value: false,
      label: 'New uncontrolled cough that causes difficulty breathing (for students with chronic allergic/asthmatic cough, a change in their cough from baseline)'
    },
    s4: {
      value: false,
      label: 'Diarrhea, vomiting, or abdominal pain'
    },
    s5: {
      value: false,
      label: 'New onset of severe headaches, and muscle aches'
    },
    s6: {
      value: false,
      label: 'New loss of taste or smell'
    },
    sCustom: [],
    e1: {
      value: false,
      label: 'You or your child had close contact (within 6 feet of an infected person for at least 15 minutes) with a person with confirmed COVID-19.'
    },
    e2: {
      value: false,
      label: 'You or your child traveled to or lived in an area where the local, Tribal, territorial, or state health department is reporting large numbers of COVID-19 cases as described in the Community Mitigation Framework.'
    },
    e3: {
      value: false,
      label: 'You or your child live in areas of high community transmission (as described in the Community Mitigation Framework) while the school remains open.'
    },
    eCustom: [],

  })

  //Dropdown Options
  const roleOptions = [
    { key: 's', text: 'Student', value: 'Student' },
    { key: 't', text: 'Teacher', value: 'Teacher' },
    { key: 'a', text: 'Assistant', value: 'Assistant' },
    { key: 'c', text: 'Caregiver', value: 'Caregiver' },
    { key: 'admin', text: 'Admin', value: 'Admin' },
    { key: 'o', text: 'Other', value: '__other_option__' },
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
    if (name === 'symptom-checkbox') {
      const formDataCopy = { ...formData }
      formDataCopy[value].value = !formDataCopy[value].value
      formDataCopy[value].value ?
        formDataCopy.sCustom.push(formDataCopy[value].label) :
        formDataCopy.sCustom = formDataCopy.sCustom.filter(e => e !== formDataCopy[value].label) 
      setFormData(formDataCopy)
    } else if (name === 'exposure-checkbox'){
      const formDataCopy = { ...formData }
      formDataCopy[value].value = !formDataCopy[value].value
      formDataCopy[value].value ?
        formDataCopy.eCustom.push(formDataCopy[value].label) :
        formDataCopy.eCustom = formDataCopy.eCustom.filter(e => e !== formDataCopy[value].label) 
      setFormData(formDataCopy)
    } else {
      if (name === 'phoneNumber' && value[13] === '_') {
        invalidValue = true
      } else if (value.length < 1) {
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
    const admin = formDataCopy.role.value === 'Admin'
    const other = formDataCopy.role.value === '__other_option__'

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
      // axios.post('https://rocky-falls-55370.herokuapp.com/send', formDataCopy)
      sendForm()
      setFormError(false)
      setFormSubmitted(true)
    } else setFormError(true)
  }


  const sendForm = () => {
    console.log('sending')

    const data = qs.stringify({
      'entry.1110557098': `${formData.firstName.value}`,
      'entry.1857082831': `${formData.lastName.value}`,
      'entry.1397485794': `${formData.phoneNumber.value ? formData.phoneNumber.value : 'NO PHONE #'}`,
      'entry.2083580280': `${formData.signature.value}`,
      'entry.1542846730': `${formData.role.value}`,
      'entry.1542846730.other_option_response': `${formData.otherRole.value && formData.otherRole.value}`,
      'entry.406890529': `${formData.group.value ? formData.group.value : 'NOT PART OF GROUP'}`,
      'entry.140778478': `${formData.sCustom ? formData.sCustom.join(", ") : 'SYMPTOMS CLEAR'}`,
      'entry.1008300474': `${formData.eCustom ? formData.eCustom.join(", ") : 'EXPOSURES CLEAR'}`,
    });

    const PROXY = 'https://cors-anywhere.herokuapp.com/'
    const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc1I_VgOZsdk0JbFIP6G7MKGU0GWnn2yYEVVZzaUZmQ4qRjcQ/formResponse'

    const config = {
      method: 'post',
      url: `${PROXY}${GOOGLE_FORM_ACTION}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
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
        {formData.role.value === 'Admin' ? '' : // If admin, no need for group or phone number
          <Form.Group widths='equal'>
            {formData.role.value === '__other_option__' ? // If role is other, swap group input to otherRole input
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
            label={formData.s1.label}
            name='symptom-checkbox'
            value='s1'
            onChange={handleChange}
          />
          <Form.Field control={Checkbox}
            label={formData.s2.label}
            name='symptom-checkbox'
            value='s2'
            onChange={handleChange}
          />
          <Form.Field control={Checkbox}
            label={formData.s3.label}
            name='symptom-checkbox'
            value='s3'
            onChange={handleChange}
          />
          <Form.Field control={Checkbox}
            label={formData.s4.label}
            name='symptom-checkbox'
            value='s4'
            onChange={handleChange}
          />
          <Form.Field control={Checkbox}
            label={formData.s5.label}
            name='symptom-checkbox'
            value='s5'
            onChange={handleChange}
          />
          <Form.Field control={Checkbox}
            label={formData.s6.label}
            name='symptom-checkbox'
            value='s6'
            onChange={handleChange}
          />
        </Form.Group>

        <h3>SECTION 2: Close Contact/Potential Exposure</h3>
        <p>Please check all that apply.</p>
        <Form.Group grouped>
          <Form.Field control={Checkbox}
            label={formData.e1.label}
            name='exposure-checkbox'
            value='e1'
            onChange={handleChange}
          />
          <Form.Field control={Checkbox}
            label={formData.e2.label}
            name='exposure-checkbox'
            value='e2'
            onChange={handleChange}
          />
          <Form.Field control={Checkbox}
            label={formData.e3.label}
            name='exposure-checkbox'
            value='e3'
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
          } : false}
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