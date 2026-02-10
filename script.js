const employees = [
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

// === NOVA CAMADA DE DADOS - INCIDENTES (Supabase Storage) ===

// Mapeamento de matrículas alternativas por analista
// Chave = matrícula principal, Valor = array de matrículas extras nos dados de incidentes
const ALIAS_MATRICULAS = {
  'N6173055': ['N6105010']  // Jefferson usa N6105010 para ETIT
};

// Dados carregados da nuvem
let dadosEmpresarial = [];
let dadosResidencial = [];

function carregarDadosNuvem() {
  if (typeof SUPABASE_URL === 'undefined' || !SUPABASE_URL) return;
  const base = SUPABASE_URL + '/storage/v1/object/public/dados';

  fetch(base + '/dados_empresarial.json')
    .then(r => r.ok ? r.json() : [])
    .then(data => { dadosEmpresarial = data; })
    .catch(() => {});

  fetch(base + '/dados_residencial.json')
    .then(r => r.ok ? r.json() : [])
    .then(data => { dadosResidencial = data; })
    .catch(() => {});
}

function buscarIncidentes(matricula, setor) {
  const dados = setor === 'EMPRESARIAL' ? dadosEmpresarial : dadosResidencial;
  const campoLogin = setor === 'EMPRESARIAL' ? 'LOGIN_ACIONOU' : 'LOGIN_ACIONAMENTO';
  const matriculaUp = matricula.toUpperCase();
  const aliases = ALIAS_MATRICULAS[matriculaUp] || [];
  const allMatriculas = [matriculaUp, ...aliases.map(a => a.toUpperCase())];
  return dados.filter(d =>
    d[campoLogin] && allMatriculas.includes(d[campoLogin].toString().toUpperCase())
  );
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
      const toggleId = 'toggle-' + indicador.replace(/\s+/g, '-');
      html += `<div class="incidentes-nao-aderentes">
        <button class="incidentes-toggle" onclick="toggleIncidentes('${toggleId}')" aria-expanded="false" aria-controls="${toggleId}">
          <span>Ver incidentes não aderentes (${totalNao})</span>
          <svg class="toggle-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="incidentes-lista" id="${toggleId}">`;
      dados.naoAderentes.forEach(inc => {
        html += setor === 'EMPRESARIAL'
          ? renderIncidenteEmpresarial(inc)
          : renderIncidenteResidencial(inc);
      });
      html += '</div></div>';
    }

    html += '</div>';
  }

  html += '</div>';
  return html;
}

function toggleIncidentes(id) {
  const lista = document.getElementById(id);
  const btn = lista.previousElementSibling;
  const isOpen = lista.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    consultar();
  }
}

function getInitials(nome) {
  const parts = nome.split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0][0].toUpperCase();
}

function buildIndicatorCard(label, valor, metaTexto, metaNum, isOk, isNa) {
  const status = isNa ? 'na' : (isOk ? 'ok' : 'fail');
  const valorNum = parseIndicatorValue(valor);
  const pct = (valorNum !== null && metaNum) ? Math.min(Math.round((valorNum / metaNum) * 100), 100) : 0;
  const displayVal = isNa ? 'N/A' : formatarValor(valor);

  let progressHtml = '';
  if (!isNa && valorNum !== null && metaNum) {
    progressHtml = `<div class="progress-track"><div class="progress-fill ${status}" style="width:${pct}%"></div></div>`;
  }

  return `<div class="indicator-card ${status}">
    <div class="indicator-label">${label}</div>
    <div class="indicator-value-row">
      <span class="indicator-big ${status}">${displayVal}</span>
      <span class="indicator-meta">${metaTexto}</span>
    </div>
    ${progressHtml}
  </div>`;
}

function calcularMetricasDeIncidentes(incidentes) {
  const grupos = {};
  incidentes.forEach(inc => {
    const nome = (inc.INDICADOR_NOME || '').toUpperCase();
    if (!grupos[nome]) grupos[nome] = { aderentes: 0, total: 0 };
    grupos[nome].total++;
    if (inc.INDICADOR === 1) grupos[nome].aderentes++;
  });

  let etit = null, dpa = null, assertividade = null;

  for (const [nome, dados] of Object.entries(grupos)) {
    if (dados.total === 0) continue;
    const pct = Math.round((dados.aderentes / dados.total) * 100);
    if (nome.includes('ETIT')) etit = pct;
    else if (nome.includes('DPA')) dpa = pct;
    else if (nome.includes('ASSERT')) assertividade = pct;
  }

  return { etit, dpa, assertividade };
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

  // Buscar incidentes e calcular métricas dinâmicas
  const incidentes = buscarIncidentes(matricula, setor);
  const metricsCalc = calcularMetricasDeIncidentes(incidentes);

  // Usar valores calculados quando o hardcoded for "-"
  const etitVal = (empregado.ETIT === '-' && metricsCalc.etit !== null)
    ? metricsCalc.etit + '%' : empregado.ETIT;
  const dpaVal = (empregado.DPA === '-' && metricsCalc.dpa !== null)
    ? metricsCalc.dpa + '%' : empregado.DPA;
  const assertVal = (empregado.Assertividade === '-' && metricsCalc.assertividade !== null)
    ? metricsCalc.assertividade + '%' : empregado.Assertividade;

  // Check indicators com valores atualizados
  const etitOk = considerarDentroMeta(etitVal, setor, "ETIT");
  const assertividadeOk = setor === "EMPRESARIAL" ? null : considerarDentroMeta(assertVal, setor, "Assertividade");
  const dpaCertificando = considerarDentroMeta(dpaVal, setor, "DPA", "certificacao");
  const dpaMetaIndividual = considerarDentroMeta(dpaVal, setor, "DPA", "individual");

  const certificando = etitOk &&
                     (setor === "EMPRESARIAL" || assertividadeOk) &&
                     dpaCertificando;

  const initials = getInitials(empregado.Nome);
  const etitMeta = definirMeta(setor, "ETIT");
  const assertMeta = definirMeta(setor, "Assertividade");
  const isAssertNA = setor === "EMPRESARIAL";

  // Employee header
  let html = `<div class="employee-header">
    <div class="employee-avatar">${initials}</div>
    <div class="employee-details">
      <div class="employee-name">${empregado.Nome}</div>
      <span class="employee-setor">${empregado.Setor}</span>
    </div>
  </div>`;

  // Indicator cards com valores dinâmicos
  html += '<div class="indicators-grid">';
  html += buildIndicatorCard('ETIT', etitVal, `Meta ${etitMeta}%`, etitMeta, etitOk, false);
  html += buildIndicatorCard('DPA', dpaVal, `Meta ${METAS.DPA.INDIVIDUAL}%`, METAS.DPA.INDIVIDUAL, dpaMetaIndividual, false);
  html += buildIndicatorCard(
    'Assertividade',
    isAssertNA ? 'N/A' : assertVal,
    isAssertNA ? 'Não se aplica' : `Meta ${assertMeta}%`,
    assertMeta,
    isAssertNA ? true : assertividadeOk,
    isAssertNA
  );
  html += '</div>';

  // DPA warning
  if (!dpaMetaIndividual && dpaCertificando) {
    html += '<div class="meta-warning">Certificando, mas abaixo da meta individual de DPA (90%)</div>';
  }

  // Certification banner + data de última atualização (from footer element)
  const dataAtualizacaoEl = document.getElementById('data-atualizacao');
  const dataAtualizacao = dataAtualizacaoEl ? dataAtualizacaoEl.textContent : '';

  html += `<div class="cert-banner ${certificando ? 'success' : 'warning'}">
    ${certificando ? '&#10003; Certificando' : '&#10007; N\u00e3o certificando'}
    ${dataAtualizacao ? `<div class="cert-ref">Atualizado em ${dataAtualizacao}</div>` : ''}
  </div>`;

  // Resumo de ETITs do analista
  if (incidentes.length > 0) {
    const totalInc = incidentes.length;
    const ganhos = incidentes.filter(i => i.INDICADOR === 1).length;
    const perdidos = totalInc - ganhos;
    const pctAd = Math.round((ganhos / totalInc) * 100);
    const agora = new Date();
    const mesAnterior = new Date(agora.getFullYear(), agora.getMonth() - 1, 1);
    const nomeMes = mesAnterior.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
    const mesRef = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);
    html += `<div class="edits-resumo">
      <div class="edits-resumo-title">Resumo de ETITs</div>
      <div class="edits-resumo-subtitle">Refer\u00eancia: ${mesRef}</div>
      <div class="edits-resumo-grid">
        <div class="edits-resumo-item">
          <div class="edits-resumo-num" style="color:var(--text)">${totalInc}</div>
          <div class="edits-resumo-label">Total</div>
        </div>
        <div class="edits-resumo-item">
          <div class="edits-resumo-num" style="color:var(--green)">${ganhos}</div>
          <div class="edits-resumo-label">Ganhos</div>
        </div>
        <div class="edits-resumo-item">
          <div class="edits-resumo-num" style="color:var(--red)">${perdidos}</div>
          <div class="edits-resumo-label">Perdidos</div>
        </div>
        <div class="edits-resumo-item">
          <div class="edits-resumo-num" style="color:var(--orange)">${pctAd}%</div>
          <div class="edits-resumo-label">Ader\u00eancia</div>
        </div>
      </div>
    </div>`;
  }

  resultadoDiv.innerHTML = html;

  // === Exibir detalhamento de incidentes ===
  if (incidentes.length > 0) {
    const grupos = agruparPorIndicador(incidentes);
    resultadoDiv.insertAdjacentHTML('beforeend', renderSecaoIncidentes(grupos, setor));
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  carregarDadosNuvem();
  matriculaInput.addEventListener('keypress', handleKeyPress);
  consultarBtn.addEventListener('click', consultar);
});
