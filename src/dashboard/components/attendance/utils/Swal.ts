import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const showSuccessAlert = (title: string, text: string) => {
  MySwal.fire({
    title,
    text,
    icon: 'success',
  });
};

export const showErrorAlert = (title: string, text: string) => {
  MySwal.fire({
    title,
    text,
    icon: 'error',
  });
};

export const showConfirmationAlert = (title: string, text: string) => {
  return MySwal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, crear'
  });
};
