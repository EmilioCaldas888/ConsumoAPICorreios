import { useState } from 'react';
import {FiSearch} from 'react-icons/fi';
import api from './services/api';
import './styles.css';

function App() {

    const[input, setInput] = useState('');
    const[cep, setCep] = useState({});

    async function handleSearch(){
      if(input===''){
        alert("Insira um cep...")
        return;
      }
      try{
        const response = await api.get (`${input}/json`);
        setCep(response.data)
        setInput("");
      }
      catch{
        alert("Erro ao buscar Cep")
        setInput("");

      }
    }

  return (
    <div className="container ">
        <h1 className="title">Buscador de Cep</h1>

      <div className='containerinput'>
        <input type="text" placeholder="Digite o seu Cep..."
        value={input} 
        onChange={(e)=>setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>

      <main className="main">
        <h2> CEP: {cep.cep}</h2>
        <span>{cep.logradouro}</span>
        <span>Complemento {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>
    </div>
  );
}

export default App;
