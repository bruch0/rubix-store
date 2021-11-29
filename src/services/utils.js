/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import Swal from 'sweetalert2';

const convertToBRL = (value) =>
  (value / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  });

const throwError = (title) =>
  Swal.fire({
    icon: 'error',
    confirmButtonColor: '#1382e9',
    text: title,
  });

const throwSuccess = (title) =>
  Swal.fire({
    icon: 'success',
    confirmButtonColor: '#1382e9',
    text: title,
  });

const getDelivery = async () => 2000;

export { convertToBRL, throwError, throwSuccess, getDelivery };
