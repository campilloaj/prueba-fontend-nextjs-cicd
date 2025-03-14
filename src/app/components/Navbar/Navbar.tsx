"use client"
import { ReactNode, useState } from 'react';

type Props = {
   selectFont: (option:string) => void,
   children: ReactNode,
   theme:string
}

export const Navbar = ({ children, selectFont, theme }: Props) => {

   const [isOpen, setIsOpen] = useState(false);

   const toggleDropdown = () => {
      setIsOpen(!isOpen);
   }

   return (
      <nav className={`bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 ${theme} `}>
         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
               <span className="self-center text-2xl font-semibold whitespace-nowrap">App</span>
            </a>
            { children }

            <div className="relative inline-block text-left">
               {/* Botón que activa el dropdown */}
               <button
                  onClick={toggleDropdown}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     className="w-6 h-6 text-white hover:text-white"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 10h18M3 6h18M3 14h18M3 18h18"
                     />
                  </svg>
               </button>

               {/* Dropdown */}
               {isOpen && (
                  <ul className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
                     <li>
                        <a
                           onClick={() => selectFont("serif")}
                           href="#"
                           className="text-black block px-4 py-2 hover:bg-gray-200"
                        >
                           Serif
                        </a>
                     </li>
                     <li>
                        <a
                           onClick={() => selectFont("sans_serif")}
                           href="#"
                           className="text-black block px-4 py-2 hover:bg-gray-200"
                        >
                           sans serif
                        </a>
                     </li>
                     <li>
                        <a
                           onClick={() => selectFont("monospace")}
                           href="#"
                           className="text-black block px-4 py-2 hover:bg-gray-200"
                        >
                           monospace
                        </a>
                     </li>
                  </ul>
               )}
            </div>
         </div>
      </nav>
   )
}



 
 