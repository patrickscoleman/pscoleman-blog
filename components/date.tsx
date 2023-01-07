import { format, parseISO } from "date-fns";

export default function Date({
  dateString,
}: {
  dateString: string;
}): JSX.Element {
  let date = undefined;
  try {
    date = format(parseISO(dateString), "LLLL d, yyyy");
  } catch (e) {
    console.log(e);
  }
  return date ? <time dateTime={dateString}>{date}</time> : <></>;
}
