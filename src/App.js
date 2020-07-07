import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled'
import monedas from './img/monedas.png'
import Formulario from './components/Formulario'
import Cotizacion from './components/Cotizacion'
import Spinner from './components/Spinner'
import axios from 'axios';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background: #66a2fe;
    display: block;
  }
`

function App() {

  const [moneda, setMoneda] = useState('')
  const [criptomoneda, setCriptomoneda] = useState('')
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false)
  

  useEffect(() => {
    
    const cotizatCriptomoneda = async () => {

      if(moneda === '') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

      const resultado = await axios(url)

      // mostrar el spinner
      setCargando(true)

      // ocultar el spinner
      setTimeout(() => {

        setCargando(false)

        setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 2000)

      setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
    }
    cotizatCriptomoneda();

  }, [moneda, criptomoneda])

  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={monedas}
          alt="imagen cripto"
        />
      </div>
      <div>
        <Heading>
          Cotiza Criptomonedas al Instante
        </Heading>

        <Formulario 
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
