

import Swal from "sweetalert2";

export const showLoading = () => {
    return Swal.fire({
        html: 
        ` 
            <span class="loader overflow-hidden"></span>
        `,
        background: 'transparent',
        customClass:{
            container: 'overflow-hidden',
            popup: 'overflow-hidden',
        },
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: ()=> {
            console.log(Swal.getHtmlContainer()?.classList.add("overflow-hidden"));
            
        }
    })
}


export const showErrorMessage = ( errorMessage: string ) => {
    return Swal.fire({
        title: 'Oops!',
        text: errorMessage,
        icon: 'error',
        timer: 1000,
        showConfirmButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
    })
}
export const showSuccessMessage= ( message:string)=>{
   return Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: message
    })
}