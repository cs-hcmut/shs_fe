import "react-datepicker/dist/react-datepicker.css";
import { FormEvent, Nullable } from "primereact/ts-helpers";
import { Calendar } from "primereact/calendar";
import { SyntheticEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import useQueryParams from "../../hooks/useQueryParams";
import { formatDateToString } from "../../utils/date.util";

interface Props {
  handleValueChange: (dateString: string) => void;
  defaultDate?: string;
  paramKey: string;
}

export default function DateSelector({
  handleValueChange,
  defaultDate,
  paramKey,
}: Props) {
  const queryParam = useQueryParams();
  const intialDate = queryParam[paramKey]
    ? queryParam[paramKey]
    : formatDateToString(new Date());
  const [date, setDate] = useState<Nullable<Date>>(
    new Date(defaultDate ?? intialDate)
  );

  const handleChangeDate = (
    e: FormEvent<Date, SyntheticEvent<Element, Event>>
  ) => {
    setDate(e.value);
    if (e.value) {
      const dateString = formatDateToString(e.value);
      handleValueChange(dateString);
    }
  };

  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none gap-[0.2rem]">
      <Calendar
        name="date-selector"
        value={date}
        onChange={handleChangeDate}
        className="text-[1.2rem]"
      />
      <FontAwesomeIcon icon={faCalendar} />
    </div>
  );
}
