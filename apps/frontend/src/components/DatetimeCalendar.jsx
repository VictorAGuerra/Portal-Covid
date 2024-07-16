import { useState } from "react"
import DatePicker from "react-datepicker"

const DatetimeCalendar = () => {
    const [startDate, setStartDate] = useState(new Date())

    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="birthcalendar"
        dateFormat={"dd/MM/yyyy"}
      />
    )
}

export default DatetimeCalendar