import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './Styles.scss';

import api from './services/api'

function App() {

    const [input, setInput] = useState('')
    const [cep, setCep] = useState({});

    async function handleSearch() {
        // 01310930/json/

        if (input === '') {
            alert("Preencha algum CEP!")
            return;
        }

        try {
            const response = await api.get(`${input}/json`)
            setCep(response.data)
            setInput("")
        }

        catch {
            alert('Ops, erro ao ao buscar.')
            setInput("")
        }
    }

    return (
        <div className="container">
            <h1 className="title">Buscador CEP</h1>

            <div className="containerInput">

                <input type="text"
                    placeholder="Digite seu CEP"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                />

                <button className="buttonSearch" onClick={handleSearch}>
                    <FiSearch size={25} color='#fff' />
                </button>
            </div>

            {Object.keys(cep).length > 0 && (

                <main className='main'>
                    <h2>CEP: {cep.cep}</h2>

                    <span>Rua: {cep.logradouro}</span>
                    <span>Bairro: {cep.bairro}</span>
                    <span>Cidade: {cep.localidade} - {cep.uf}</span>
                </main>

            )}

        </div>
    );
}

export default App;