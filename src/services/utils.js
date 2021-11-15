/* eslint-disable no-underscore-dangle */
import Swal from 'sweetalert2';
import axios from 'axios';
import convert from 'xml-js';

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

const getDelivery = async (cepDestino, peso) => {
  try {
    const result = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=20550110&sCepDestino=${cepDestino}&nVlPeso=${peso}&nCdFormato=1&nVlComprimento=20&nVlAltura=10&nVlLargura=17&nVlDiametro=0&nCdServico=04014&nCdEmpresa=&sDsSenha=&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml&nIndicaCalculo=1`
    );
    const objectResult = JSON.parse(convert.xml2json(result.data, { compact: true, spaces: 2 }));
    return Number(objectResult.Servicos.cServico.Valor._text.replace(',', '.')) * 100;
  } catch {
    return throwError('Não foi possível calcular o frete.');
  }
};

export {
  convertToBRL,
  throwError,
  throwSuccess,
  getDelivery,
};
