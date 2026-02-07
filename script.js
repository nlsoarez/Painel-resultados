const employees = [
  { "Matricula": "N6088107", "Nome": "LEANDRO GONÇALVES DE CARVALHO", "Setor": "EMPRESARIAL", "ETIT": "-", "DPA": "77%", "Assertividade": "-" },
  { "Matricula": "N5619600", "Nome": "BRUNO COSTA BUCARD", "Setor": "EMPRESARIAL", "ETIT": "-", "DPA": "63%", "Assertividade": "-" },
  { "Matricula": "N0238475", "Nome": "MARLEY MARQUES RIBEIRO", "Setor": "RESIDENCIAL", "ETIT": "-", "DPA": "61%", "Assertividade": "-" },
  { "Matricula": "N0189105", "Nome": "IGOR MARCELINO DE MARINS", "Setor": "EMPRESARIAL", "ETIT": "94%", "DPA": "54%", "Assertividade": "-" },
  { "Matricula": "N5737414", "Nome": "SANDRO DA SILVA CARVALHO", "Setor": "EMPRESARIAL", "ETIT": "96%", "DPA": "70%", "Assertividade": "-" },
  { "Matricula": "N5713690", "Nome": "GABRIELA TAVARES DA SILVA", "Setor": "EMPRESARIAL", "ETIT": "100%", "DPA": "75%", "Assertividade": "-" },
  { "Matricula": "N5802257", "Nome": "MAGNO FERRAREZ DE MORAIS", "Setor": "EMPRESARIAL", "ETIT": "100%", "DPA": "58%", "Assertividade": "-" },
  { "Matricula": "F201714", "Nome": "FERNANDA MESQUITA DE FREITAS", "Setor": "EMPRESARIAL", "ETIT": "-", "DPA": "-", "Assertividade": "-" },
  { "Matricula": "N6173055", "Nome": "JEFFERSON LUIS GONÇALVES COITINHO", "Setor": "EMPRESARIAL", "ETIT": "-", "DPA": "86%", "Assertividade": "-" },
  { "Matricula": "N0125317", "Nome": "ROBERTO SILVA DO NASCIMENTO", "Setor": "EMPRESARIAL", "ETIT": "-", "DPA": "29%", "Assertividade": "-" },
  { "Matricula": "F218860", "Nome": "ALDENES MARQUES IDALINO DA SILVA", "Setor": "EMPRESARIAL", "ETIT": "100%", "DPA": "75%", "Assertividade": "-" },
  { "Matricula": "N5819183", "Nome": "RODRIGO PIRES BERNARDINO", "Setor": "EMPRESARIAL", "ETIT": "92%", "DPA": "65%", "Assertividade": "-" },
  { "Matricula": "N5926003", "Nome": "SUELLEN HERNANDEZ DA SILVA", "Setor": "EMPRESARIAL", "ETIT": "75%", "DPA": "-", "Assertividade": "-" },
  { "Matricula": "N5932064", "Nome": "MONICA DA SILVA RODRIGUES", "Setor": "EMPRESARIAL", "ETIT": "86%", "DPA": "105%", "Assertividade": "-" },
  { "Matricula": "N5923221", "Nome": "KELLY PINHEIRO LIRA", "Setor": "RESIDENCIAL", "ETIT": "-", "DPA": "55%", "Assertividade": "-" },
  { "Matricula": "N5772086", "Nome": "THIAGO PEREIRA DA SILVA", "Setor": "RESIDENCIAL", "ETIT": "100%", "DPA": "85%", "Assertividade": "100%" },
  { "Matricula": "N0239871", "Nome": "LEONARDO FERREIRA LIMA DE ALMEIDA", "Setor": "RESIDENCIAL", "ETIT": "100%", "DPA": "100%", "Assertividade": "100%" },
  { "Matricula": "N5577565", "Nome": "MARISTELLA MARCIA DOS SANTOS", "Setor": "RESIDENCIAL", "ETIT": "100%", "DPA": "86%", "Assertividade": "100%" },
  { "Matricula": "N5972428", "Nome": "CRISTIANE HERMOGENES DA SILVA", "Setor": "RESIDENCIAL", "ETIT": "100%", "DPA": "82%", "Assertividade": "91%" },
  { "Matricula": "N4014011", "Nome": "ALAN MARINHO DIAS", "Setor": "RESIDENCIAL", "ETIT": "-", "DPA": "20%", "Assertividade": "-" },
  { "Matricula": "F106664", "Nome": "RAISSA LIMA DE OLIVEIRA", "Setor": "RESIDENCIAL", "ETIT": "50%", "DPA": "80%", "Assertividade": "100%" }
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

// Controle de consulta para evitar race conditions
let consultaAtual = 0;

// Meta definitions - Updated with new targets
const METAS = {
  "ETIT": {
    "MÓVEL": 80,
    "RESIDENCIAL": 90,
    "EMPRESARIAL": 90
  },
  "Assertividade": {
    "MÓVEL": 85,
    "RESIDENCIAL": 70,
    "EMPRESARIAL": null // Não se aplica
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
  const setorNormalizado = setor.toUpperCase();
  if (tipo === "ETIT") return METAS.ETIT[setorNormalizado] || 0;
  return METAS.Assertividade[setorNormalizado] || 0;
}

function parseIndicatorValue(valor) {
  if (valor === "-" || valor === "–" || valor === "_" || valor === "Não informado") return null;
  return parseFloat(valor.replace("%", "").replace(",", "."));
}

function considerarDentroMeta(valor, setor, tipo, metaType = "individual") {
  const setorNormalizado = setor.toUpperCase();
  
  // Assertividade não se aplica ao setor EMPRESARIAL
  if (tipo === "Assertividade" && setorNormalizado === "EMPRESARIAL") {
    return true; // Considera como dentro da meta pois não se aplica
  }
  
  const valorNumerico = parseIndicatorValue(valor);
  // Valores não numéricos são considerados como dentro da meta
  if (valorNumerico === null) return true;
  
  const meta = tipo === "DPA" 
    ? definirMeta(setor, tipo)[metaType]
    : definirMeta(setor, tipo);
    
  return valorNumerico >= meta;
}

function formatarValor(valor) {
  // Mantém a exibição original para valores não numéricos
  if (valor === "-" || valor === "–" || valor === "_" || valor === "Não informado") return valor;
  return valor;
}

// === NOVA CAMADA DE DADOS - INCIDENTES ===

async function carregarIncidentes(matricula, setor) {
  const arquivo = setor === 'EMPRESARIAL' ? 'dados_empresarial.json' : 'dados_residencial.json';
  try {
    const response = await fetch(arquivo);
    if (!response.ok) return [];
    const dados = await response.json();
    const campoLogin = setor === 'EMPRESARIAL' ? 'LOGIN_ACIONOU' : 'LOGIN_ACIONAMENTO';
    return dados.filter(d =>
      d[campoLogin] && d[campoLogin].toString().toUpperCase() === matricula.toUpperCase()
    );
  } catch {
    return [];
  }
}

function agruparPorIndicador(incidentes) {
  const grupos = {};
  incidentes.forEach(inc => {
    const nome = inc.INDICADOR_NOME;
    if (!grupos[nome]) grupos[nome] = { aderentes: [], naoAderentes: [] };
    if (inc.INDICADOR === 1) {
      grupos[nome].aderentes.push(inc);
    } else {
      grupos[nome].naoAderentes.push(inc);
    }
  });
  return grupos;
}

function formatarDataIncidente(dataStr) {
  if (!dataStr) return '-';
  const d = new Date(dataStr);
  if (isNaN(d.getTime())) return '-';
  return d.toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function renderIncidenteEmpresarial(inc) {
  return `<div class="incidente-card">
    <div class="incidente-header">${inc.NOTA || '-'}</div>
    <div class="incidente-grid">
      <div class="incidente-detalhe"><strong>Data:</strong> ${formatarDataIncidente(inc.DT_ACIONAMENTO)}</div>
      <div class="incidente-detalhe"><strong>Local:</strong> ${inc.IN_CIDADE_UF || '-'}</div>
      <div class="incidente-detalhe"><strong>Causa:</strong> ${inc.CAUSA || '-'}</div>
      <div class="incidente-detalhe"><strong>Tempo p/ acionar:</strong> ${inc.TEMPO_PARA_ACIONAR != null ? inc.TEMPO_PARA_ACIONAR + ' min' : '-'}</div>
      <div class="incidente-detalhe"><strong>Tipo RAL:</strong> ${inc.TIPO_RAL || '-'}</div>
      <div class="incidente-detalhe"><strong>Área:</strong> ${inc.AREA_ENVOLVIDA || '-'}</div>
    </div>
  </div>`;
}

function renderIncidenteResidencial(inc) {
  return `<div class="incidente-card">
    <div class="incidente-header">${inc.OUTAGE || '-'}</div>
    <div class="incidente-grid">
      <div class="incidente-detalhe"><strong>Data:</strong> ${formatarDataIncidente(inc.DT_ACIONAMENTO)}</div>
      <div class="incidente-detalhe"><strong>Local:</strong> ${inc.IN_CIDADE_UF || '-'}</div>
      <div class="incidente-detalhe"><strong>Tecnologia:</strong> ${inc.TECNOLOGIA || '-'}</div>
      <div class="incidente-detalhe"><strong>Natureza:</strong> ${inc.NATUREZA || '-'}</div>
      <div class="incidente-detalhe"><strong>Sintoma:</strong> ${inc.SINTOMA || '-'}</div>
      <div class="incidente-detalhe"><strong>Fechamento:</strong> ${inc.FECHAMENTO || '-'}</div>
      <div class="incidente-detalhe"><strong>Solução:</strong> ${inc.SOLUCAO || '-'}</div>
    </div>
  </div>`;
}

function renderSecaoIncidentes(grupos, setor) {
  let html = '<div class="incidentes-section"><h3>Detalhamento de Incidentes</h3>';

  for (const [indicador, dados] of Object.entries(grupos)) {
    const totalAd = dados.aderentes.length;
    const totalNao = dados.naoAderentes.length;
    const total = totalAd + totalNao;

    html += `<div class="indicador-grupo">
      <div class="indicador-grupo-titulo">${indicador}</div>
      <div class="indicador-resumo">
        <span class="badge aderente">Aderentes: ${totalAd}</span>
        <span class="badge nao-aderente">Não Aderentes: ${totalNao}</span>
        <span class="badge total">Total: ${total}</span>
      </div>`;

    if (totalNao > 0) {
      html += '<div class="incidentes-nao-aderentes">';
      html += '<p class="incidentes-subtitulo">Incidentes Não Aderentes:</p>';
      dados.naoAderentes.forEach(inc => {
        html += setor === 'EMPRESARIAL'
          ? renderIncidenteEmpresarial(inc)
          : renderIncidenteResidencial(inc);
      });
      html += '</div>';
    }

    html += '</div>';
  }

  html += '</div>';
  return html;
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

  const setor = empregado.Setor.toUpperCase();
  
  // Check indicators
  const etitOk = considerarDentroMeta(empregado.ETIT, setor, "ETIT");
  const assertividadeOk = setor === "EMPRESARIAL" ? null : considerarDentroMeta(empregado.Assertividade, setor, "Assertividade");
  const dpaCertificando = considerarDentroMeta(empregado.DPA, setor, "DPA", "certificacao");
  const dpaMetaIndividual = considerarDentroMeta(empregado.DPA, setor, "DPA", "individual");
  
  // Para certificação, Assertividade não conta para EMPRESARIAL
  const certificando = etitOk && 
                     (setor === "EMPRESARIAL" || assertividadeOk) && 
                     dpaCertificando;
  
  const mensagemDPA = !dpaMetaIndividual && dpaCertificando ? 
    '<div class="meta-warning">Certificando, mas abaixo da meta individual (90%)</div>' : 
    '';

  // Format Assertividade display differently for EMPRESARIAL
  const assertividadeDisplay = setor === "EMPRESARIAL" ?
    `<div class="indicator-row">
      <span class="indicator-name">Assertividade:</span>
      <span class="indicator-value not-applicable">N/A</span>
      <span class="meta-value">(Não se aplica)</span>
    </div>` :
    `<div class="indicator-row">
      <span class="indicator-name">Assertividade:</span>
      <span class="indicator-value ${assertividadeOk ? '' : 'warning'}">${formatarValor(empregado.Assertividade)}</span>
      <span class="meta-value">(Meta: ${definirMeta(setor, "Assertividade")}%)</span>
    </div>`;

  // Display results
  resultadoDiv.innerHTML = 
    `<div class="employee-info">
      <h2>${empregado.Nome}</h2>
      <p><strong>Setor:</strong> ${empregado.Setor}</p>
    </div>
    
    <div class="indicator-row">
      <span class="indicator-name">ETIT:</span>
      <span class="indicator-value ${etitOk ? '' : 'warning'}">${formatarValor(empregado.ETIT)}</span>
      <span class="meta-value">(Meta: ${definirMeta(setor, "ETIT")}%)</span>
    </div>
    
    ${assertividadeDisplay}
    
    <div class="indicator-row dpa-info">
      <span class="indicator-name">DPA:</span>
      <span class="indicator-value ${dpaMetaIndividual ? '' : 'warning'}">${formatarValor(empregado.DPA)}</span>
      <span class="meta-value">(Meta Individual: ${METAS.DPA.INDIVIDUAL}%, Certificação: ${METAS.DPA.CERTIFICACAO}%)</span>
    </div>
    ${mensagemDPA}
    
    <div class="certification ${certificando ? 'success' : 'warning'}">
      ${certificando ? '✅ Certificando' : '❌ Não certificando'}
    </div>`;

  // === Carregar detalhamento de incidentes ===
  const idConsulta = ++consultaAtual;
  resultadoDiv.insertAdjacentHTML('beforeend',
    '<div id="incidentes-loading" class="incidentes-loading">Carregando detalhamento de incidentes...</div>');

  carregarIncidentes(matricula, setor).then(incidentes => {
    if (idConsulta !== consultaAtual) return;
    const loadingEl = document.getElementById('incidentes-loading');
    if (loadingEl) loadingEl.remove();
    if (incidentes.length > 0) {
      const grupos = agruparPorIndicador(incidentes);
      resultadoDiv.insertAdjacentHTML('beforeend', renderSecaoIncidentes(grupos, setor));
    }
  });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  matriculaInput.addEventListener('keypress', handleKeyPress);
  consultarBtn.addEventListener('click', consultar);
});
