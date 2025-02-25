const employees = [
  { "Matricula": "N5713690", "Nome": "GABRIELA TAVARES DA SILVA", "Setor": "Empresarial", "ETIT": "95%", "Assertividade": "97%", "DPA": "114%" },
  { "Matricula": "N0125317", "Nome": "ROBERTO SILVA DO NASCIMENTO", "Setor": "Empresarial", "ETIT": "91%", "Assertividade": "-", "DPA": "106%" },
  { "Matricula": "N5972428", "Nome": "CRISTIANE HERMOGENES DA SILVA", "Setor": "Residencial", "ETIT": "71%", "Assertividade": "100%", "DPA": "104%" },
  { "Matricula": "N5923221", "Nome": "KELLY PINHEIRO LIRA", "Setor": "Residencial", "ETIT": "-", "Assertividade": "-", "DPA": "103%" },
  { "Matricula": "N0238475", "Nome": "MARLEY MARQUES RIBEIRO", "Setor": "Residencial", "ETIT": "94%", "Assertividade": "-", "DPA": "96%" },
  { "Matricula": "N5772086", "Nome": "THIAGO PEREIRA DA SILVA", "Setor": "Residencial", "ETIT": "42%", "Assertividade": "100%", "DPA": "95%" },
  { "Matricula": "N5932090", "Nome": "EVILÁZIO ANDRE DE MAGALHÃES GOMES PEREIRA", "Setor": "Residencial", "ETIT": "86%", "Assertividade": "98%", "DPA": "94%" },
  { "Matricula": "N5819183", "Nome": "RODRIGO PIRES BERNARDINO", "Setor": "Empresarial", "ETIT": "100%", "Assertividade": "100%", "DPA": "92%" },
  { "Matricula": "N6173067", "Nome": "JULIANA RIBEIRO GALHÃO", "Setor": "Móvel", "ETIT": "95%", "Assertividade": "97%", "DPA": "91%" },
  { "Matricula": "N6172207", "Nome": "CHARLES DOS SANTOS PAIVA", "Setor": "Móvel", "ETIT": "-", "Assertividade": "-", "DPA": "89%" },
  { "Matricula": "F204763", "Nome": "RODRIGO REIS DUARTE", "Setor": "Móvel", "ETIT": "97%", "Assertividade": "96%", "DPA": "89%" },
  { "Matricula": "N5932064", "Nome": "MONICA DA SILVA RODRIGUES", "Setor": "Empresarial", "ETIT": "85%", "Assertividade": "-", "DPA": "87%" },
  { "Matricula": "N0255801", "Nome": "ELBERTON ANICETO HENRIQUE", "Setor": "Residencial", "ETIT": "58%", "Assertividade": "93%", "DPA": "86%" },
  { "Matricula": "F160641", "Nome": "JENNIFER MARIA ANDRADE SANTOS", "Setor": "Residencial", "ETIT": "72%", "Assertividade": "88%", "DPA": "86%" },
  { "Matricula": "N5737414", "Nome": "SANDRO DA SILVA CARVALHO", "Setor": "Residencial", "ETIT": "66%", "Assertividade": "100%", "DPA": "85%" },
  { "Matricula": "N5577565", "Nome": "MARISTELLA MARCIA DOS SANTOS", "Setor": "Residencial", "ETIT": "61%", "Assertividade": "96%", "DPA": "84%" },
  { "Matricula": "N6104793", "Nome": "BRUNO MARIANO VILACA", "Setor": "Móvel", "ETIT": "86%", "Assertividade": "98%", "DPA": "83%" },
  { "Matricula": "N5619600", "Nome": "BRUNO COSTA BUCARD", "Setor": "Empresarial", "ETIT": "-", "Assertividade": "-", "DPA": "82%" },
  { "Matricula": "N0189105", "Nome": "IGOR MARCELINO DE MARINS", "Setor": "Empresarial", "ETIT": "84%", "Assertividade": "-", "DPA": "82%" },
  { "Matricula": "N5923996", "Nome": "JULIO CESAR SANTOS SOARES", "Setor": "Residencial", "ETIT": "68%", "Assertividade": "84%", "DPA": "82%" },
  { "Matricula": "N0239871", "Nome": "LEONARDO FERREIRA LIMA DE ALMEIDA", "Setor": "Residencial", "ETIT": "67%", "Assertividade": "100%", "DPA": "82%" },
  { "Matricula": "N6088107", "Nome": "LEANDRO GONÇALVES DE CARVALHO", "Setor": "Empresarial", "ETIT": "48%", "Assertividade": "-", "DPA": "80%" },
  { "Matricula": "F201714", "Nome": "FERNANDA MESQUITA DE FREITAS", "Setor": "Empresarial", "ETIT": "64%", "Assertividade": "-", "DPA": "79%" },
  { "Matricula": "N4014011", "Nome": "ALAN MARINHO DIAS", "Setor": "Residencial", "ETIT": "68%", "Assertividade": "94%", "DPA": "76%" },
  { "Matricula": "N5922887", "Nome": "ROMULO BARBOSA NICOLAE", "Setor": "Empresarial", "ETIT": "-", "Assertividade": "-", "DPA": "69%" },
  { "Matricula": "N6071740", "Nome": "THIAGO BARBOZA DOS SANTOS", "Setor": "Móvel", "ETIT": "100%", "Assertividade": "100%", "DPA": "64%" },
  { "Matricula": "N5926003", "Nome": "SUELLEN HERNANDEZ DA SILVA", "Setor": "Empresarial", "ETIT": "82%", "Assertividade": "-", "DPA": "-" }
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
