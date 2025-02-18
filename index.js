document.getElementById("verificar").addEventListener("click", () => {
    fetch("dados.json")
        .then(response => response.json())
        .then(dados => verificarIndicadores(dados))
        .catch(error => console.error("Erro ao carregar os dados:", error));
});

function verificarIndicadores(dados) {
    const metas = {
        "Móvel": { ETIT: 80, Assertividade: 85, DPA: 90 },
        "Residencial": { ETIT: 85, Assertividade: 98, DPA: 90 },
        "Empresarial": { ETIT: 85, Assertividade: null, DPA: 90 }
    };

    let resultadoHTML = "<h2>Colaboradores abaixo da meta:</h2>";

    dados.forEach(colaborador => {
        let alertas = [];
        const setorMeta = metas[colaborador.Setor];

        if (colaborador.ETIT !== "-" && parseFloat(colaborador.ETIT) < setorMeta.ETIT) {
            alertas.push(`ETIT (${colaborador.ETIT}%)`);
        }
        if (colaborador.Assertividade !== "-" && setorMeta.Assertividade !== null && parseFloat(colaborador.Assertividade) < setorMeta.Assertividade) {
            alertas.push(`Assertividade (${colaborador.Assertividade}%)`);
        }
        if (colaborador.DPA !== "-" && parseFloat(colaborador.DPA) < setorMeta.DPA) {
            alertas.push(`DPA (${colaborador.DPA}%)`);
        }

        if (alertas.length > 0) {
            resultadoHTML += `<p><strong>${colaborador.Nome} (${colaborador.Setor})</strong>: ${alertas.join(", ")}</p>`;
        }
    });

    document.getElementById("resultado").innerHTML = resultadoHTML;
}
