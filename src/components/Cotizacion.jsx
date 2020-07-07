import React from 'react'
import styled from '@emotion/styled'

const ResultadoDiv = styled.div`
    padding: 20px;
`

const ResultadoP = styled.p`
    color: #fff;
    font-family: arial, 'Bebas Neue';

    span {
        font-weight: bold;
    }

`

const Cotizacion = ({resultado}) => {

    // si el objeto esta vacio que se acabe la funcion
    if(Object.keys(resultado).length === 0) return null 

    return ( 
        <ResultadoDiv>
            <ResultadoP>Precio es: <span>{resultado.PRICE}</span></ResultadoP>
            <ResultadoP>Precio más alto del día: <span>{resultado.HIGHDAY}</span></ResultadoP>
            <ResultadoP>Precio más bajo del día: <span>{resultado.LOWDAY}</span></ResultadoP>
            <ResultadoP>Variación últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></ResultadoP>
            <ResultadoP>Última actualización: <span>{resultado.LASTUPDATE}</span></ResultadoP>
        </ResultadoDiv>
     );
}
 
export default Cotizacion;