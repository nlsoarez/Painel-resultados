const employees = [
  { Matricula: "F204763", Nome: "RODRIGO REIS DUARTE", Setor: "Móvel", ETIT: "98%", Assertividade: "96%", DPA: "92,76%" },
  { Matricula: "N6104793", Nome: "BRUNO MARIANO VILACA", Setor: "Móvel", ETIT: "82%", Assertividade: "98%", DPA: "85%" },
  { Matricula: "N6071740", Nome: "THIAGO BARBOZA DOS SANTOS", Setor: "Móvel", ETIT: "100%", Assertividade: "100%", DPA: "-" },
  { Matricula: "N6173067", Nome: "JULIANA RIBEIRO GALHÃO", Setor: "Móvel", ETIT: "93%", Assertividade: "98%", DPA: "84,20%" },
  { Matricula: "N6172207", Nome: "CHARLES DOS SANTOS PAIVA", Setor: "Móvel", ETIT: "-", Assertividade: "-", DPA: "83,17%" },
  { Matricula: "N5819183", Nome: "RODRIGO PIRES BERNARDINO", Setor: "Empresarial", ETIT: "92%", Assertividade: "-", DPA: "94,64%" },
  { Matricula: "N5932064", Nome: "MONICA DA SILVA RODRIGUES", Setor: "Empresarial", ETIT: "88%", Assertividade: "-", DPA: "94,55%" },
  { Matricula: "N0125317", Nome: "ROBERTO SILVA DO NASCIMENTO", Setor: "Empresarial", ETIT: "94%", Assertividade: "-", DPA: "99,05%" },
  { Matricula: "F201714", Nome: "FERNANDA MESQUITA DE FREITAS", Setor: "Empresarial", ETIT: "63%", Assertividade: "-", DPA: "88,88%" },
  { Matricula: "N5713690", Nome: "GABRIELA TAVARES DA SILVA", Setor: "Empresarial", ETIT: "69%", Assertividade: "-", DPA: "118,91%" },
  { Matricula: "N5922887", Nome: "ROMULO BARBOSA NICOLAE", Setor: "Empresarial", ETIT: "53%", Assertividade: "-", DPA: "69,47%" },
  { Matricula: "N0189105", Nome: "IGOR MARCELINO DE MARINS", Setor: "Empresarial", ETIT: "83%", Assertividade: "-", DPA: "77,99%" },
  { Matricula: "N5926003", Nome: "SUELLEN HERNANDEZ DA SILVA", Setor: "Empresarial", ETIT: "75%", Assertividade: "-", DPA: "-" },
  { Matricula: "N5619600", Nome: "BRUNO COSTA BUCARD", Setor: "Empresarial", ETIT: "-", Assertividade: "-", DPA: "82,49%" },
  { Matricula: "F160641", Nome: "JENNIFER MARIA ANDRADE SANTOS", Setor: "Residencial", ETIT: "86%", Assertividade: "85%", DPA: "87,14%" },
  { Matricula: "N5737414", Nome: "SANDRO DA SILVA CARVALHO", Setor: "Residencial", ETIT: "60%", Assertividade: "100%", DPA: "93,53%" },
  { Matricula: "N5577565", Nome: "MARISTELLA MARCIA DOS SANTOS", Setor: "Residencial", ETIT: "60%", Assertividade: "100%", DPA: "85,65%" },
  { Matricula: "N5772086", Nome: "THIAGO PEREIRA DA SILVA", Setor: "Residencial", ETIT: "39%", Assertividade: "100%", DPA: "105,54%" },
  { Matricula: "N5972428", Nome: "CRISTIANE HERMOGENES DA SILVA", Setor: "Residencial", ETIT: "56%", Assertividade: "100%", DPA: "95,16%" },
  { Matricula: "N0239871", Nome: "LEONARDO FERREIRA LIMA DE ALMEIDA", Setor: "Residencial", ETIT: "67%", Assertividade: "100%", DPA: "77,84%" },
  { Matricula: "N5923996", Nome: "JULIO CESAR SANTOS SOARES", Setor: "Residencial", ETIT: "100%", Assertividade: "50%", DPA: "65,71%" },
  { Matricula: "N4014011", Nome: "ALAN MARINHO DIAS", Setor: "Residencial", ETIT: "64%", Assertividade: "94%", DPA: "77,64%" },
  { Matricula: "N0255801", Nome: "ELBERTON ANICETO HENRIQUE", Setor: "Residencial", ETIT: "58%", Assertividade: "77%", DPA: "81,37%" },
  { Matricula: "N6173055", Nome: "JEFFERSON LUIS GONÇALVES COITINHO", Setor: "Residencial", ETIT: "67%", Assertividade: "90%", DPA: "-" },
  { Matricula: "N5932090", Nome: "EVILÁZIO ANDRÉ DE MAGALHÃES GOMES PEREIRA", Setor: "Residencial", ETIT: "67%", Assertividade: "91%", DPA: "84,30%" },
  { Matricula: "N0238475", Nome: "MARLEY MARQUES RIBEIRO", Setor: "Residencial", ETIT: "-", Assertividade: "-", DPA: "96,07%" },
  { Matricula: "N5923221", Nome: "KELLY PINHEIRO LIRA", Setor: "Residencial", ETIT: "-", Assertividade: "-", DPA: "94,55%" }
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
