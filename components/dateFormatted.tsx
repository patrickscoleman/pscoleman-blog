import { format, parseISO } from "date-fns";

const DateFormattedComponent = ({
  dateString,
}: {
  dateString: string;
}): JSX.Element => {
  let date = undefined;
  try {
    date = format(parseISO(dateString), "LLLL d, yyyy");
  } catch (e) {
    console.log(e);
  }
  return date ? <time dateTime={dateString}>{date}</time> : <></>;
};

export const DateFormatted = DateFormattedComponent;
