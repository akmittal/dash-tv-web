import type { AppProps /*, AppContext */ } from 'next/app'
import {useEffect, useState} from "react";

function MyApp({ Component, pageProps }:AppProps) {
    const [selectedLanguages, SetSelectedLanguages] = useState<string[]>([])
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const preSelectedLanguages = localStorage.getItem("selected-languages");
            if(preSelectedLanguages){
                SetSelectedLanguages(JSON.parse(preSelectedLanguages))
            } else{
                SetSelectedLanguages(["English"]);
            }
        }
       
    }, )
    return <Component {...pageProps} selectedLanguages={selectedLanguages} />
  }

  // }
  
  export default MyApp