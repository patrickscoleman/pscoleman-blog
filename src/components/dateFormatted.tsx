import { format, parseISO } from "date-fns";

export const DateFormatted = ({
  dateString,
  className,
}: {
  dateString: string;
  className?: string;
}): JSX.Element => {
  let date = undefined;
  try {
    date = format(parseISO(dateString), "LLLL d, yyyy");
  } catch (e) {
    console.log(e);
  }
  return date ? (
    <time className={className} dateTime={dateString}>
      {date}
    </time>
  ) : (
    <></>
  );
};
