const employees = [
  {"Matricula": "N5713690", "Nome": "Gabriela Tavares da Silva", "Setor": "Empresarial", "ETIT": "66%", "Assertividade": "-", "DPA": "109%"},
    {"Matricula": "N0125317", "Nome": "Roberto Silva do Nascimento", "Setor": "Empresarial", "ETIT": "89%", "Assertividade": "-", "DPA": "101%"},
    {"Matricula": "N5972428", "Nome": "Cristiane Hermogenes da Silva", "Setor": "Residencial", "ETIT": "79%", "Assertividade": "78%", "DPA": "100%"},
    {"Matricula": "N5923221", "Nome": "Kelly Pinheiro Lira", "Setor": "Residencial", "ETIT": "-", "Assertividade": "-", "DPA": "96%"},
    {"Matricula": "N5772086", "Nome": "Thiago Pereira da Silva", "Setor": "Residencial", "ETIT": "45%", "Assertividade": "81%", "DPA": "95%"},
    {"Matricula": "N5819183", "Nome": "Rodrigo Pires Bernardino", "Setor": "Empresarial", "ETIT": "93%", "Assertividade": "-", "DPA": "94%"},
    {"Matricula": "F204763", "Nome": "Rodrigo Reis Duarte", "Setor": "Móvel", "ETIT": "98%", "Assertividade": "96%", "DPA": "93%"},
    {"Matricula": "F201714", "Nome": "Fernanda Mesquita de Freitas", "Setor": "Empresarial", "ETIT": "71%", "Assertividade": "-", "DPA": "91%"},
    {"Matricula": "N0238475", "Nome": "Marley Marques Ribeiro", "Setor": "Residencial", "ETIT": "67%", "Assertividade": "70%", "DPA": "91%"},
    {"Matricula": "N5932090", "Nome": "Evilázio Andre de Magalhães", "Setor": "Residencial", "ETIT": "54%", "Assertividade": "63%", "DPA": "91%"},
    {"Matricula": "N5931955", "Nome": "Thiago de Souza Inacio", "Setor": "Móvel", "ETIT": "-", "Assertividade": "-", "DPA": "90%"},
    {"Matricula": "N5932064", "Nome": "Monica da Silva Rodrigues", "Setor": "Empresarial", "ETIT": "84%", "Assertividade": "-", "DPA": "89%"},
    {"Matricula": "N6173067", "Nome": "Juliana Ribeiro Galhão", "Setor": "Móvel", "ETIT": "94%", "Assertividade": "97%", "DPA": "87%"},
    {"Matricula": "F160641", "Nome": "Jennifer Maria Andrade Santos", "Setor": "Residencial", "ETIT": "77%", "Assertividade": "60%", "DPA": "86%"},
    {"Matricula": "N6172207", "Nome": "Charles dos Santos Paiva", "Setor": "Móvel", "ETIT": "-", "Assertividade": "-", "DPA": "85%"},
    {"Matricula": "N5577565", "Nome": "Sandro da Silva Carvalho", "Setor": "Residencial", "ETIT": "67%", "Assertividade": "70%", "DPA": "85%"},
    {"Matricula": "N0255801", "Nome": "Elberton Aniceto Henrique", "Setor": "Residencial", "ETIT": "65%", "Assertividade": "87%", "DPA": "84%"},
    {"Matricula": "N6104793", "Nome": "Bruno Mariano Vilaca", "Setor": "Móvel", "ETIT": "86%", "Assertividade": "98%", "DPA": "83%"},
    {"Matricula": "N0189105", "Nome": "Igor Marcelino de Marins", "Setor": "Empresarial", "ETIT": "81%", "Assertividade": "-", "DPA": "82%"},
    {"Matricula": "N0237891", "Nome": "Leonardo Ferreira Lima", "Setor": "Residencial", "ETIT": "74%", "Assertividade": "87%", "DPA": "82%"},
    {"Matricula": "N0239871", "Nome": "Julio Cesar Santos Soares", "Setor": "Residencial", "ETIT": "67%", "Assertividade": "89%", "DPA": "82%"},
    {"Matricula": "N4014011", "Nome": "Alan Marinho Dias", "Setor": "Residencial", "ETIT": "74%", "Assertividade": "58%", "DPA": "80%"},
    {"Matricula": "N5619600", "Nome": "Bruno Costa Bucard", "Setor": "Empresarial", "ETIT": "-", "Assertividade": "-", "DPA": "80%"},
    {"Matricula": "N6088107", "Nome": "Leandro Gonçalves de Carvalho", "Setor": "Empresarial", "ETIT": "48%", "Assertividade": "-", "DPA": "76%"},
    {"Matricula": "N5923996", "Nome": "Julio Cesar Santos Soares", "Setor": "Residencial", "ETIT": "45%", "Assertividade": "71%", "DPA": "76%"},
    {"Matricula": "N5922887", "Nome": "Romulo Barbosa Nicolae", "Setor": "Empresarial", "ETIT": "76%", "Assertividade": "58%", "DPA": "69%"},
    {"Matricula": "N6071740", "Nome": "Thiago Barboza dos Santos", "Setor": "Móvel", "ETIT": "100%", "Assertividade": "100%", "DPA": "68%"},
    {"Matricula": "N5926003", "Nome": "Suellen Hernandez da Silva", "Setor": "Empresarial", "ETIT": "81%", "Assertividade": "-", "DPA": ""},
    {"Matricula": "N6173055", "Nome": "Jefferson Luis Gonçalves Coitinho", "Setor": "Residencial", "ETIT": "76", "Assertividade": "58%", "DPA": "-"}
];

function definirMeta(setor, tipo) {
    const metas = {
        "ETIT Móvel": 80,
        "ETIT Residencial e Empresarial": 85,
        "Assertividade Móvel": 85,
        "Assertividade Residencial": 98,
        "DPA": 90
    };

    if (tipo === "ETIT") {
        return setor === "Móvel" ? metas["ETIT Móvel"] : metas["ETIT Residencial e Empresarial"];
    }
    if (tipo === "Assertividade") {
        return setor === "Móvel" ? metas["Assertividade Móvel"] : metas["Assertividade Residencial"];
    }
    return metas["DPA"];
}

function considerarDentroMeta(valor, setor, tipo) {
    if (valor === "-" || valor === "Não informado") {
        return true; 
    }

    const valorNumerico = parseFloat(valor.replace("%", ""));
    return valorNumerico >= definirMeta(setor, tipo);
}

function formatarValor(valor, setor, tipo) {
    if (valor === "-" || valor === "Não informado") {
        return "-";
    }

    const valorNumerico = parseFloat(valor.replace("%", ""));
    const dentroDaMeta = valorNumerico >= definirMeta(setor, tipo);
    return dentroDaMeta ? `<span style="color: green;">${valor}</span>` : `<span style="color: red;">${valor}</span>`;
}

function consultar() {
    const matriculaInput = document.getElementById("matricula").value.trim().toUpperCase();
    const resultadoDiv = document.getElementById("resultado");

    if (!matriculaInput) {
        resultadoDiv.innerHTML = "<p style='color: red;'>Por favor, digite uma matrícula.</p>";
        return;
    }

    const empregado = employees.find(emp => emp.Matricula === matriculaInput);

    if (empregado) {
        const etitOk = considerarDentroMeta(empregado.ETIT, empregado.Setor, "ETIT");
        const assertividadeOk = considerarDentroMeta(empregado.Assertividade, empregado.Setor, "Assertividade");
        const dpaOk = considerarDentroMeta(empregado.DPA, empregado.Setor, "DPA");

        const certificacaoMsg = etitOk && assertividadeOk && dpaOk ? 
            `<p style="color: green; font-weight: bold;">Você está certificando ✅</p>` : 
            `<p style="color: red; font-weight: bold;">Você não está certificando ❌</p>`;

        resultadoDiv.innerHTML = `
            <p><strong>Nome:</strong> ${empregado.Nome}</p>
            <p><strong>Setor:</strong> ${empregado.Setor}</p>
            <p><strong>ETIT:</strong> ${formatarValor(empregado.ETIT, empregado.Setor, "ETIT")}</p>
            <p><strong>Assertividade:</strong> ${formatarValor(empregado.Assertividade, empregado.Setor, "Assertividade")}</p>
            <p><strong>DPA:</strong> ${formatarValor(empregado.DPA, empregado.Setor, "DPA")}</p>
            ${certificacaoMsg}
        `;
    } else {
        resultadoDiv.innerHTML = "<p style='color: red;'>Matrícula não encontrada.</p>";
    }
}
