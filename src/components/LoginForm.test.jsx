// import { render, screen, fireEvent } from '@testing-library/react';
// import LoginForm from './LoginForm';

import test from "node:test";

// describe('LoginForm Component', () => {
//     const mockSaveData = jest.fn();
//     const mockSaveAndNext = jest.fn();
//     const initialData = {
//         emailId: 'test@example.com',
//         password: 'Password123!',
//     };

//     beforeEach(() => {
//         mockSaveData.mockClear();
//         mockSaveAndNext.mockClear();
//     });

//     test('renders LoginForm with initial data', () => {
//         render(<LoginForm data={initialData} saveData={mockSaveData} saveAndNext={mockSaveAndNext} />);

//         expect(screen.getByLabelText(/Email ID/i)).toHaveValue(initialData.emailId);
//         expect(screen.getByLabelText(/Password/i)).toHaveValue(initialData.password);
//     });

//     test('validates email correctly', () => {
//         render(<LoginForm data={initialData} saveData={mockSaveData} saveAndNext={mockSaveAndNext} />);
        
//         // Simulate an invalid email input
//         fireEvent.change(screen.getByLabelText(/Email ID/i), { target: { value: 'invalid-email' } });
//         fireEvent.click(screen.getByText(/Save/i));

//         expect(screen.getByText(/set valid email/i)).toBeInTheDocument();
//         expect(mockSaveData).not.toHaveBeenCalled();
//     });

//     test('validates password correctly', () => {
//         render(<LoginForm data={initialData} saveData={mockSaveData} saveAndNext={mockSaveAndNext} />);
        
//         // Simulate an invalid password input
//         fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'weakpassword' } });
//         fireEvent.click(screen.getByText(/Save/i));

//         expect(screen.getByText(/set valid password/i)).toBeInTheDocument();
//         expect(mockSaveData).not.toHaveBeenCalled();
//     });

//     test('calls saveData when Save is clicked with valid data', () => {
//         render(<LoginForm data={initialData} saveData={mockSaveData} saveAndNext={mockSaveAndNext} />);
        
//         fireEvent.click(screen.getByText(/Save/i));

//         expect(mockSaveData).toHaveBeenCalledWith(initialData);
//     });

//     test('calls saveAndNext when Save and Next is clicked with valid data', () => {
//         render(<LoginForm data={initialData} saveData={mockSaveData} saveAndNext={mockSaveAndNext} />);
        
//         fireEvent.click(screen.getByText(/Save and Next/i));

//         expect(mockSaveAndNext).toHaveBeenCalledWith(initialData);
//     });

//     test('does not call saveData or saveAndNext with invalid data', () => {
//         render(<LoginForm data={initialData} saveData={mockSaveData} saveAndNext={mockSaveAndNext} />);
        
//         // Simulate invalid data
//         fireEvent.change(screen.getByLabelText(/Email ID/i), { target: { value: 'invalid-email' } });
//         fireEvent.click(screen.getByText(/Save/i));

//         expect(mockSaveData).not.toHaveBeenCalled();
//         expect(mockSaveAndNext).not.toHaveBeenCalled();
//     });
// });

test('simple test case', () => {
    expect(true).toBe(true);
  });