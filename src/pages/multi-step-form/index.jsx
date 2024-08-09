import { useEffect, useState } from "react"
import LoginForm from "../../components/LoginForm";
import UserDetailsForm1 from "../../components/UserDetailsForm1";
import UserDetailsForm2 from "../../components/UserDetailsForm2";
import { useNavigate } from "react-router-dom";

const MultiStepForm = () => {
  const [currentForm, setCurrentForm] = useState(0);
  const [savedForms, setSavedForms] = useState(0);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phoneNumber: ""
  })

  useEffect(() => {
    console.log(formData)
  }, [formData]);

  const saveAndNext = (data) => {

    saveData(data);

    if (currentForm === savedForms) {
      setCurrentForm(currentForm + 1);
      setSavedForms(savedForms + 1);
    } else {
      setCurrentForm(savedForms);
    }
  }

  const saveData = (data) => {
    const newFormData = { ...formData, ...data }
    setFormData(newFormData);
    if (currentForm === 2) {
      // submit data
      console.log("now you should submit data");
      console.log(newFormData)
    }
  }

  const goBack = () => {
    if (currentForm > 0) {
      setCurrentForm(currentForm - 1);
    }
  }


  const handleSubmit = async () => {
    const { acceptTermsAndCondition, ...dataToSubmit } = formData;
    if (acceptTermsAndCondition) {
      try {
        const response = await fetch('https://codebuddy.review/submit', {
          method: 'POST',
          headers: {
            
          },
          body: JSON.stringify(dataToSubmit),
        });

        if (response) {
          const responseData = await response.json();
          console.log('Data submitted successfully:', responseData);
          alert("Data submitted successfully")
          navigate('/posts')

        } else {
          console.error('Failed to submit data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }

  };


  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">

        {currentForm === 0 && <LoginForm data={{ emailId: formData.emailId, password: formData.password }} saveData={saveData} saveAndNext={saveAndNext} />}
        {currentForm === 1 && <UserDetailsForm1 data={{ firstName: formData.firstName, lastName: formData.lastName, address: formData.address }} saveData={saveData} saveAndNext={saveAndNext} goBack={goBack} />}
        {currentForm === 2 && <UserDetailsForm2 data={{ countryCode: formData.countryCode, phoneNumber: formData.phoneNumber }} saveData={saveData} handleSubmit={handleSubmit} goBack={goBack} />}
      </div>

    </div>
  )
}

export default MultiStepForm