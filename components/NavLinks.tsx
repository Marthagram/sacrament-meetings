'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className='nav'>
   
      <ul className="flex gap-6">
          <li><Link  href="/"
        className={pathname === '/' ? 'nav-link active' : 'nav-link'}
        aria-current={pathname === '/' ? 'page' : undefined}>Home</Link></li>
          <li><Link  href="/meetings"
        className={pathname === '/meetings' ? 'nav-link active' : 'nav-link'}
        aria-current={pathname === '/meetings' ? 'page' : undefined}>Meetings</Link></li>
          <li><Link  href="/meetings/current"
        className={pathname === '/meetings/current' ? 'nav-link active' : 'nav-link'}
        aria-current={pathname === '/meetings/current' ? 'page' : undefined}>Current Meeting</Link></li>
        
        </ul>
    </nav>
  );
}