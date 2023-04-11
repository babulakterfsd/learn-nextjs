/* eslint-disable multiline-ternary */
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="bg-slate-500 text-white px-4 py-0.5 ">
        <div className="flex flex-wrap justify-between items-center">
          <Link href="/" className="flex lg:flex-row gap-x-1 items-center">
            <Image
              className="h-12"
              src="/assets/images/fav.png"
              alt="SolLires"
              height="40"
              width="55"
            />
            <span className="hidden lg:block text-transparent text-lg bg-clip-text bg-gradient-to-r from-indigo-700 to-red-700 font-extrabold">
              MovieDB.
            </span>
          </Link>

          <span className="lg:hidden text-transparent text-md bg-clip-text bg-gradient-to-r from-indigo-700 to-red-700 font-extrabold">
            MovieDB
          </span>

          <div className="flex lg:hidden">
            <button
              onClick={toggleMenu}
              data-collapse-toggle="NavBarId"
              type="button"
              className="inline-flex items-center p-2 text-base md:text-xl text-main-white rounded-lg lg:hidden"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="hidden w-full lg:block md:w-auto" id="NavBarId">
            <ul className="flex flex-col mt-4 lg:flex-row lg:space-x-3 md:mt-0">
              <li className="cursor-pointer hover:text-indigo-300">
                <Link href="/" className="block py-2 pl-3 " aria-current="page">
                  Home
                </Link>
              </li>
              <li className="cursor-pointer hover:text-indigo-300">
                <Link href="/about" className="block py-2 pl-3 ">
                  About
                </Link>
              </li>
              <li className="cursor-pointer hover:text-indigo-300">
                <Link href="/employees" className="block py-2 pl-3 ">
                  Employees
                </Link>
              </li>
              <li className="cursor-pointer hover:text-indigo-300">
                <Link href="/movies" className="block py-2 pl-3 ">
                  Movies
                </Link>
              </li>
              <li className="cursor-pointer hover:text-indigo-300">
                <Link href="/drama" className="block py-2 pl-3 ">
                  Drama
                </Link>
              </li>
              <li className="cursor-pointer hover:text-indigo-300">
                <Link href="/users" className="block py-2 pl-3 ">
                  Users
                </Link>
              </li>
              <li className="cursor-pointer hover:text-indigo-300">
                <Link href="/todo" className="block py-2 pl-3 ">
                  Todo
                </Link>
              </li>
              <li className="cursor-pointer hover:text-indigo-300">
                <Link href="/services" className="block py-2 pl-3 ">
                  Services
                </Link>
              </li>
              <li className="cursor-pointer hover:text-indigo-300">
                <Link href="/contributors" className="block py-2 pl-3 ">
                  Contributors
                </Link>
              </li>
              <li className="cursor-pointer hover:text-indigo-300">
                <Link href="/members" className="block py-2 pl-3 ">
                  Members
                </Link>
              </li>
              {session?.user?.email ? (
                <li className="cursor-pointer text-white bg-indigo-600 hover:bg-indigo-500 rounded-md text-center">
                  <button
                    type="button"
                    className="block py-2 px-3 font-semibold"
                    onClick={() => signOut()}
                  >
                    LogOut
                  </button>
                </li>
              ) : (
                <li className="cursor-pointer text-white bg-indigo-600 hover:bg-indigo-500 rounded-md text-center">
                  <Link href="/login" className="block py-2 px-3 font-semibold">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        {/* mobile */}
        <div className="w-full md:w-auto block lg:hidden">
          <ul
            className={`${
              isOpen ? 'block' : 'hidden'
            } flex flex-col items-center mt-4 text-base sm:text-lg text-main-white`}
          >
            <li
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Link href="/" className="block py-2 pl-3 " aria-current="page">
                Home
              </Link>
            </li>
            <li
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Link href="/about" className="block py-2 pl-3 ">
                About
              </Link>
            </li>
            <li
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Link href="/employees" className="block py-2 pl-3 ">
                Employees
              </Link>
            </li>
            <li
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Link href="/movies" className="block py-2 pl-3 ">
                Movies
              </Link>
            </li>
            <li
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Link href="/drama" className="block py-2 pl-3 ">
                Drama
              </Link>
            </li>
            <li
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Link href="/users" className="block py-2 pl-3 ">
                Users
              </Link>
            </li>
            <li
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Link href="/todo" className="block py-2 pl-3 ">
                Todo
              </Link>
            </li>
            <li
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Link href="/services" className="block py-2 pl-3 ">
                Services
              </Link>
            </li>
            <li
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Link href="/contributors" className="block py-2 pl-3 ">
                Contributors
              </Link>
            </li>
            <li
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Link href="/members" className="block py-2 pl-3 ">
                Members
              </Link>
            </li>
            {session?.user?.email ? (
              <li
                onClick={() => {
                  setIsOpen(false);
                }}
                className="cursor-pointer text-white bg-indigo-600 hover:bg-indigo-500 rounded-md text-center ml-3 my-2"
              >
                <button
                  type="button"
                  className="block py-2 px-3"
                  onClick={() => signOut()}
                >
                  LogOut
                </button>
              </li>
            ) : (
              <li
                onClick={() => {
                  setIsOpen(false);
                }}
                className="cursor-pointer text-white bg-indigo-600 hover:bg-indigo-500 rounded-md text-center ml-3 my-2"
              >
                <Link href="/login" className="block py-2 px-3 ">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
