import { render, screen, fireEvent } from '@testing-library/react';
import UserDetailsForm1 from './UserDetailsForm1';

jest.mock('./FormButton', () => ({ handleSaveClicked, handleSaveAndNextClicked, handleBackClicked }) => (
  <div>
    <button onClick={handleSaveClicked}>Save</button>
    <button onClick={handleSaveAndNextClicked}>Save and Next</button>
    <button onClick={handleBackClicked}>Back</button>
  </div>
));

describe('UserDetailsForm1 Component', () => {
  const mockData = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St, Springfield',
  };
  
  const mockSaveData = jest.fn();
  const mockGoBack = jest.fn();
  const mockSaveAndNext = jest.fn();

  beforeEach(() => {
    render(
      <UserDetailsForm1
        data={mockData}
        saveData={mockSaveData}
        goBack={mockGoBack}
        saveAndNext={mockSaveAndNext}
      />
    );
  });

  it('renders the form with pre-filled data', () => {
    expect(screen.getByLabelText(/First Name/i).value).toBe(mockData.firstName);
    expect(screen.getByLabelText(/Last Name/i).value).toBe(mockData.lastName);
    expect(screen.getByLabelText(/Address/i).value).toBe(mockData.address);
  });

  it('validates first name and displays error message', () => {
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'J' } });
    fireEvent.click(screen.getByText(/Save/i));

    expect(screen.getByText(/set valid first name/i)).toBeInTheDocument();
  });

  it('validates last name and displays error message', () => {
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: '' } });
    fireEvent.click(screen.getByText(/Save/i));

    expect(screen.getByText(/set valid last name/i)).toBeInTheDocument();
  });

  it('validates address and displays error message', () => {
    fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: '123' } });
    fireEvent.click(screen.getByText(/Save/i));

    expect(screen.getByText(/set valid address/i)).toBeInTheDocument();
  });

  it('calls saveData with valid data when Save is clicked', () => {
    fireEvent.click(screen.getByText(/Save/i));

    expect(mockSaveData).toHaveBeenCalledWith(mockData);
  });

  it('calls saveAndNext with valid data when Save and Next is clicked', () => {
    fireEvent.click(screen.getByText(/Save and Next/i));

    expect(mockSaveAndNext).toHaveBeenCalledWith(mockData);
  });

  it('does not call saveData or saveAndNext if validation fails', () => {
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'J' } });
    fireEvent.click(screen.getByText(/Save/i));

    expect(mockSaveData).not.toHaveBeenCalled();
    expect(mockSaveAndNext).not.toHaveBeenCalled();
  });

  it('calls goBack when Back is clicked', () => {
    fireEvent.click(screen.getByText(/Back/i));
    expect(mockGoBack).toHaveBeenCalled();
  });
});
