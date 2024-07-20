import DatePicker from "react-datepicker";
import './calendar.css';
import { React, useState, forwardRef } from "react";
import { format } from 'date-fns';

const BirthCalendar = forwardRef(({ setValue, name }, ref) => {
  const [date, setDate] = useState(null);

  const handleChange = (date) => {
    setDate(date);
    setValue(name, date ? format(date, 'yyyy-MM-dd') : "")
  };

  return (
    <DatePicker
      selected={date}
      onChange={handleChange}
      className="calendar"
      dateFormat="dd/MM/yyyy"
      ref={ref}
    />
  );
});

export default BirthCalendar;
