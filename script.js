document.getElementById("verificarBtn").addEventListener("click", () => {
    fetch("dados.json")
        .then(response => response.json())
        .then(data => {
            const resultadoDiv = document.getElementById("resultado");
            resultadoDiv.innerHTML = "";

            const limites = {
                "ETIT Móvel": 80,
                "ETIT Residencial e Empresarial": 85,
                "Assertividade Móvel": 85,
                "Assertividade Residencial": 98,
                "DPA": 90
            };

            data.forEach(colaborador => {
                let alertas = [];

                if (colaborador.Setor === "Móvel" && colaborador.ETIT && parseFloat(colaborador.ETIT) < limites["ETIT Móvel"]) {
                    alertas.push(`ETIT abaixo da meta (${colaborador.ETIT})`);
                }
                if (colaborador.Setor !== "Móvel" && colaborador.ETIT && parseFloat(colaborador.ETIT) < limites["ETIT Residencial e Empresarial"]) {
                    alertas.push(`ETIT abaixo da meta (${colaborador.ETIT})`);
                }
                if (colaborador.Setor === "Móvel" && colaborador.Assertividade && parseFloat(colaborador.Assertividade) < limites["Assertividade Móvel"]) {
                    alertas.push(`Assertividade abaixo da meta (${colaborador.Assertividade})`);
                }
                if (colaborador.Setor !== "Móvel" && colaborador.Assertividade && parseFloat(colaborador.Assertividade) < limites["Assertividade Residencial"]) {
                    alertas.push(`Assertividade abaixo da meta (${colaborador.Assertividade})`);
                }
                if (colaborador.DPA && parseFloat(colaborador.DPA) < limites["DPA"]) {
                    alertas.push(`DPA abaixo da meta (${colaborador.DPA})`);
                }

                if (alertas.length > 0) {
                    const item = document.createElement("p");
                    item.innerHTML = `<strong>${colaborador.Nome}</strong> (${colaborador.Setor}): <br> ${alertas.join("<br>")}`;
                    resultadoDiv.appendChild(item);
                }
            });
        })
        .catch(error => console.error("Erro ao carregar os dados:", error));
});
