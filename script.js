const employees = [
  { "Matricula": "N6104793", "Nome": "BRUNO MARIANO VILACA", "Setor": "MÓVEL", "DPA": "89%", "ETIT": "84%", "Assertividade": "98%" },
  { "Matricula": "N5931955", "Nome": "THIAGO DE SOUZA INACIO", "Setor": "MÓVEL", "DPA": "91%", "ETIT": "83%", "Assertividade": "94%" },
  { "Matricula": "N6173067", "Nome": "JULIANA RIBEIRO GALHÃO", "Setor": "MÓVEL", "DPA": "82%", "ETIT": "87%", "Assertividade": "96%" },
  { "Matricula": "N6071740", "Nome": "THIAGO BARBOZA DOS SANTOS", "Setor": "MÓVEL", "DPA": "85%", "ETIT": "84%", "Assertividade": "98%" },
  { "Matricula": "N6172207", "Nome": "CHARLES DOS SANTOS PAIVA", "Setor": "MÓVEL", "DPA": "78%", "ETIT": "-", "Assertividade": "-" },
  { "Matricula": "F204763", "Nome": "RODRIGO REIS DUARTE", "Setor": "MÓVEL", "DPA": "97%", "ETIT": "91%", "Assertividade": "95%" },
  { "Matricula": "N6088107", "Nome": "LEANDRO GONÇALVES DE CARVALHO", "Setor": "EMPRESARIAL", "DPA": "90%", "ETIT": "-", "Assertividade": "-" },
  { "Matricula": "N5619600", "Nome": "BRUNO COSTA BUCARD", "Setor": "EMPRESARIAL", "DPA": "91%", "ETIT": "-", "Assertividade": "-" },
  { "Matricula": "N0189105", "Nome": "IGOR MARCELINO DE MARINS", "Setor": "EMPRESARIAL", "DPA": "97%", "ETIT": "100%", "Assertividade": "-" },
  { "Matricula": "N5713690", "Nome": "GABRIELA TAVARES DA SILVA", "Setor": "EMPRESARIAL", "DPA": "95%", "ETIT": "100%", "Assertividade": "-" },
  { "Matricula": "N5802257", "Nome": "MAGNO FERRAREZ DE MORAIS", "Setor": "EMPRESARIAL", "DPA": "82%", "ETIT": "100%", "Assertividade": "-" },
  { "Matricula": "N5604148", "Nome": "DANIEL MARCELO FELISBERTO OLIVEIRA", "Setor": "EMPRESARIAL", "DPA": "-", "ETIT": "91%", "Assertividade": "-" },
  { "Matricula": "F201714", "Nome": "FERNANDA MESQUITA DE FREITAS", "Setor": "EMPRESARIAL", "DPA": "90%", "ETIT": "100%", "Assertividade": "-" },
  { "Matricula": "N0125317", "Nome": "ROBERTO SILVA DO NASCIMENTO", "Setor": "EMPRESARIAL", "DPA": "106%", "ETIT": "96%", "Assertividade": "-" },
  { "Matricula": "N5819183", "Nome": "RODRIGO PIRES BERNARDINO", "Setor": "EMPRESARIAL", "DPA": "77%", "ETIT": "100%", "Assertividade": "-" },
  { "Matricula": "N5926003", "Nome": "SUELLEN HERNANDEZ DA SILVA", "Setor": "EMPRESARIAL", "DPA": "-", "ETIT": "98%", "Assertividade": "-" },
  { "Matricula": "N5932064", "Nome": "MONICA DA SILVA RODRIGUES", "Setor": "EMPRESARIAL", "DPA": "108%", "ETIT": "100%", "Assertividade": "-" },
  { "Matricula": "N0238475", "Nome": "MARLEY MARQUES RIBEIRO", "Setor": "RESIDENCIAL", "DPA": "84%", "ETIT": "-", "Assertividade": "-" },
  { "Matricula": "N5923221", "Nome": "KELLY PINHEIRO LIRA", "Setor": "RESIDENCIAL", "DPA": "92%", "ETIT": "-", "Assertividade": "-" },
  { "Matricula": "F160641", "Nome": "JENNIFER MARIA ANDRADE SANTOS", "Setor": "RESIDENCIAL", "DPA": "101%", "ETIT": "100%", "Assertividade": "85%" },
  { "Matricula": "N5772086", "Nome": "THIAGO PEREIRA DA SILVA", "Setor": "RESIDENCIAL", "DPA": "98%", "ETIT": "100%", "Assertividade": "75%" },
  { "Matricula": "N0239871", "Nome": "LEONARDO FERREIRA LIMA DE ALMEIDA", "Setor": "RESIDENCIAL", "DPA": "90%", "ETIT": "84%", "Assertividade": "82%" },
  { "Matricula": "N5577565", "Nome": "MARISTELLA MARCIA DOS SANTOS", "Setor": "RESIDENCIAL", "DPA": "99%", "ETIT": "93%", "Assertividade": "68%" },
  { "Matricula": "N5737414", "Nome": "SANDRO DA SILVA CARVALHO", "Setor": "RESIDENCIAL", "DPA": "87%", "ETIT": "95%", "Assertividade": "78%" },
  { "Matricula": "N5972428", "Nome": "CRISTIANE HERMOGENES DA SILVA", "Setor": "RESIDENCIAL", "DPA": "99%", "ETIT": "96%", "Assertividade": "84%" },
  { "Matricula": "N6173055", "Nome": "JEFFERSON LUIS GONÇALVES COITINHO", "Setor": "RESIDENCIAL", "DPA": "80%", "ETIT": "93%", "Assertividade": "74%" },
  { "Matricula": "N5932090", "Nome": "EVILÁZIO ANDRÉ DE MAGALHÃES GOMES PEREIRA", "Setor": "RESIDENCIAL", "DPA": "93%", "ETIT": "-", "Assertividade": "69%" },
  { "Matricula": "N0255801", "Nome": "ELBERTON ANICETO HENRIQUE", "Setor": "RESIDENCIAL", "DPA": "92%", "ETIT": "96%", "Assertividade": "78%" },
  { "Matricula": "N4014011", "Nome": "ALAN MARINHO DIAS", "Setor": "RESIDENCIAL", "DPA": "90%", "ETIT": "96%", "Assertividade": "61%" },
  { "Matricula": "N5923996", "Nome": "JULIO CESAR SANTOS SOARES", "Setor": "RESIDENCIAL", "DPA": "87%", "ETIT": "95%", "Assertividade": "90%" }
];

// Cache DOM elements
const matriculaInput = document.getElementById("matricula");
const resultadoDiv = document.getElementById("resultado");
const consultarBtn = document.getElementById("consultar-btn");

// Create lookup object for faster searches
const employeeLookup = {};
employees.forEach(emp => {
  employeeLookup[emp.Matricula] = emp;
});

// Meta definitions
const METAS = {
  "ETIT": {
    "MÓVEL": 80,
    "RESIDENCIAL": 85,
    "EMPRESARIAL": 85
  },
  "Assertividade": {
    "MÓVEL": 85,
    "RESIDENCIAL": 70,
    "EMPRESARIAL": 70  // Added Empresarial goal for Assertividade
  },
  "DPA": {
    "CERTIFICACAO": 85,
    "INDIVIDUAL": 90
  }
};

function definirMeta(setor, tipo) {
  if (tipo === "DPA") {
    return {
      certificacao: METAS.DPA.CERTIFICACAO,
      individual: METAS.DPA.INDIVIDUAL
    };
  }
  if (tipo === "ETIT") return METAS.ETIT[setor] || 0;
  return METAS.Assertividade[setor] || 0;
}

function parseIndicatorValue(valor) {
  if (valor === "-" || valor === "Não informado") return null;
  return parseFloat(valor.replace("%", ""));
}

function considerarDentroMeta(valor, setor, tipo, metaType = "individual") {
  const valorNumerico = parseIndicatorValue(valor);
  if (valorNumerico === null) return true; // Consider as meeting goal if not informed
  
  const meta = tipo === "DPA" 
    ? definirMeta(setor, tipo)[metaType]
    : definirMeta(setor, tipo);
    
  return valorNumerico >= meta;
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

  // Normalize sector name to match meta keys
  const setor = empregado.Setor.toUpperCase();
  
  // Check indicators
  const etitOk = considerarDentroMeta(empregado.ETIT, setor, "ETIT");
  const assertividadeOk = considerarDentroMeta(empregado.Assertividade, setor, "Assertividade");
  const dpaCertificando = considerarDentroMeta(empregado.DPA, setor, "DPA", "certificacao");
  const dpaMetaIndividual = considerarDentroMeta(empregado.DPA, setor, "DPA", "individual");
  
  const certificando = etitOk && assertividadeOk && dpaCertificando;
  const mensagemDPA = !dpaMetaIndividual && dpaCertificando ? 
    '<div class="meta-warning">Certificando, mas abaixo da meta individual (90%)</div>' : 
    '';

  // Display results with new aligned layout
  resultadoDiv.innerHTML = 
    `<div class="employee-info">
      <h2>${empregado.Nome}</h2>
      <p><strong>Setor:</strong> ${empregado.Setor}</p>
    </div>
    
    <div class="indicator-row">
      <span class="indicator-name">ETIT:</span>
      <span class="indicator-value ${etitOk ? '' : 'warning'}">${empregado.ETIT}</span>
      <span class="meta-value">(Meta: ${definirMeta(setor, "ETIT")}%)</span>
    </div>
    
    <div class="indicator-row">
      <span class="indicator-name">Assertividade:</span>
      <span class="indicator-value ${assertividadeOk ? '' : 'warning'}">${empregado.Assertividade}</span>
      <span class="meta-value">(Meta: ${definirMeta(setor, "Assertividade")}%)</span>
    </div>
    
    <div class="indicator-row dpa-info">
      <span class="indicator-name">DPA:</span>
      <span class="indicator-value ${dpaMetaIndividual ? '' : 'warning'}">${empregado.DPA}</span>
      <span class="meta-value">(Meta Individual: ${METAS.DPA.INDIVIDUAL}%, Certificação: ${METAS.DPA.CERTIFICACAO}%)</span>
    </div>
    ${mensagemDPA}
    
    <div class="certification ${certificando ? 'success' : 'warning'}">
      ${certificando ? '✅ Certificando' : '❌ Não certificando'}
    </div>`;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  matriculaInput.addEventListener('keypress', handleKeyPress);
  consultarBtn.addEventListener('click', consultar);
});
