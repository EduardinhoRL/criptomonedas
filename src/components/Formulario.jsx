import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import Error from './Error'

import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomoneda'
import axios from 'axios';

const Boton = styled.button`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background .3s ease;

    &:hover {
        background: #326ac0;
        cursor: pointer;
    }
`

const Formulario = ({setMoneda, setCriptomoneda}) => {

    const [listacripto, setListacripto] = useState([])
    const [error, setError] = useState(false)

    const Monedas = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso de México'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
    ]

    // utilizar useMoneda
    const [moneda, SelectMoneda] = useMoneda('Elige tu Moneda', '', Monedas);

    // utilizar useMoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Cripto Moneda', '', listacripto)

    // llamado a la api
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            
            const resultado = await axios.get(url)
            setListacripto(resultado.data.Data); 
        }
        consultarAPI()
    }, [])

    // submit
    const cotizadorMoneda = e => {
        e.preventDefault()


        if(moneda === '' || criptomoneda === '') {
            setError(true)
            return
        }setError(false)

        setMoneda(moneda)
        setCriptomoneda(criptomoneda);
    }

    return ( 
        <form onSubmit={cotizadorMoneda}>
            {error ? <Error mensaje="Todos los campos son abligatorios"/> : null }
            <SelectMoneda />
            <SelectCripto />

            <Boton type="submit">
                Calcular
            </Boton>
        </form>
    );
}
 
export default Formulario;