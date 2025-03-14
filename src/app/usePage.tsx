import { useState, useEffect } from 'react';

import { Poppins, Roboto_Mono, Merriweather } from "next/font/google";

import { getProductsService, saveProductService, updateProductService, Product } from './services/product.service';

const robotoMono = Roboto_Mono({
   subsets: ['latin'],
   weight: '400',
});

//sans serif
const poppins = Poppins({
   subsets: ['latin'],
   weight: '400',
});

//serif
const merriweather = Merriweather({
   subsets: ['latin'],
   weight: '400',
});

export type SearchedWord = {
   date: string,
   time: string,
   word: string
}

export const usePage = () => {


   const [font, setFont] = useState(merriweather.className);
   const [theme, setTheme] = useState('dark')
  

   const onSubmit = async () => {

    

   }

   const selectFont = (option: string) => {

      if (option === "sans_serif") {
         setFont(poppins.className);
      } else if (option === "monospace") {
         setFont(robotoMono.className);
      } else {
         setFont(merriweather.className);
      }

   }

   const toggleTheme = (option: string) => {
      setTheme(option);
   }

   return {
      font,
      selectFont,
      toggleTheme,
      theme,
      onSubmit,
   }
}