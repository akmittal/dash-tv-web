import { useState, useEffect } from "react";

let preSelectedLanguages: string = "[\"English\"]";
if (typeof window !== "undefined") {
  preSelectedLanguages = localStorage.getItem("selected-languages") || '["English"]';
 
}

export default function useLanguages() {
  const [languages, setLanguages] = useState(JSON.parse(preSelectedLanguages));
  useEffect(() => {
    localStorage.setItem("selected-languages", JSON.stringify(languages));
  }, [languages]);

  return [languages, setLanguages ];
}
