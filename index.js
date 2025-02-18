document.getElementById("verificar").addEventListener("click", () => {
    fetch("dados.json")
        .then(response => response.json())
        .then(data => verificarIndicadores(data))
        .catch(error => console.error("Erro ao carregar JSON:", error));
});

function verificarIndicadores(dados) {
    const metas = {
        "Móvel": { ETIT: 80, Assertividade: 85, DPA: 90 },
        "Residencial": { ETIT: 85, Assertividade: 98, DPA: 90 },
        "Empresarial": { ETIT: 85, Assertividade: null, DPA: 90 }
    };

    let resultadoHTML = "<h3>Colaboradores abaixo da meta:</h3>";
    let encontrou = false;

    dados.forEach(colaborador => {
        let setor = colaborador.Setor;
        let abaixoMeta = [];

        if (colaborador.ETIT !== "-" && parseInt(colaborador.ETIT) < metas[setor].ETIT) {
            abaixoMeta.push(`ETIT: ${colaborador.ETIT}%`);
        }

        if (colaborador.Assertividade !== "-" && metas[setor].Assertividade !== null && parseInt(colaborador.Assertividade) < metas[setor].Assertividade) {
            abaixoMeta.push(`Assertividade: ${colaborador.Assertividade}%`);
        }

        if (colaborador.DPA !== "-" && parseInt(colaborador.DPA) < metas[setor].DPA) {
            abaixoMeta.push(`DPA: ${colaborador.DPA}%`);
        }

        if (abaixoMeta.length > 0) {
            encontrou = true;
            resultadoHTML += `<p><strong>${colaborador.Nome}</strong> (${setor}): ${abaixoMeta.join(", ")}</p>`;
        }
    });

    if (!encontrou) {
        resultadoHTML = "<h3>Todos os colaboradores estão dentro da meta! ✅</h3>";
    }

    document.getElementById("resultado").innerHTML = resultadoHTML;
}
