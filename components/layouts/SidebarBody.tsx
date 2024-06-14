'use client';
import Link from "next/link";
import {useState} from "react";
import {NavItem} from "@/types/nav";


export default function SidebarBody({sidebarItems}: {
  sidebarItems: NavItem[]
}) {
  const [active, setActive] = useState('home');
  return (
    <>
      {sidebarItems.map((item) => (
        <Link href={item.href} key={item.name}
              className={`flex gap-4 p-4 rounded-lg w-full hover:bg-primary-foreground 
              items-center hover:scale-105
                ${item.name === active && 'bg-primary-foreground font-bold'}`}
              onClick={() => setActive(item.name)}
        >
          {active === item.name ? item.icon.solid : item.icon.outline}
          <span className='hidden lg:flex items-center'>{item.label}</span>
        </Link>
      ))}
    </>
  )
}