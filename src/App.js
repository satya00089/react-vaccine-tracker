import { useState, useEffect } from 'react'
import './App.css';
import Email from './components/Email'
import States from './components/States'
import Districts from './components/Districts'
import Age from './components/Age'
import Pincode from './components/Pincode'

function App() {
  const [email, setEmail] = useState({value: '', touched: false, errors: {}, required: true, pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'})
  const [states, setStates] = useState([])
  const [state, setState] = useState({value: {}, touched: false, errors: {}, required: true})
  const [districts, setDistricts] = useState([])
  const [district, setDistrict] = useState({value: {}, touched: false, errors: {}, required: true})
  const [age, setAge] = useState({value: '', touched: false, errors: {}, required: true})
  const [pinCode, setPinCode] = useState({value: '', touched: false, errors: {}, required: false, pattern: '^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$'})

  const fetchStates = async () => {
    const res = await fetch('https://cdn-api.co-vin.in/api/v2/admin/location/states')
    return await res.json()
  }

  const fetchDistricts = async (id) => {
    const url = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`;
    const res = await fetch(url)
    return await res.json()
  }

  const onEmailChange = (data) => {
    setEmail({ ...email, ...data})
    setEmail((email) => {
      validate(email, 'email')
      return email;
    })
  }

  const onStateChange = async (stateId, changes) => {
    if(stateId) {
      const stateValue = states.find(state => state?.state_id == stateId)
      setState({ ...state, value: stateValue })
      const getDistricts = async () => {
        const statesFromDistricts = await fetchDistricts(stateId)
        setDistricts(statesFromDistricts['districts'])
      }
      getDistricts()
    } else {
      setState({ ...state, ...changes })
      setState((state) => {
        validate(state, 'state')
        return state;
      })
    }
  }

  const onDistrictsChange = async (districtId, changes) => {
    if(districtId) {
      const districtValue = districts.find(district => district?.district_id == districtId)
      setDistrict({ ...district, value: districtValue })
    } else {
      setDistrict({ ...district, ...changes })
      setDistrict((district) => {
        validate(district, 'district')
        return district;
      })
    }
  }

  const onAgeChange = (data) => {
    setAge({ ...age, ...data })
    setAge((age) => {
      validate(age, 'age')
      return age;
    })
  }

  const onPinCodeChange = (data) => {
    setPinCode({ ...pinCode, ...data})
    setPinCode((pinCode) => {
      validate(pinCode, 'pinCode')
      return pinCode;
    })
  }

  useEffect(() => {
    const getStates = async () => {
      const statesFromServer = await fetchStates();
      setStates(statesFromServer['states'])
    }
    getStates()
  }, [])

  const validate = (element, type) => {
    const errors = {}
    if(type === 'email') {
      if(element.required && !element.value) {
        errors.required = true;
      } else if (element.pattern) {
        const regex = new RegExp(element.pattern);
        const isValid = regex.test(element.value);
        if (!isValid) {
          errors.pattern = true;
        }
      }
      setEmail((email) => {
        setEmail({...email, errors })
        return email
      })
    } else if(type === 'state') {
      if(element.required && Object.keys(element.value).length === 0) {
        errors.required = true;
      }
      setState((state) => {
        setState({ ...state, errors })
        return state
      })
    } else if(type === 'district') {
      if(element.required && Object.keys(element.value).length === 0) {
        errors.required = true;
      }
      setDistrict((district) => {
        setDistrict({ ...district, errors })
        return district
      })
    } else if(type === 'age') {
      if(element.required && Object.keys(element.value).length === 0) {
        errors.required = true;
      }
      setAge((age) => {
        setAge({ ...age, errors })
        return age
      })
    } else if (type === 'pinCode') {
      if(element.required && Object.keys(element.value).length === 0) {
        errors.required = true;
      } else if ((!element.required && element.value) && element.pattern) {
        const regex = new RegExp(element.pattern);
        const isValid = regex.test(element.value);
        if (!isValid) {
          errors.pattern = true;
        }
      }
      setPinCode((pinCode) => {
        setPinCode({ ...pinCode, errors })
        return setPinCode
      })
    }
  }

  const submit = () => {
    validate(email, 'email')
    validate(state, 'state')
    validate(district, 'district')
    validate(age, 'age')
    validate(pinCode, 'pinCode')
    if(Object.keys(email.errors).length > 0 || Object.keys(state.errors).length > 0 || Object.keys(district.errors).length > 0 || Object.keys(age.errors).length > 0 || Object.keys(pinCode.errors).length > 0) {
      return
    } else {
      const data = {
        email: email.value,
        state: state.value,
        district: district.value,
        age: age.value,
        pincode: pinCode.value
      }
      console.log(data)
    }
  }

  return (
    <div>
      <div className="container-fluid user-form-box">
        <div className="row justify-content-md-center">
          <div className="col-sm-12 col-md-8 col-lg-4 form-box">
            <div className="row mb-1">
              <h4 className="text-center fw-bold">User Info.</h4>
            </div>
            <Email email={email} onEmailChange={onEmailChange} validate={validate} />
            <div className="row mb-1">
              <States state={state} states={states} onStateChange={onStateChange} />
              <Districts district={district} districts={districts} onDistrictsChange={onDistrictsChange} />
            </div>
            <div className="row mb-1">
              <Age age={age} onAgeChange={onAgeChange} />
              <Pincode pinCode={pinCode} onPinCodeChange={onPinCodeChange} />
            </div>
            <div className="row mt-3">
              <div className="d-grid gap-2">
                <button type="button" onClick={submit} className="btn btn-outline-success btn-block">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
