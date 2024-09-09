import React, { useState, useEffect } from 'react';
import './App.css';

// Função para gerar um número aleatório entre 1 e 6 (como um dado)
const jogarDado = () => Math.floor(Math.random() * 6) + 1;

function App() {
  const [dado1, setDado1] = useState(jogarDado());
  const [dado2, setDado2] = useState(jogarDado());
  const [mensagem, setMensagem] = useState(''); // Mensagem de vitória ou derrota
  const [vitorias, setVitorias] = useState(0); // Contador de vitórias
  const [totalJogadas, setTotalJogadas] = useState(0); // Contador de jogadas totais
  const [percentualVitorias, setPercentualVitorias] = useState(0); // Percentual de vitórias

  // Função que rola os dados (gera novos números aleatórios)
  const jogarAmbosOsDados = () => {
    const novoDado1 = jogarDado();
    const novoDado2 = jogarDado();
    setDado1(novoDado1);
    setDado2(novoDado2);
  };

  // Efeito que verifica se o jogador ganhou ou perdeu
  useEffect(() => {
    const soma = dado1 + dado2;
    setTotalJogadas(totalJogadas + 1); // Atualiza o total de jogadas

    if (soma === 7 || soma === 11) {
      setMensagem('Você ganhou!');
      setVitorias(vitorias + 1); // Atualiza o contador de vitórias
    } else {
      setMensagem('Você perdeu! Tente novamente.');
    }
  }, [dado1, dado2]); // O efeito é disparado sempre que os valores dos dados mudam

  // Efeito para calcular o percentual de vitórias
  useEffect(() => {
    if (totalJogadas > 0) {
      const percentual = Math.round((vitorias / totalJogadas) * 100);
      setPercentualVitorias(percentual);
    }
  }, [vitorias, totalJogadas]); // Atualiza o percentual quando o número de vitórias ou jogadas mudar

  return (
    <div className="App">
      <h1>Jogo de dados</h1>
      <div className="container-dados">

        <img
          src={`https://upload.wikimedia.org/wikipedia/commons/${dado1}_die_face.png`}
          alt={`Dado ${dado1}`}
          onError={(e) => { e.target.onerror = null; e.target.src = `https://via.placeholder.com/100x100?text=${dado1}` }}
        />
        <img
          src={`https://upload.wikimedia.org/wikipedia/commons/${dado2}_die_face.png`}
          alt={`Dado ${dado2}`}
          onError={(e) => { e.target.onerror = null; e.target.src = `https://via.placeholder.com/100x100?text=${dado2}` }}
        />
      </div>
      <button onClick={jogarAmbosOsDados}>Jogar Dados</button>

      <h2>{mensagem}</h2>

      {/* Exibe o contador de vitórias, jogadas totais e percentual */}
      <div>
        <h3>Placar: {vitorias}/{totalJogadas} = {percentualVitorias}%</h3>
      </div>
    </div>
  );
}

export default App;
