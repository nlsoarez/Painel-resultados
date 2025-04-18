const employees = [
  { "Matricula": "N6104793", "Nome": "Bruno Mariano Vilaca", "Setor": "Móvel", "DPA": "81%", "ETIT": "79%", "Assertividade": "98%" },
  { "Matricula": "N5931955", "Nome": "Thiago de Souza Inacio", "Setor": "Móvel", "DPA": "96%", "ETIT": "75%", "Assertividade": "92%" },
  { "Matricula": "N6173067", "Nome": "Juliana Ribeiro Galhão", "Setor": "Móvel", "DPA": "90%", "ETIT": "87%", "Assertividade": "96%" },
  { "Matricula": "N6071740", "Nome": "Thiago Barboza dos Santos", "Setor": "Móvel", "DPA": "86%", "ETIT": "77%", "Assertividade": "99%" },
  { "Matricula": "N6172207", "Nome": "Charles dos Santos Paiva", "Setor": "Móvel", "DPA": "76%", "ETIT": "-", "Assertividade": "-" },
  { "Matricula": "F204763", "Nome": "Rodrigo Reis Duarte", "Setor": "Móvel", "DPA": "87%", "ETIT": "87%", "Assertividade": "94%" },
  { "Matricula": "N6088107", "Nome": "Leandro Gonçalves de Carvalho", "Setor": "Empresarial", "DPA": "76%", "ETIT": "-", "Assertividade": "-" },
  { "Matricula": "N5619600", "Nome": "Bruno Costa Bucard", "Setor": "Empresarial", "DPA": "69%", "ETIT": "-", "Assertividade": "-" },
  { "Matricula": "N0189105", "Nome": "Igor Marcelino de Marins", "Setor": "Empresarial", "DPA": "105%", "ETIT": "91%", "Assertividade": "-" },
  { "Matricula": "N5713690", "Nome": "Gabriela Tavares da Silva", "Setor": "Empresarial", "DPA": "78%", "ETIT": "100%", "Assertividade": "-" },
  { "Matricula": "N5802257", "Nome": "Magno Ferrarez de Morais", "Setor": "Empresarial", "DPA": "83%", "ETIT": "80%", "Assertividade": "-" },
  { "Matricula": "N5604148", "Nome": "Daniel Marcelo Felisberto Oliveira", "Setor": "Empresarial", "DPA": "-", "ETIT": "60%", "Assertividade": "-" },
  { "Matricula": "F201714", "Nome": "Fernanda Mesquita de Freitas", "Setor": "Empresarial", "DPA": "80%", "ETIT": "75%", "Assertividade": "-" },
  { "Matricula": "N0125317", "Nome": "Roberto Silva do Nascimento", "Setor": "Empresarial", "DPA": "102%", "ETIT": "100%", "Assertividade": "-" },
  { "Matricula": "N5819183", "Nome": "Rodrigo Pires Bernardino", "Setor": "Empresarial", "DPA": "78%", "ETIT": "100%", "Assertividade": "-" },
  { "Matricula": "N5926003", "Nome": "Suellen Hernandez da Silva", "Setor": "Empresarial", "DPA": "-", "ETIT": "93%", "Assertividade": "-" },
  { "Matricula": "N5932064", "Nome": "Monica da Silva Rodrigues", "Setor": "Empresarial", "DPA": "111%", "ETIT": "100%", "Assertividade": "-" },
  { "Matricula": "N0238475", "Nome": "Marley Marques Ribeiro", "Setor": "Residencial", "DPA": "76%", "ETIT": "-", "Assertividade": "-" },
  { "Matricula": "N5923221", "Nome": "Kelly Pinheiro Lira", "Setor": "Residencial", "DPA": "85%", "ETIT": "-", "Assertividade": "-" },
  { "Matricula": "F160641", "Nome": "Jennifer Maria Andrade Santos", "Setor": "Residencial", "DPA": "93%", "ETIT": "100%", "Assertividade": "100%" },
  { "Matricula": "N5772086", "Nome": "Thiago Pereira da Silva", "Setor": "Residencial", "DPA": "-", "ETIT": "-", "Assertividade": "100%" },
  { "Matricula": "N0239871", "Nome": "Leonardo Ferreira Lima de Almeida", "Setor": "Residencial", "DPA": "85%", "ETIT": "70%", "Assertividade": "80%" },
  { "Matricula": "N5577565", "Nome": "Maristella Marcia dos Santos", "Setor": "Residencial", "DPA": "94%", "ETIT": "71%", "Assertividade": "75%" },
  { "Matricula": "N5737414", "Nome": "Sandro da Silva Carvalho", "Setor": "Residencial", "DPA": "91%", "ETIT": "89%", "Assertividade": "86%" },
  { "Matricula": "N5972428", "Nome": "Cristiane Hermogenes da Silva", "Setor": "Residencial", "DPA": "106%", "ETIT": "94%", "Assertividade": "93%" },
  { "Matricula": "N6173055", "Nome": "Jefferson Luis Gonçalves Coitinho", "Setor": "Residencial", "DPA": "83%", "ETIT": "77%", "Assertividade": "60%" },
  { "Matricula": "N5932090", "Nome": "Evilázio André de Magalhães Gomes Pereira", "Setor": "Residencial", "DPA": "97%", "ETIT": "-", "Assertividade": "50%" },
  { "Matricula": "N0255801", "Nome": "Elberton Aniceto Henrique", "Setor": "Residencial", "DPA": "96%", "ETIT": "100%", "Assertividade": "83%" },
  { "Matricula": "N4014011", "Nome": "Alan Marinho Dias", "Setor": "Residencial", "DPA": "83%", "ETIT": "93%", "Assertividade": "53%" },
  { "Matricula": "N5923996", "Nome": "Julio Cesar Santos Soares", "Setor": "Residencial", "DPA": "90%", "ETIT": "100%", "Assertividade": "88%" }
]
function definirMeta(setor, tipo) {
    const metas = {
        "ETIT Móvel": 80,
        "ETIT Residencial e Empresarial": 85,
        "Assertividade Móvel": 85,
        "Assertividade Residencial": 70,
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
