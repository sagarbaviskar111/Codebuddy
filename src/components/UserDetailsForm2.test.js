import { render, screen, fireEvent } from '@testing-library/react';
import UserDetailsForm2 from './UserDetailsForm2';

jest.mock('./FormButton', () => ({ handleSaveClicked, handleBackClicked }) => (
  <div>
    <button onClick={handleSaveClicked}>Save</button>
    <button onClick={handleBackClicked}>Back</button>
  </div>
));

describe('UserDetailsForm2 Component', () => {
  const mockData = {
    countryCode: '+91',
    phoneNumber: '9876543210',
    acceptTermsAndCondition: true,
  };

  const mockSaveData = jest.fn();
  const mockGoBack = jest.fn();
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    render(
      <UserDetailsForm2
        data={mockData}
        saveData={mockSaveData}
        goBack={mockGoBack}
        handleSubmit={mockHandleSubmit}
      />
    );
  });

  it('renders the form with pre-filled data', () => {
    expect(screen.getByLabelText(/Phone Number/i).value).toBe(mockData.phoneNumber);
    expect(screen.getByDisplayValue(mockData.countryCode)).toBeInTheDocument();
    expect(screen.getByLabelText(/Accept Term and Condition/i).checked).toBe(true);
  });

  it('validates country code and displays error message', () => {
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '' } });
    fireEvent.click(screen.getByText(/Save/i));

    expect(screen.getByText(/set valid country code/i)).toBeInTheDocument();
  });

  it('validates phone number and displays error message', () => {
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '98765' } });
    fireEvent.click(screen.getByText(/Save/i));

    expect(screen.getByText(/set valid phone number/i)).toBeInTheDocument();
  });

  it('validates acceptance of terms and conditions and displays error message', () => {
    fireEvent.click(screen.getByLabelText(/Accept Term and Condition/i));
    fireEvent.click(screen.getByText(/Save/i));

    expect(screen.getByText(/please check this box/i)).toBeInTheDocument();
  });

  it('calls saveData and handleSubmit with valid data when Save is clicked', () => {
    fireEvent.click(screen.getByText(/Save/i));

    expect(mockSaveData).toHaveBeenCalledWith({
      countryCode: mockData.countryCode,
      phoneNumber: mockData.phoneNumber,
      acceptTermsAndCondition: mockData.acceptTermsAndCondition,
    });
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('does not call saveData or handleSubmit if validation fails', () => {
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '98765' } });
    fireEvent.click(screen.getByText(/Save/i));

    expect(mockSaveData).not.toHaveBeenCalled();
    expect(mockHandleSubmit).not.toHaveBeenCalled();
  });

  it('calls goBack when Back is clicked', () => {
    fireEvent.click(screen.getByText(/Back/i));
    expect(mockGoBack).toHaveBeenCalled();
  });
});
