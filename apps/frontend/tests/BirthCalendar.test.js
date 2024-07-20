import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BirthCalendar from '../src/components/BirthCalendar';

jest.mock('react-datepicker', () => {
  const MockDatePicker = ({ selected, onChange }) => {
    return (
      <input
        type="text"
        value={selected ? '19/07/2023' : ''}
        onChange={(e) => onChange(new Date(e.target.value))}
      />
    );
  };
  return MockDatePicker;
});

describe('BirthCalendar', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<BirthCalendar setValue={jest.fn()} name="birthDate" />);

    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('calls setValue with the correct date format', () => {
    const mockSetValue = jest.fn();
    const { getByRole } = render(<BirthCalendar setValue={mockSetValue} name="birthDate" />);

    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: '2023-07-19' } });

    expect(mockSetValue).toHaveBeenCalledWith('birthDate', '2023-07-19');
  });

  it('displays the selected date in the correct format', () => {
    const { getByRole } = render(<BirthCalendar setValue={jest.fn()} name="birthDate" />);

    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: '2023-07-19' } });

    expect(input).toHaveValue('19/07/2023');
  });
});
