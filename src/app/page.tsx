"use client"
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

//components
import { Navbar } from './components/Navbar/Navbar';
import { DarkModeIcon } from './components/Icons/DarkModeIcon';
import { LightModeIcon } from './components/Icons/LightModeIcon';
import { CloseIcon } from './components/Icons/CloseIcon';
import { PencilIcon } from './components/Icons/pencilIcon';

import { getProductsService, saveProductService, updateProductService, deleteProductService } from './services/product.service';


//hook
import { usePage } from './usePage';

export default function Home() {

  const queryClient = useQueryClient()

  const [product, setProduct] = useState({
    id: 0,
    name: "",
    price: 0,
    quantity: 0,
  });

  const { data: listProduct, error } = useQuery({ queryKey: ["products"], queryFn: getProductsService })

  const { font, selectFont, theme, toggleTheme } = usePage();

  const clearData = () => {
    setProduct({    
      id: 0,
      name: "",
      price: 0,
      quantity: 0, 
    })
  }


  const saveMutation = useMutation({
    mutationFn: saveProductService,
    onSuccess: () => {
      clearData();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateProductService,
    onSuccess: () => {
      clearData();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => {
      console.error("Error en updateMutation:", err);
    },

  });


  const deleteMutation = useMutation({
    mutationFn: deleteProductService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => {
      console.error("Error en deleteMutation:", err);
    },

  });


  const onDelete = (id:number) => {
    deleteMutation.mutate(id)
  } 

  
  const onSubmit = async () => {
    const { id, ...rest } = product;

    if (id === 0) {

      const objReq = { ...rest };
      saveMutation.mutate(objReq);

    } else {
     
       updateMutation.mutate({ id,  price: product.price,  name: product.name,
        quantity: product.quantity});
       
    }

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    setProduct(prev => ({
      ...prev,
      [name]: value
    }));

  }

  if (!listProduct) return <><h1>Loading</h1></>;


  return (
    <div className={`${font} ${theme === 'dark' ? 'dark' : 'light'}`}>
      <Navbar selectFont={selectFont} theme={theme}>
        <div className="relative inline-block text-left">
          <button
            onClick={() => toggleTheme(theme !== 'dark' ? 'dark' : 'light')}
            className="flex items-center px-4 py-2 bg-blue-500  rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            {theme === 'dark' ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </button>

        </div>
      </Navbar>

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pt-0 p-6 pb-6 sm:p-6">

        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

          <div className="flex gap-2 items-center flex-col sm:flex-row flex-wrap sm:justify-center ">

            <input
              placeholder='Nombre'
              value={product.name}
              name='name'
              onChange={handleChange}
              className="px-4 py-2 w-64 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />

            <input
              placeholder='Precio'
              value={product.price}
              name='price'
              onChange={handleChange}
              className="px-4 py-2 w-64 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />

            <input
              placeholder='Cantidad'
              value={product.quantity}
              name='quantity'
              onChange={handleChange}
              className="px-4 py-2 w-64 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />

            <div className='flex gap-1 sm:items-center sm:justify-center'>
              <button
                onClick={onSubmit}
                className="rounded-full border border-solid transition-colors flex items-center justify-center  bg-blue-500 text-white hover:bg-blue-600 hover:text-white hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-32 cursor-pointer "
              >
                Guardar
              </button>

            </div>
          </div>

          {
            listProduct !== undefined ? listProduct.map((item, keyValue) => (
              <div key={item.id + keyValue} className="flex w-full items-center p-4 border-b border-gray-200 theme gap-2 justify-between">
                <div className="text-sm font-medium flex gap-3 items-center">
                  <p className="font-bold">{item.name}</p>
                  <p>{item.price}</p>
                  <p>{item.quantity}</p>
                </div>
                <div className='flex gap-2'
                >               <button
                  onClick={() => setProduct(item)}
                  className="flex items-center px-4 py-2 bg-blue-500  rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                >
                    <PencilIcon />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="flex items-center px-4 py-2 bg-blue-500  rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>
            )) : null
          }

        </main>
      </div >

    </div >
  );
}


