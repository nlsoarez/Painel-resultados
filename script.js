const employees = [
  { "Matricula": "N6104793", "Nome": "Bruno Mariano Vilaca", "Setor": "Móvel", "DPA": "89%", "ETIT": "81%", "Assertividade": "98%" },
  { "Matricula": "N5931955", "Nome": "Thiago de Souza Inacio", "Setor": "Móvel", "DPA": "95%", "ETIT": "82%", "Assertividade": "93%" },
  { "Matricula": "N6173067", "Nome": "Juliana Ribeiro Galhão", "Setor": "Móvel", "DPA": "90%", "ETIT": "87%", "Assertividade": "96%" },
  { "Matricula": "N6071740", "Nome": "Thiago Barboza dos Santos", "Setor": "Móvel", "DPA": "85%", "ETIT": "84%", "Assertividade": "98%" },
  { "Matricula": "N6172207", "Nome": "Charles dos Santos Paiva", "Setor": "Móvel", "DPA": "77%", "ETIT": "-", "Assertividade": "-" },
  { "Matricula": "F204763", "Nome": "Rodrigo Reis Duarte", "Setor": "Móvel", "DPA": "96%", "ETIT": "90%", "Assertividade": "95%" },
  { "Matricula": "N6088107", "Nome": "Leandro Gonçalves de Carvalho", "Setor": "Empresarial", "DPA": "87%", "ETIT": "-", "Assertividade": "-" },
  { "Matricula": "N5619600", "Nome": "Bruno Costa Bucard", "Setor": "Empresarial", "DPA": "96%", "ETIT": "-", "Assertividade": "-" },
  { "Matricula": "N0189105", "Nome": "Igor Marcelino de Marins", "Setor": "Empresarial", "DPA": "105%", "ETIT": "100%", "Assertividade": "-" },
  { "Matricula": "N5713690", "Nome": "Gabriela Tavares da Silva", "Setor": "Empresarial", "DPA": "91%", "ETIT": "83%", "Assertividade": "-" },
  { "Matricula": "N5802257", "Nome": "Magno Ferrarez de Morais", "Setor": "Empresarial", "DPA": "84%", "ETIT": "82%", "Assertividade": "-" },
  { "Matricula": "N5604148", "Nome": "Daniel Marcelo Felisberto Oliveira", "Setor": "Empresarial", "DPA": "-", "ETIT": "79%", "Assertividade": "-" },
  { "Matricula": "F201714", "Nome": "Fernanda Mesquita de Freitas", "Setor": "Empresarial", "DPA": "91%", "ETIT": "82%", "Assertividade": "-" },
  { "Matricula": "N0125317", "Nome": "Roberto Silva do Nascimento", "Setor": "Empresarial", "DPA": "104%", "ETIT": "95%", "Assertividade": "-" },
  { "Matricula": "N5819183", "Nome": "Rodrigo Pires Bernardino", "Setor": "Empresarial", "DPA": "82%", "ETIT": "100%", "Assertividade": "-" },
  { "Matricula": "N5926003", "Nome": "Suellen Hernandez da Silva", "Setor": "Empresarial", "DPA": "-", "ETIT": "91%", "Assertividade": "-" },
  { "Matricula": "N5932064", "Nome": "Monica da Silva Rodrigues", "Setor": "Empresarial", "DPA": "111%", "ETIT": "100%", "Assertividade": "-" },
  { "Matricula": "N0238475", "Nome": "Marley Marques Ribeiro", "Setor": "Residencial", "DPA": "75%", "ETIT": "-", "Assertividade": "-" },
  { "Matricula": "N5923221", "Nome": "Kelly Pinheiro Lira", "Setor": "Residencial", "DPA": "90%", "ETIT": "-", "Assertividade": "-" },
  { "Matricula": "F160641", "Nome": "Jennifer Maria Andrade Santos", "Setor": "Residencial", "DPA": "102%", "ETIT": "100%", "Assertividade": "88%" },
  { "Matricula": "N5772086", "Nome": "Thiago Pereira da Silva", "Setor": "Residencial", "DPA": "108%", "ETIT": "100%", "Assertividade": "100%" },
  { "Matricula": "N0239871", "Nome": "Leonardo Ferreira Lima de Almeida", "Setor": "Residencial", "DPA": "87%", "ETIT": "77%", "Assertividade": "84%" },
  { "Matricula": "N5577565", "Nome": "Maristella Marcia dos Santos", "Setor": "Residencial", "DPA": "95%", "ETIT": "67%", "Assertividade": "69%" },
  { "Matricula": "N5737414", "Nome": "Sandro da Silva Carvalho", "Setor": "Residencial", "DPA": "89%", "ETIT": "95%", "Assertividade": "83%" },
  { "Matricula": "N5972428", "Nome": "Cristiane Hermogenes da Silva", "Setor": "Residencial", "DPA": "102%", "ETIT": "97%", "Assertividade": "89%" },
  { "Matricula": "N6173055", "Nome": "Jefferson Luis Gonçalves Coitinho", "Setor": "Residencial", "DPA": "87%", "ETIT": "77%", "Assertividade": "70%" },
  { "Matricula": "N5932090", "Nome": "Evilázio André de Magalhães Gomes Pereira", "Setor": "Residencial", "DPA": "89%", "ETIT": "-", "Assertividade": "75%" },
  { "Matricula": "N0255801", "Nome": "Elberton Aniceto Henrique", "Setor": "Residencial", "DPA": "91%", "ETIT": "100%", "Assertividade": "80%" },
  { "Matricula": "N4014011", "Nome": "Alan Marinho Dias", "Setor": "Residencial", "DPA": "91%", "ETIT": "95%", "Assertividade": "67%" },
  { "Matricula": "N5923996", "Nome": "Julio Cesar Santos Soares", "Setor": "Residencial", "DPA": "87%", "ETIT": "90%", "Assertividade": "88%" }
];

// Cache DOM elements
const matriculaInput = document.getElementById("matricula");
const resultadoDiv = document.getElementById("resultado");
const consultarBtn = document.getElementById("consultar-btn");

// Performance improvement: Create a lookup object
const employeeLookup = {};
employees.forEach(emp => {
  employeeLookup[emp.Matricula] = emp;
});

// Meta definitions
const METAS = {
  "ETIT": {
    "Móvel": 80,
    "Residencial": 85,
    "Empresarial": 85
  },
  "Assertividade": {
    "Móvel": 85,
    "Residencial": 70,
    "Empresarial": 70
  },
  "DPA": 90
};

function definirMeta(setor, tipo) {
  if (tipo === "DPA") return METAS.DPA;
  return METAS[tipo][setor] || METAS[tipo]["Residencial"];
}

function parseIndicatorValue(valor) {
  if (valor === "-" || valor === "Não informado") return null;
  return parseFloat(valor.replace("%", ""));
}

function considerarDentroMeta(valor, setor, tipo) {
  const valorNumerico = parseIndicatorValue(valor);
  if (valorNumerico === null) return true;
  return valorNumerico >= definirMeta(setor, tipo);
}

function formatarValor(valor, setor, tipo) {
  const valorNumerico = parseIndicatorValue(valor);
  if (valorNumerico === null) return "-";
  
  const meta = definirMeta(setor, tipo);
  const dentroDaMeta = valorNumerico >= meta;
  const color = dentroDaMeta ? "var(--success-color)" : "var(--warning-color)";
  return `<span style="color: ${color}; font-weight: ${!dentroDaMeta ? 'bold' : 'normal'}">${valor}</span> <small>(Meta: ${meta}%)</small>`;
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    consultar();
  }
}

function consultar() {
  const matricula = matriculaInput.value.trim().toUpperCase();
  resultadoDiv.innerHTML = "";
  
  if (!matricula) {
    resultadoDiv.innerHTML = "<p class='error'>Por favor, digite uma matrícula.</p>";
    return;
  }

  const empregado = employeeLookup[matricula];
  
  if (!empregado) {
    resultadoDiv.innerHTML = "<p class='error'>Matrícula não encontrada.</p>";
    return;
  }

  // Check indicators
  const etitOk = considerarDentroMeta(empregado.ETIT, empregado.Setor, "ETIT");
  const assertividadeOk = considerarDentroMeta(empregado.Assertividade, empregado.Setor, "Assertividade");
  const dpaOk = considerarDentroMeta(empregado.DPA, empregado.Setor, "DPA");
  const certificando = etitOk && assertividadeOk && dpaOk;

  // Display results
  resultadoDiv.innerHTML = `
    <div class="employee-info">
      <h2>${empregado.Nome}</h2>
      <p><strong>Setor:</strong> ${empregado.Setor}</p>
    </div>
    <div class="indicators">
      <p><strong>ETIT:</strong> ${formatarValor(empregado.ETIT, empregado.Setor, "ETIT")}</p>
      <p><strong>Assertividade:</strong> ${formatarValor(empregado.Assertividade, empregado.Setor, "Assertividade")}</p>
      <p><strong>DPA:</strong> ${formatarValor(empregado.DPA, empregado.Setor, "DPA")}</p>
    </div>
    <div class="certification ${certificando ? 'success' : 'warning'}">
      ${certificando ? '✅ Certificando' : '❌ Não certificando'}
    </div>
  `;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  matriculaInput.addEventListener('keypress', handleKeyPress);
  consultarBtn.addEventListener('click', consultar);
});
