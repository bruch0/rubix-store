import Swal from 'sweetalert2';
import axios from 'axios';
import { parseString } from 'xml2js';

const convertToBRL = (value) => (
  (value / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  })
);
const throwError = (title) => (
  Swal.fire({
    icon: 'error',
    confirmButtonColor: '#1382e9',
    text: title,
  })
);

const throwSuccess = (title) => (
  Swal.fire({
    icon: 'success',
    confirmButtonColor: '#1382e9',
    text: title,
  })
);

const getDelivery = (setDelivery, cepDestino, peso) => {
  axios.get(`https://cors-anywhere.herokuapp.com/http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?sCepOrigem=88111225&sCepDestino=${cepDestino}&nVlPeso=${peso}&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&nVlDiametro=0&nCdServico=04014&nCdEmpresa=&sDsSenha=&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml&nIndicaCalculo=1`)
    .then((res) => {
      const xml = res.data;
      parseString(xml, (err, result) => setDelivery(Number(result.Servicos.cServico[0].Valor[0].replace(',', '.') * 100)));
    });
};

export {
  convertToBRL, throwError, throwSuccess, getDelivery,
};
