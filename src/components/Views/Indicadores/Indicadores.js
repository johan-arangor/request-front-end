import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Axios from "axios";
import { url } from "../../../global";
import TableMeses from "./TableMeses";
import TableMesesClientes from './TableMesesClientes';

export default function Indicadores() {
  const [indicadores, setIndicadores] = useState([]);
  const [dataM, setDataM] = useState([]);
  const [dataMC, setDataMC] = useState([]);


    useEffect(() => {
      getMeses();
      getMesesClientes();
    }, []);

    const getMeses = async () => {
      try {
        await Axios.get(url + '/indicadores/Meses', {
          headers: { 'access-token': localStorage.getItem('token') }
        })
        .then((res) => {
          setDataM(res.data);
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: err
          });
        });
      } catch (err) {
        Swal.fire({
          type: 'error',
          title: 'Error',
          text: err
        });
      }
    }


    const getMesesClientes = async () => {
      try {
        await Axios.get(url + '/indicadores/MesesClientes', {
          headers: { 'access-token': localStorage.getItem('token') }
        })
        .then((res) => {
          setDataMC(res.data);
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: err
          });
        });
      } catch (err) {
        Swal.fire({
          type: 'error',
          title: 'Error',
          text: err
        });
      }
    }
    
  return (
    <div>
      <h1>Indicadores</h1>
      <TableMeses 
        data = {dataM}
      />
      <TableMesesClientes
        data = {dataMC}
      />
    </div>
  );
}