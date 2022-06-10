import Head from "next/head";
import { CalendarIcon } from "@heroicons/react/solid";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { GetStaticProps } from "next";
import { getServerPageGetProducts, ssrGetProducts } from "../graphql/generated/pagePublic";
import { GetProductsQuery, useCreatePurchaseMutation } from "../graphql/generated/graphql";
import { withApollo } from "../lib/withApollo";
import { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EnrollProps {
  data: GetProductsQuery;
}

function Enroll({ data }: EnrollProps) {
  const [productsLoading, setProductsLoading] = useState({});
  const [createPurchase] = useCreatePurchaseMutation()

  async function handlePurchaseProduct(productId: string) {
    setProductsLoading({ ...productsLoading, [productId]: true });

    await createPurchase({
      variables: {
        productId,
      }
    })
    
    setProductsLoading({ ...productsLoading, [productId]: false });

    toast.success('Matrícula realizada!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  }

  return (
    <>
      <ToastContainer />
      <Head>
        <title>Realizar matrícula</title>
        <link rel="shortcut icon" href="favicon.png" type="image/png" />
      </Head>

      <div className="bg-white">
        <div className="relative overflow-hidden bg-gray-50">
          <Header />
          <main className="py-20 max-w-7xl mx-auto ">
            <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
              <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">Comece a estudar</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Realizar matrícula
              </p>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md mt-8">
              <ul role="list" className="divide-y divide-gray-200">
                {data.products.map((product) => (
                  <li key={product.id}>
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="truncate">
                          <div className="flex text-sm">
                            <p className="font-medium text-indigo-600 truncate">{product.title}</p>
                            <p className="ml-1 flex-shrink-0 font-normal text-gray-500">em Programação</p>
                          </div>
                        </div>
                      </div>
                      <div className="ml-5 flex-shrink-0">
                        <button disabled={productsLoading[product.id]} onClick={() => handlePurchaseProduct(product.id)} className="px-2 w-40 py-1 border border-transparent text-center font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700">
                          {productsLoading[product.id] ? (
                            <svg role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                          ) : (
                            'Realizar inscrição'
                          )}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ }) => {
  const data = await getServerPageGetProducts(undefined, {} as any)

  return {
    props: data.props,
    revalidate: 60 * 60, // 1 hour
  }
}

export default withApollo(
  ssrGetProducts.withPage()(Enroll)
)