'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/Menu', label: 'メニュー登録' },
    { href: '/', label: '会計処理' },
    { href: '/SaleHistory', label: '会計履歴' },
  ];

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">会計アプリ</h1>
        <nav className="space-x-6 text-sm sm:text-base">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors ${
                pathname === href
                  ? 'text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1'
                  : 'hover:text-blue-200'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
