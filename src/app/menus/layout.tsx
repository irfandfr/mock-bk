'use client'

import { flame } from '@/style/fonts/fonts';
import './menu.scss'
import {usePathname} from 'next/navigation'

interface CategoryProp {
  title: string;
  link: string;
  id: string
}

const categories: CategoryProp[] = [
  { title: "king of the week", link: "/menus/category/king-of-the-week",id:'1' },
  { title: "king's chicken", link: "/menus/category/kings-chicken",id:'2' },
  { title: "special menu", link: "/menus/category/special-menu",id:'3' },
];

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()

  return (
    <main className="flex flex-col lg:flex-row px-[15px] lg:px-0">
      <div className="w-[21%] mr-[5%]">
        <div className="categories">
          {categories.map(({ title, link, id }, index) => {
            return (
              <a
                className={`category-item block w-full capitalize rounded-[10px] pt-[7px] px-[20px] 
                            min-h-[36px] text-lg pb-[8px] mb-2 ${flame.className} 
                            ${index === 0 ? (pathname === '/menus' || pathname === link || pathname.split('/').slice(-1)[0] === id) && 'active' : 
                            (pathname === link || pathname.split('/').slice(-1)[0] === id) && 'active'}`}
                href={link}
                key={"category" + index}
              >
                {title}
              </a>
            );
          })}
        </div>
      </div>
      {children}
    </main>
  );
}
