import {useState} from 'react'
import FormButton from './FormButton'
import PropTypes from 'prop-types';

const firstNameRegex = /^[A-Za-z]{2,50}$/;
const lastNameRegex = /^[A-Za-z]$/;


const UserDetailsForm1 = ({data, saveData, saveAndNext, goBack}) => {

  const [firstName, setFirstName] = useState(data.firstName);
  const [firstNameError, setFirstNameError] = useState('');

  const [lastName, setLastName] = useState(data.lastName)
  const [lastNameError, setLastNameError] = useState('')

  const [address, setAddress] = useState(data.address)
  const [addressError, setAddressError] = useState('')

  const handleFirstNameChange = (event) => {
    setFirstNameError('')
    setFirstName(event.target.value);
}

const handleLastNameChange = (event) => {
    setLastNameError('')
    setLastName(event.target.value);
}

const handleAddressChange = (event) => {
  setAddressError('')
  setAddress(event.target.value);
}

const validateFirstName = () => {
    const result = firstNameRegex.test(firstName);
    if(!result) {
        setFirstNameError('set valid first name');
    }

    return result;
}
const validateLastName = () => {
  const result = lastNameRegex.test(lastName);
  if (!result) {
        setLastNameError('set valid last name');
    }

    return result;
}

const validateAddress = () => {
  const result = address?.length >= 10;
  if (!result) {
      setLastNameError('set valid address');
  }
  return result;
}

const handleSaveClicked = () => {
    const firstNameValidationResult = validateFirstName();
    const lastNameValidationResult = validateLastName();
    const addressValidationResult = validateAddress();

    if (!firstNameValidationResult || !lastNameValidationResult || !addressValidationResult) return;

    saveData({firstName, lastName , address})
};
const handleSaveAndNextClicked = () => {
  validateFirstName();
  validateLastName();
  validateAddress();

  if (firstNameError || lastNameError || addressError) return;
  saveAndNext({firstName, lastName , address})
};

  return (
    <form>
              <h2 className="text-2xl font-bold text-center mb-6">Form 1</h2>

    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name</label>
        <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="firstName" id="firstName" type="text" onChange={handleFirstNameChange} value={firstName} required/>
        {firstNameError && <p className="text-red-400">{firstNameError}</p>}
    </div>
    <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name</label>
        <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="lastName" id="lastName" type="text" onChange={handleLastNameChange} value={lastName} />
        {lastNameError && <p className="text-red-400">{lastNameError}</p>}
    </div>
    <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
        <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="address" id="address" type="text" onChange={handleAddressChange} value={address} required/>
        {addressError && <p className="text-red-400">{addressError}</p>}
    </div>
    <FormButton handleSaveClicked={handleSaveClicked} handleSaveAndNextClicked={handleSaveAndNextClicked} handleBackClicked={goBack}/>
</form>
  )
}

UserDetailsForm1.propTypes = {
  data: PropTypes.shape({
      firstName: PropTypes.string.isRequired, 
      lastName: PropTypes.string.isRequired, 
      address: PropTypes.string.isRequired, 

  }).isRequired,
  saveData: PropTypes.func.isRequired, 
  goBack: PropTypes.func.isRequired, 
  saveAndNext: PropTypes.func.isRequired,  
};

export default UserDetailsForm1