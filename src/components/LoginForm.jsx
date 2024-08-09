import { useState } from "react"
import FormButton from "./FormButton";
import PropTypes from 'prop-types';


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=(.*[A-Z]){2,})(?=(.*[a-z]){2,})(?=(.*\d){2,})(?=(.*[\W_]){2,}).{8,}$/;



const LoginForm = ({data, saveData, saveAndNext}) => {
    const [emailId, setEmailId] = useState(data.emailId);
    const [emailIdError, setEmailIdError] = useState('');

    const [password, setPassword] = useState(data.password);
    const [passwordError, setPasswordError] = useState('')

    const handleEmailIdChange = (event) => {
        setEmailIdError('')
        setEmailId(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPasswordError('')
        setPassword(event.target.value);
    }

    const validateEmailId = () => {
        const result = emailRegex.test(emailId);
        if(!result) {
            setEmailIdError('set valid email');
        }

        return result;
    }
    const validatePassword = () => {
        const result = passwordRegex.test(password)
        if (!result) {
            setPasswordError('set valid password');
        }
        return result;
    }

    const handleSaveClicked = () => {
        const emailvalidationresult = validateEmailId();
        const passwordvalidationresult = validatePassword();

        if (!emailvalidationresult || !passwordvalidationresult) return;

        saveData({emailId, password})
    };
    const handleSaveAndNextClicked = () => {
        const emailvalidationresult = validateEmailId();
        const passwordvalidationresult = validatePassword();

        if (!emailvalidationresult || !passwordvalidationresult) return;
        saveAndNext({emailId, password})
    };
    

  return (
    <form>    
        <h2 className="text-2xl font-bold text-center mb-6">Login Form</h2>

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailId">Email ID</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             name="emailId" id="emailId" type="email" onChange={handleEmailIdChange} value={emailId} required/>
            {emailIdError && <p className="text-red-400">{emailIdError}</p>}
        </div>
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

             name="password" id="password" type="password" onChange={handlePasswordChange} value={password} required/>
            {passwordError && <p className="text-red-400">{passwordError}</p>}
        </div>
        <FormButton handleSaveClicked={handleSaveClicked} handleSaveAndNextClicked={handleSaveAndNextClicked} />
    </form>
  )
}

LoginForm.propTypes = {
    data: PropTypes.shape({
        emailId: PropTypes.string.isRequired, 
        password: PropTypes.string.isRequired, 
    }).isRequired,
    saveData: PropTypes.func.isRequired, 
    saveAndNext: PropTypes.func.isRequired,

};

export default LoginForm