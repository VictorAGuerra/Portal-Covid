import DatePicker from "react-datepicker"
import './calendar.css'
import { useState, forwardRef } from "react"
import { format } from 'date-fns'

const DateTimeCalendar = forwardRef(({ setValue, name }, ref) => {
  const [date, setDate] = useState(null)

  const handleChange = (date) => {
    setDate(date)

    const formattedDate = format(date, "yyyy/MM/dd'T'HH:mm:ss")
    setValue(name, formattedDate)
  }

  return (
    <DatePicker
      selected={date}
      onChange={handleChange}
      showTimeSelect
      excludeTimes={[]}
      dateFormat="dd/MM/yyyy h:mm aa"
      ref={ref}
      className="calendar"
      minDate={new Date()}
    />
  );
});

export default DateTimeCalendar
