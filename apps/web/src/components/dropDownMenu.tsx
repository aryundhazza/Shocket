'use client';
import { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { deleteToken, getToken } from '@/lib/server';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function DropdownMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);
  const [token, setToken] = useState<string | null>(null);
  const role = user.role;
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const fetchToken = async () => {
    const res = await getToken();
    setToken(res || null);
  };

  const onLogout = async () => {
    await deleteToken();
    router.push('/');
    router.refresh();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    fetchToken();

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="dropdownUserAvatarButton"
        onClick={toggleDropdown}
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        <Image
          className="w-8 h-8 rounded-full"
          src={user.avatar || '/logo.png'}
          width={40}
          height={40}
          alt="user photo"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{user.name || 'User'}</div>
            <div className="font-medium truncate">
              {user.email || 'user@example.com'}
            </div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownUserAvatarButton"
          >
            <li>
              <Link
                href={'/profile'}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                My Profile
              </Link>
            </li>
            {role === 'Organizer' && (
              <li>
                <Link
                  href={'/myevents'}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  My Events
                </Link>
              </li>
            )}
            {role === 'User' && (
              <li>
                <Link
                  href={'/mytickets'}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  My Tickets
                </Link>
              </li>
            )}
            {role === 'Organizer' && (
              <li>
                <Link
                  href={token ? '/event/create' : '/login'}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Create Event
                </Link>
              </li>
            )}
            <li>
              <Link
                href={'/event'}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Find Event
              </Link>
            </li>
            {role === 'Organizer' && (
              <li>
                <Link
                  href={'/registration'}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Registration
                </Link>
              </li>
            )}
            {role === 'Organizer' && (
              <li>
                <Link
                  href={'/statistics'}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Statistics
                </Link>
              </li>
            )}
            <li>
              <Link
                href={'/deposit'}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Deposit
              </Link>
            </li>
          </ul>

          <div className="py-2">
            <button
              onClick={onLogout}
              type="button"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
