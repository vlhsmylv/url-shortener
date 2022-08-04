import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.css"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
            integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A=="
            crossOrigin="anonymous" referrerPolicy="no-referrer"/>
      <title>URL Shortener</title>
    </Head>
    <Component {...pageProps} />
    <ToastContainer limit={1} />
  </>
}

export default MyApp
