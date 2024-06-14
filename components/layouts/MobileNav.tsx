'use client';
import {Icons} from '../Icons'
import {useState} from "react";
import Link from "next/link";


export default function MobileNav({lang}: {
  lang: string
}) {
  const items = [
    {
      name: 'home',
      icon: Icons.home,
      href: '/'
    },
    {
      name: 'search',
      icon: Icons.search,
      href: '/search',
    },
    {
      name: 'notification',
      icon: Icons.notification,
      href: '/notification'
    },
    {
      name: 'message',
      icon: Icons.message,
      href: '/message'
    },
    {
      name: 'profile',
      icon: Icons.profile,
      href: '/profile'
    },
  ];
  const [active, setActive] = useState('home');
  return (
    <div className='fixed flex bottom-0 sm:hidden border-t w-full justify-center gap-2 p-2 flex-wrap'>
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`p-4 rounded-lg hover:scale-105 ${active === item.name && 'bg-primary-foreground font-bold'}`}
          onClick={() => setActive(item.name)}
        >
          <item.icon className='h-6 w-6' variant={active === item.name ? 'solid' : 'outline'}/>
        </Link>
      ))}
    </div>
  )
}