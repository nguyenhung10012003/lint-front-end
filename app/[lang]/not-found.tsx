import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-center px-4">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-gray-600 max-w-lg mx-auto">
          {`Oops! The page you're looking for seems to have vanished into the digital void.`}
        </p>
      </div>
      <div className="mt-8">
        <Link href="/" passHref>
          <Button size="lg" className="font-semibold transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5">
            Return to Home
          </Button>
        </Link>
      </div>
      <div className="mt-12 text-gray-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="240"
          height="240"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      </div>
      <p className="mt-8 text-gray-500">
        Error Code: 404 | Page Not Found
      </p>
    </div>
  )
}