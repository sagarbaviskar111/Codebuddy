import PropTypes from 'prop-types';
const FormButton = ({handleBackClicked, handleSaveClicked, handleSaveAndNextClicked}) => {
  return (
        <div className="flex flex-col sm:flex-row justify-between space-y-3 py-4 sm:space-y-0 sm:space-x-3">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600" type="button" disabled={!handleBackClicked} onClick={handleBackClicked}>Back</button>
            <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600" type="button" disabled={!handleSaveClicked} onClick={handleSaveClicked}>Save</button>
            <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600" type="button" disabled={!handleSaveAndNextClicked} onClick={handleSaveAndNextClicked}>Save and Next</button>
        </div>
    
  )
}

FormButton.propTypes = {
  handleBackClicked: PropTypes.func.isRequired, 
  handleSaveClicked: PropTypes.func.isRequired, 
  handleSaveAndNextClicked: PropTypes.func.isRequired, 
};

export default FormButton