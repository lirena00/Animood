import "@/styles/globals.css";
import ProgressBar from '@badrap/bar-of-progress'
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";

export const progress = new ProgressBar({
  size: 4,
  color: "#23A9D5",
  className: "z-50",
  delay: 100
})


export default function App({ Component,   pageProps: { session, ...pageProps }}) {
  useEffect(() => {
    const handleStart = () => {
      progress.start();
    };
  
    const handleComplete = () => {
      progress.finish();
    };
  
    const handleError = () => {
      progress.finish();
    };
  
    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleError);
  
    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleError);
    };
  }, []);
  return( 
  <>
  <SessionProvider session={session}>
  <Component {...pageProps} />
  </SessionProvider>
  </>
)
}
