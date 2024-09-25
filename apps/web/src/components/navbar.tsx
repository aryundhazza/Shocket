import Image from 'next/image';
import Link from 'next/link';
import DropdownMenu from './dropDownMenu';

export default async function Navbar() {
  return (
    <div className="sticky top-0 z-50 h-[80px]">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image src="/logo.png" alt="Shocket Logo" width={50} height={50} />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Shocket
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex md:space-x-8 rtl:space-x-reverse">
            <ul className="flex space-x-4 font-medium">
              <li>
                <Link
                  href={'/signup'}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-sky-400 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Sign Up
                </Link>
              </li>
              )
            </ul>
            <ul className="flex space-x-4 font-medium">
              <DropdownMenu />) : (
              <li>
                <Link
                  href="/login"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-sky-400 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Log In
                </Link>
              </li>
              )
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
