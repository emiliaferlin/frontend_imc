import React, { useState, useEffect } from "react";

function IMCCalculator() {
  const [nome, setNome] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resposta, setResposta] = useState([]);

  const getIMC = async () => {
    const response = await fetch("http://localhost:3002/getIMC");
    const data = await response.json();
    setResposta(data);
  };

  const postIMC = async () => {
    const response = await fetch("http://localhost:3002/calcularIMC", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nome,
        altura: altura,
        peso: peso,
      }),
    });
    const data = await response.json();
    alert(`IMC calculado: ${data.imc}`);
    getIMC();
    setNome("");
    setAltura("");
    setPeso("");
  };

  const removerCalculo = async (id) => {
    if (window.confirm("Deseja remover o cálculo?")) {
      await fetch(`http://localhost:3002/removerIMC/${id}`, {
        method: "DELETE",
      });
      alert("Cálculo removido com sucesso!");
      getIMC();
    }
  };

  useEffect(() => {
    getIMC();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Cálculo de IMC</h3>
      <div style={{ marginBottom: "15px" }}>
        <label>Nome: </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Peso (kg): </label>
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Altura (m): </label>
        <input
          type="number"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
        />
      </div>
      <button onClick={postIMC}>Calcular IMC</button>
      <h3>Histórico de Cálculos de IMC</h3>
      <div className="container">
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Peso</th>
              <th>Altura</th>
              <th>IMC</th>
              <th>Classificação</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {resposta.length > 0 ? (
              resposta.map((res, index) => (
                <tr key={index}>
                  <td>{res.nome}</td>
                  <td>{res.peso}</td>
                  <td>{res.altura}</td>
                  <td>{res.imc}</td>
                  <td>{res.classificacao}</td>
                  <td>
                    <button onClick={() => removerCalculo(index)}>
                      Remover Calculo
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Nenhum cálculo realizado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IMCCalculator;
