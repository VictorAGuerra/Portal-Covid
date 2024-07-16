
import DatePicker from "react-datepicker"
import './BirthCalendar.css'

const BirthCalendar = () => {

    return (
      <DatePicker
        selected={new Date()}
        className="birthcalendar"
        dateFormat={"dd/MM/yyyy"}
      />
    )
}

export default BirthCalendar