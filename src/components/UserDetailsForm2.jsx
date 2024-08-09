import { useState } from 'react';
import FormButton from './FormButton';
import PropTypes from 'prop-types';

const phoneNumberRegex = /^\d{10}$/;

const UserDetailsForm2 = ({ data, saveData,handleSubmit, goBack }) => {

  const [countryCode, setCountryCode] = useState(data.countryCode);
  const [countryCodeError, setCountryCodeError] = useState('');

  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
  const [phoneNumberErrror, setPhoneNumberErrror] = useState('');

  const [acceptTermsAndCondition, setAcceptTermsAndCondition] = useState(data.acceptTermsAndCondition);
  const [acceptTermsAndConditionError, setAcceptTermsAndConditionError] = useState('');


  const handleContryCodeChange = (event) => {
    setCountryCodeError('');
    setCountryCode(event.target.value);
  }

  const handlePhoneNUmber = (event) => {
    setPhoneNumberErrror('')
    setPhoneNumber(event.target.value);
  }

  const handleAcceptTermsAndCondition = (event) => {
    setAcceptTermsAndConditionError(false)
    setAcceptTermsAndCondition(event.target.checked);
  }

  const validateCountryCode = () => {
    const result = countryCode && (countryCode === '+91' || countryCode === '+1');
    if (!result) {
      setCountryCodeError('set valid country code');
    }

    return result;
  }

  const validatePhoneNumber = () => {
    const result = phoneNumberRegex.test(phoneNumber);

    if (!result) {
      setPhoneNumberErrror('set valid phone number');
    }

    return result;
  }

  const validateAcceptTermsAndCondition = () => {
    const result = acceptTermsAndCondition;
    if (!result) {
      setAcceptTermsAndConditionError('please check this box');
    }

    return result;
  }

  const handleSaveClicked = () => {
    const countryCodeValidationResult = validateCountryCode();
    const phoneNumberValidationResult = validatePhoneNumber();
    const acceptTermsAndConditionValidationResult = validateAcceptTermsAndCondition();

    console.log(countryCodeValidationResult,phoneNumberValidationResult,acceptTermsAndConditionValidationResult)
    if (!countryCodeValidationResult || !phoneNumberValidationResult || !acceptTermsAndConditionValidationResult) return;

    saveData({ countryCode, phoneNumber, acceptTermsAndCondition })
   
    setTimeout(() => {
      handleSubmit()
    }, 100);
  };

  return (
    <form>
      <h2 className="text-2xl font-bold text-center mb-6">Form 2</h2>
      <div className="mb-4">
        <label className='"block text-gray-700 text-sm font-bold mb-2' htmlFor="countryCode"> Phone Number
        </label>
        <div className='flex'>
          <select
            name='countryCode'
            id='countryCode'
            className="border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={countryCode}
            onChange={handleContryCodeChange}
            required
          >
            <option value="">Please Select</option>
            <option value="+91">India (+91)</option>
            <option value="+1">America (+1)</option>
          </select>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="phoneNumber" id="phoneNumber" type="text" onChange={handlePhoneNUmber} value={phoneNumber} />
        </div>
        {countryCodeError && <p className="text-red-400">{countryCodeError}</p>}
        {phoneNumberErrror && <p className="text-red-400">{phoneNumberErrror}</p>}
      </div>

      <div className='mb-6'>
        <label className='class="inline-flex items-center"' htmlFor="acceptTermsAndCondition">
          <input
            className="form-checkbox h-5 w-5 text-blue-600 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            name="acceptTermsAndCondition" id="acceptTermsAndCondition" type="checkbox" onChange={handleAcceptTermsAndCondition} value={acceptTermsAndCondition} required />
          <span className="ml-2 text-gray-700"> Accept Term and Condition</span>
        </label>
        {acceptTermsAndConditionError && <p className="text-red-400">{acceptTermsAndConditionError}</p>}
      </div>
      <FormButton handleSaveClicked={handleSaveClicked} handleBackClicked={goBack} />
    </form>
  )
};

UserDetailsForm2.propTypes = {
  data: PropTypes.shape({
    countryCode: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    acceptTermsAndCondition: PropTypes.string,
  }).isRequired,
  saveData: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  handleSubmit:PropTypes.func.isRequired,
};

export default UserDetailsForm2;