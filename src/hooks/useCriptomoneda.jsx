import React, {useState} from 'react'
import styled from '@emotion/styled'

const Label = styled.label`
    font-family: 'Bebas Neue';
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    --webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`

const useCriptomoneda = (label, stateInicial, monedas) => {  

    //state de nuestro custom hook
    const [state, setState] = useState(stateInicial);

    const SelectCripto = () => (
        <>
            <Label>{label}</Label>
            <Select
                onChange={e => setState(e.target.value)}
                value={state}
            >
                <option value="">--Seleccione--</option>

                {monedas.map(moneda => (
                    <option key={moneda.CoinInfo.Id} value={moneda.CoinInfo.Name}>{moneda.CoinInfo.FullName}
                    </option>   
                ))} 
            </Select>
        </>
    )

    //Retornar state, interfaz y funcion que modifica el state
    return [state, SelectCripto, setState]
}
 
export default useCriptomoneda;