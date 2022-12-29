import { useState } from "react";

// retain state when category view is refreshed
export const useCategoryTerm = () =>{
    let get_term = () => sessionStorage.getItem('categoryTerm');

    const [categoryTerm, setCategTerm] = useState(get_term())


    let set_term = term => {
       sessionStorage.setItem('categoryTerm', term); 
       setCategTerm(term)
    } 

    return {
        categoryTerm: get_term,
        setCategTerm: set_term
    }

}
