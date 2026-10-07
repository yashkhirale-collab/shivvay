import { Home, SearchX } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f7faf9] px-4">
            <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                    <SearchX size={30} />
                </div>

                <p className="mt-6 text-6xl font-bold text-teal-700">
                    404
                </p>

                <h1 className="mt-3 text-2xl font-bold text-gray-900">
                    Page not found
                </h1>

                <p className="mt-2 text-gray-500">
                    The page you are looking for doesn't exist.
                </p>

                <Link
                    to="/"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800"
                >
                    <Home size={17} />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}