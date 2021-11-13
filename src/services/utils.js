import Swal from 'sweetalert2';

function convertToBRL(value) {
  return (
    (value / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      style: 'currency',
      currency: 'BRL',
    }));
}

function throwError(title) {
  Swal.fire({
    icon: 'error',
    confirmButtonColor: '#1382e9',
    text: title,
  });
}

export { convertToBRL, throwError };
