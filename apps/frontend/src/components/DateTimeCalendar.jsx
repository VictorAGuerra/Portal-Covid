import DatePicker from "react-datepicker";
import './calendar.css';
import { React, useState, useEffect, forwardRef } from "react";
import { getAttendances } from '../../services/api.mjs';

const DateTimeCalendar = forwardRef(({ setValue, name }, ref) => {
  const [date, setDate] = useState(null);
  const [excludedTimes, setExcludedTimes] = useState({});

  useEffect(() => {
    const fetchAttendances = async () => {
      const attendances = await getAttendances();
      const timeCounts = {};

      attendances.forEach(attendance => {
        const datetime = new Date(attendance.datetime);
        const time = datetime.toISOString();

        if (!timeCounts[time]) timeCounts[time] = 0;
        timeCounts[time]++;
      });

      const newExcludedTimes = {};
      Object.keys(timeCounts).forEach(time => {
        if (timeCounts[time] >= 2) {
          const [date] = new Date(time).toISOString().split('T');
          if (!newExcludedTimes[date]) newExcludedTimes[date] = [];
          newExcludedTimes[date].push(new Date(time));
        }
      });

      setExcludedTimes(newExcludedTimes);
    };

    fetchAttendances();
  }, []);

  const handleChange = (date) => {
    setDate(date);
    const formattedDate = date.toISOString();
    setValue(name, formattedDate);
  };

  const filterPassedTime = (time) => {
    const [date] = new Date(time).toISOString().split('T');
    if (excludedTimes[date]) {
      return !excludedTimes[date].some(excludedTime => excludedTime.getTime() === time.getTime());
    }
    return true;
  };

  return (
    <DatePicker
      selected={date}
      onChange={handleChange}
      showTimeSelect
      timeIntervals={60}
      filterTime={filterPassedTime}
      dateFormat="dd/MM/yyyy h:mm aa"
      ref={ref}
      className="calendar"
      minDate={new Date()}
    />
  );
});

export default DateTimeCalendar;
