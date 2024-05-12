import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>Page not found</h1>
      <p>
        Return to the <Link href="/">homepage</Link>
      </p>
    </div>
  );
}
