import Link from "next/link";

export default async function NotFound() {
  return (
    <html>
      <body>
        <div className="flex justify-center items-center">
          <h2>Page Not Found</h2>
          <p>Could not find requested resource</p>
          <p>
            Go back to <Link href="/">Home</Link>
          </p>
        </div>
      </body>
    </html>

  );
}
