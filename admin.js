// =============================================
// Dados da equipe (mesma fonte do script.js)
// =============================================
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

// =============================================
// Metas (mesma lógica do script.js)
// =============================================
const METAS = {
  ETIT: { "MÓVEL": 80, "RESIDENCIAL": 90, "EMPRESARIAL": 90 },
  Assertividade: { "MÓVEL": 85, "RESIDENCIAL": 70, "EMPRESARIAL": null },
  DPA: { CERTIFICACAO: 85, INDIVIDUAL: 90 }
};

function parseVal(v) {
  if (!v || v === '-' || v === '–' || v === '_') return null;
  return parseFloat(v.replace('%', '').replace(',', '.'));
}

function metaOk(valor, setor, tipo, metaType) {
  const s = setor.toUpperCase();
  if (tipo === 'Assertividade' && s === 'EMPRESARIAL') return true;
  const num = parseVal(valor);
  if (num === null) return true;
  if (tipo === 'DPA') return num >= METAS.DPA[metaType === 'cert' ? 'CERTIFICACAO' : 'INDIVIDUAL'];
  if (tipo === 'ETIT') return num >= (METAS.ETIT[s] || 0);
  return num >= (METAS.Assertividade[s] || 0);
}

function isCertificando(emp) {
  const s = emp.Setor.toUpperCase();
  const etitOk = metaOk(emp.ETIT, s, 'ETIT');
  const assertOk = s === 'EMPRESARIAL' ? true : metaOk(emp.Assertividade, s, 'Assertividade');
  const dpaOk = metaOk(emp.DPA, s, 'DPA', 'cert');
  return etitOk && assertOk && dpaOk;
}

function getInitials(nome) {
  const p = nome.split(' ');
  return p.length >= 2 ? (p[0][0] + p[p.length - 1][0]).toUpperCase() : p[0][0].toUpperCase();
}

function firstName(nome) {
  const parts = nome.split(' ');
  return parts[0].charAt(0) + parts[0].slice(1).toLowerCase();
}

// =============================================
// Análise da equipe
// =============================================
function analyzeTeam() {
  const certificando = [];
  const naoCertificando = [];

  employees.forEach(emp => {
    const cert = isCertificando(emp);
    const s = emp.Setor.toUpperCase();
    const problems = [];

    if (!metaOk(emp.ETIT, s, 'ETIT')) problems.push('ETIT');
    if (!metaOk(emp.DPA, s, 'DPA', 'cert')) problems.push('DPA');
    if (s !== 'EMPRESARIAL' && !metaOk(emp.Assertividade, s, 'Assertividade')) problems.push('Assert.');

    const obj = { ...emp, cert, problems };
    if (cert) certificando.push(obj);
    else naoCertificando.push(obj);
  });

  // Média DPA da equipe
  let dpaSoma = 0, dpaCount = 0;
  employees.forEach(emp => {
    const v = parseVal(emp.DPA);
    if (v !== null) { dpaSoma += v; dpaCount++; }
  });
  const mediaDpa = dpaCount > 0 ? Math.round(dpaSoma / dpaCount) : 0;

  return { certificando, naoCertificando, mediaDpa };
}

// =============================================
// Render Dashboard
// =============================================
function renderDashboard() {
  const { certificando, naoCertificando, mediaDpa } = analyzeTeam();
  const total = employees.length;

  // KPI cards
  document.getElementById('kpi-row').innerHTML = `
    <div class="kpi-card">
      <div class="kpi-icon team">&#128101;</div>
      <div class="kpi-number">${total}</div>
      <div class="kpi-label">Colaboradores</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon cert">&#10003;</div>
      <div class="kpi-number" style="color:var(--green)">${certificando.length}</div>
      <div class="kpi-label">Certificando</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon alert">&#10007;</div>
      <div class="kpi-number" style="color:var(--red)">${naoCertificando.length}</div>
      <div class="kpi-label">N&atilde;o Certificando</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-icon avg">&#9646;</div>
      <div class="kpi-number" style="color:var(--orange)">${mediaDpa}%</div>
      <div class="kpi-label">M&eacute;dia DPA</div>
    </div>
  `;

  // Destaques (certificando)
  const destaquesEl = document.getElementById('destaques-list');
  if (certificando.length === 0) {
    destaquesEl.innerHTML = '<div class="empty-state"><p>Nenhum colaborador certificando</p></div>';
  } else {
    destaquesEl.innerHTML = certificando.map(emp => `
      <div class="emp-row">
        <div class="emp-avatar green">${getInitials(emp.Nome)}</div>
        <div class="emp-info">
          <div class="emp-name-sm">${firstName(emp.Nome)} — ${emp.Setor}</div>
          <div class="emp-badges">
            <span class="mini-badge ok">ETIT ${emp.ETIT}</span>
            <span class="mini-badge ok">DPA ${emp.DPA}</span>
            ${emp.Setor.toUpperCase() !== 'EMPRESARIAL'
              ? `<span class="mini-badge ok">Assert. ${emp.Assertividade}</span>`
              : ''}
          </div>
        </div>
      </div>
    `).join('');
  }

  // Pontos de atenção (não certificando)
  const atencaoEl = document.getElementById('atencao-list');
  if (naoCertificando.length === 0) {
    atencaoEl.innerHTML = '<div class="empty-state"><p>Todos certificando!</p></div>';
  } else {
    atencaoEl.innerHTML = naoCertificando.map(emp => {
      const badges = [];
      const s = emp.Setor.toUpperCase();
      // ETIT
      const etitV = parseVal(emp.ETIT);
      const etitOk = metaOk(emp.ETIT, s, 'ETIT');
      badges.push(`<span class="mini-badge ${etitOk ? 'ok' : 'fail'}">ETIT ${emp.ETIT}</span>`);
      // DPA
      const dpaOk = metaOk(emp.DPA, s, 'DPA', 'cert');
      badges.push(`<span class="mini-badge ${dpaOk ? 'ok' : 'fail'}">DPA ${emp.DPA}</span>`);
      // Assert
      if (s !== 'EMPRESARIAL') {
        const assOk = metaOk(emp.Assertividade, s, 'Assertividade');
        badges.push(`<span class="mini-badge ${assOk ? 'ok' : 'fail'}">Assert. ${emp.Assertividade}</span>`);
      }

      return `<div class="emp-row">
        <div class="emp-avatar red">${getInitials(emp.Nome)}</div>
        <div class="emp-info">
          <div class="emp-name-sm">${firstName(emp.Nome)} — ${emp.Setor}</div>
          <div class="emp-detail">Aten&ccedil;&atilde;o: ${emp.problems.join(', ')}</div>
          <div class="emp-badges">${badges.join('')}</div>
        </div>
      </div>`;
    }).join('');
  }
}

// =============================================
// Render Table (individual)
// =============================================
let currentFilter = 'TODOS';
let currentSearch = '';
let sortCol = null;
let sortAsc = true;

function renderTable() {
  let data = employees.map(emp => {
    const s = emp.Setor.toUpperCase();
    return {
      ...emp,
      cert: isCertificando(emp),
      etitOk: metaOk(emp.ETIT, s, 'ETIT'),
      dpaOk: metaOk(emp.DPA, s, 'DPA', 'individual'),
      assertOk: s === 'EMPRESARIAL' ? null : metaOk(emp.Assertividade, s, 'Assertividade'),
      isAssertNA: s === 'EMPRESARIAL'
    };
  });

  // Filter by setor
  if (currentFilter !== 'TODOS') {
    data = data.filter(d => d.Setor.toUpperCase() === currentFilter);
  }

  // Filter by name
  if (currentSearch) {
    const term = currentSearch.toLowerCase();
    data = data.filter(d => d.Nome.toLowerCase().includes(term));
  }

  // Sort
  if (sortCol) {
    data.sort((a, b) => {
      let va, vb;
      if (sortCol === 'status') {
        va = a.cert ? 1 : 0;
        vb = b.cert ? 1 : 0;
      } else if (['ETIT', 'DPA', 'Assertividade'].includes(sortCol)) {
        va = parseVal(a[sortCol]);
        vb = parseVal(b[sortCol]);
        if (va === null) va = -1;
        if (vb === null) vb = -1;
      } else {
        va = a[sortCol] || '';
        vb = b[sortCol] || '';
      }
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });
  }

  const tbody = document.getElementById('team-tbody');
  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px">Nenhum resultado</td></tr>';
    return;
  }

  tbody.innerHTML = data.map(d => {
    const etitClass = d.etitOk ? 'val-ok' : 'val-fail';
    const dpaClass = d.dpaOk ? 'val-ok' : 'val-fail';
    let assertClass = 'val-na';
    if (!d.isAssertNA) assertClass = d.assertOk ? 'val-ok' : 'val-fail';

    const etitDisplay = d.ETIT === '-' ? '<span class="val-na">-</span>' : `<span class="${etitClass}">${d.ETIT}</span>`;
    const dpaDisplay = d.DPA === '-' ? '<span class="val-na">-</span>' : `<span class="${dpaClass}">${d.DPA}</span>`;
    const assertDisplay = d.isAssertNA ? '<span class="val-na">N/A</span>'
      : d.Assertividade === '-' ? '<span class="val-na">-</span>'
      : `<span class="${assertClass}">${d.Assertividade}</span>`;

    return `<tr>
      <td><strong>${d.Nome}</strong></td>
      <td>${d.Setor}</td>
      <td>${etitDisplay}</td>
      <td>${dpaDisplay}</td>
      <td>${assertDisplay}</td>
      <td><span class="status-pill ${d.cert ? 'cert' : 'not-cert'}">${d.cert ? 'Certificando' : 'N\u00e3o certif.'}</span></td>
    </tr>`;
  }).join('');
}

// =============================================
// Edits Analysis - Cloud Data & Metrics
// =============================================
let dadosEmpresarial = [];
let dadosResidencial = [];
let editsLoaded = false;
let editsFilterSetor = 'TODOS';
let editsSortCol = 'total';
let editsSortAsc = false;

async function carregarDadosNuvemAdmin() {
  if (typeof SUPABASE_URL === 'undefined' || !SUPABASE_URL) return;
  const base = SUPABASE_URL + '/storage/v1/object/public/dados';
  try {
    const [respEmp, respRes] = await Promise.all([
      fetch(base + '/dados_empresarial.json').then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(base + '/dados_residencial.json').then(r => r.ok ? r.json() : []).catch(() => [])
    ]);
    dadosEmpresarial = respEmp;
    dadosResidencial = respRes;
  } catch(e) {
    dadosEmpresarial = [];
    dadosResidencial = [];
  }
}

function buildAnalystMetrics() {
  const metrics = {};
  employees.forEach(emp => {
    metrics[emp.Matricula] = {
      matricula: emp.Matricula,
      nome: emp.Nome,
      setor: emp.Setor,
      total: 0, ganhos: 0, perdidos: 0, pct: 0
    };
  });

  dadosEmpresarial.forEach(inc => {
    const login = (inc.LOGIN_ACIONOU || '').toString().toUpperCase();
    if (metrics[login]) {
      metrics[login].total++;
      if (inc.INDICADOR === 1) metrics[login].ganhos++;
      else metrics[login].perdidos++;
    }
  });

  dadosResidencial.forEach(inc => {
    const login = (inc.LOGIN_ACIONAMENTO || '').toString().toUpperCase();
    if (metrics[login]) {
      metrics[login].total++;
      if (inc.INDICADOR === 1) metrics[login].ganhos++;
      else metrics[login].perdidos++;
    }
  });

  Object.values(metrics).forEach(m => {
    m.pct = m.total > 0 ? Math.round((m.ganhos / m.total) * 100) : 0;
  });

  return Object.values(metrics);
}

function buildIndicatorBreakdown() {
  const groups = {};
  function process(data) {
    data.forEach(inc => {
      const nome = inc.INDICADOR_NOME || 'Sem Indicador';
      if (!groups[nome]) groups[nome] = { total: 0, ganhos: 0, perdidos: 0 };
      groups[nome].total++;
      if (inc.INDICADOR === 1) groups[nome].ganhos++;
      else groups[nome].perdidos++;
    });
  }
  process(dadosEmpresarial);
  process(dadosResidencial);
  return Object.entries(groups).map(([nome, d]) => ({
    nome, ...d, pct: d.total > 0 ? Math.round((d.ganhos / d.total) * 100) : 0
  })).sort((a, b) => b.total - a.total);
}

function buildSectorStats() {
  function calcSector(data) {
    let total = 0, ganhos = 0, perdidos = 0;
    data.forEach(inc => { total++; if (inc.INDICADOR === 1) ganhos++; else perdidos++; });
    return { total, ganhos, perdidos, pct: total > 0 ? Math.round((ganhos / total) * 100) : 0 };
  }
  return {
    empresarial: calcSector(dadosEmpresarial),
    residencial: calcSector(dadosResidencial)
  };
}

function pctBadgeClass(pct) {
  if (pct >= 80) return 'high';
  if (pct >= 60) return 'medium';
  return 'low';
}

function rankClass(i) {
  if (i === 0) return 'gold';
  if (i === 1) return 'silver';
  if (i === 2) return 'bronze';
  return '';
}

function posClass(i) {
  return 'p' + Math.min(i + 1, 5);
}

function renderEditsAnalysis() {
  const contentEl = document.getElementById('edits-content');
  const allMetrics = buildAnalystMetrics();
  const totalEdits = allMetrics.reduce((s, m) => s + m.total, 0);
  const totalGanhos = allMetrics.reduce((s, m) => s + m.ganhos, 0);
  const totalPerdidos = allMetrics.reduce((s, m) => s + m.perdidos, 0);
  const pctGeral = totalEdits > 0 ? Math.round((totalGanhos / totalEdits) * 100) : 0;

  if (totalEdits === 0) {
    contentEl.innerHTML = `<div class="edits-empty">
      <p>Nenhum dado de edits encontrado</p>
      <small>Fa&ccedil;a upload dos dados empresarial e/ou residencial na aba "Upload de Dados"</small>
    </div>`;
    return;
  }

  let html = '';

  // KPI Row
  html += `<div class="edits-kpi-row">
    <div class="edits-kpi-card total">
      <div class="edits-kpi-number" style="color:var(--blue)">${totalEdits.toLocaleString('pt-BR')}</div>
      <div class="edits-kpi-label">Total de Edits</div>
    </div>
    <div class="edits-kpi-card ganhos">
      <div class="edits-kpi-number" style="color:var(--green)">${totalGanhos.toLocaleString('pt-BR')}</div>
      <div class="edits-kpi-label">Edits Ganhos</div>
    </div>
    <div class="edits-kpi-card perdidos">
      <div class="edits-kpi-number" style="color:var(--red)">${totalPerdidos.toLocaleString('pt-BR')}</div>
      <div class="edits-kpi-label">Edits Perdidos</div>
    </div>
    <div class="edits-kpi-card pct">
      <div class="edits-kpi-number" style="color:var(--orange)">${pctGeral}%</div>
      <div class="edits-kpi-label">Ader&ecirc;ncia Geral</div>
    </div>
  </div>`;

  // Top 5 Podium Cards
  const byTotal = [...allMetrics].filter(m => m.total > 0).sort((a, b) => b.total - a.total);
  const byGanhos = [...allMetrics].filter(m => m.ganhos > 0).sort((a, b) => b.ganhos - a.ganhos);
  const byPerdidos = [...allMetrics].filter(m => m.perdidos > 0).sort((a, b) => b.perdidos - a.perdidos);
  const byBestPct = [...allMetrics].filter(m => m.total >= 5).sort((a, b) => b.pct - a.pct || b.total - a.total);
  const byWorstPct = [...allMetrics].filter(m => m.total >= 5).sort((a, b) => a.pct - b.pct || b.total - a.total);

  function podiumCard(title, data, valueKey, colorClass, suffix) {
    let items = data.slice(0, 5).map((m, i) => `
      <div class="podium-item">
        <div class="podium-pos ${posClass(i)}">${i + 1}</div>
        <div class="podium-info">
          <div class="podium-name">${firstName(m.nome)}</div>
        </div>
        <div class="podium-value ${colorClass}">${m[valueKey]}${suffix || ''}</div>
      </div>`).join('');
    if (data.length === 0) items = '<div style="font-size:12px;color:var(--text-muted);padding:8px 0">Sem dados</div>';
    return `<div class="podium-card">
      <div class="podium-title">${title}</div>
      ${items}
    </div>`;
  }

  html += '<div class="podium-grid">';
  html += podiumCard('Maior Volume', byTotal, 'total', 'blue', '');
  html += podiumCard('Mais Ganhos', byGanhos, 'ganhos', 'green', '');
  html += podiumCard('Mais Perdas', byPerdidos, 'perdidos', 'red', '');
  html += podiumCard('Melhor Ader&ecirc;ncia', byBestPct, 'pct', 'green', '%');
  html += podiumCard('Pior Ader&ecirc;ncia', byWorstPct, 'pct', 'red', '%');
  html += '</div>';

  // Sector Comparison
  const sectors = buildSectorStats();
  html += `<div class="edits-section">
    <div class="edits-section-title"><span class="icon sector">&#9878;</span> Compara&ccedil;&atilde;o por Setor</div>
    <div class="sector-compare">
      <div class="sector-card emp">
        <h4>Empresarial</h4>
        <div class="sector-stat-row"><span class="sector-stat-label">Total de Edits</span><span class="sector-stat-val">${sectors.empresarial.total.toLocaleString('pt-BR')}</span></div>
        <div class="sector-stat-row"><span class="sector-stat-label">Ganhos</span><span class="sector-stat-val" style="color:var(--green)">${sectors.empresarial.ganhos.toLocaleString('pt-BR')}</span></div>
        <div class="sector-stat-row"><span class="sector-stat-label">Perdidos</span><span class="sector-stat-val" style="color:var(--red)">${sectors.empresarial.perdidos.toLocaleString('pt-BR')}</span></div>
        <div class="sector-stat-row"><span class="sector-stat-label">Ader&ecirc;ncia</span><span class="pct-badge ${pctBadgeClass(sectors.empresarial.pct)}">${sectors.empresarial.pct}%</span></div>
      </div>
      <div class="sector-card res">
        <h4>Residencial</h4>
        <div class="sector-stat-row"><span class="sector-stat-label">Total de Edits</span><span class="sector-stat-val">${sectors.residencial.total.toLocaleString('pt-BR')}</span></div>
        <div class="sector-stat-row"><span class="sector-stat-label">Ganhos</span><span class="sector-stat-val" style="color:var(--green)">${sectors.residencial.ganhos.toLocaleString('pt-BR')}</span></div>
        <div class="sector-stat-row"><span class="sector-stat-label">Perdidos</span><span class="sector-stat-val" style="color:var(--red)">${sectors.residencial.perdidos.toLocaleString('pt-BR')}</span></div>
        <div class="sector-stat-row"><span class="sector-stat-label">Ader&ecirc;ncia</span><span class="pct-badge ${pctBadgeClass(sectors.residencial.pct)}">${sectors.residencial.pct}%</span></div>
      </div>
    </div>
  </div>`;

  // Full Ranking Table
  html += `<div class="edits-section">
    <div class="edits-section-title"><span class="icon vol">&#9776;</span> Ranking Completo da Equipe</div>
    <div class="filter-bar">
      <button class="filter-btn ${editsFilterSetor === 'TODOS' ? 'active' : ''}" data-edits-filter="TODOS">Todos</button>
      <button class="filter-btn ${editsFilterSetor === 'EMPRESARIAL' ? 'active' : ''}" data-edits-filter="EMPRESARIAL">Empresarial</button>
      <button class="filter-btn ${editsFilterSetor === 'RESIDENCIAL' ? 'active' : ''}" data-edits-filter="RESIDENCIAL">Residencial</button>
    </div>
    <div class="edits-table-wrapper">
      <table class="edits-table" id="edits-ranking-table">
        <thead>
          <tr>
            <th style="width:40px">#</th>
            <th data-edits-sort="nome">Nome <span class="sort-arrow"></span></th>
            <th data-edits-sort="setor">Setor <span class="sort-arrow"></span></th>
            <th data-edits-sort="total">Total <span class="sort-arrow"></span></th>
            <th data-edits-sort="ganhos">Ganhos <span class="sort-arrow"></span></th>
            <th data-edits-sort="perdidos">Perdidos <span class="sort-arrow"></span></th>
            <th data-edits-sort="pct">Ader&ecirc;ncia <span class="sort-arrow"></span></th>
            <th>Distribui&ccedil;&atilde;o</th>
          </tr>
        </thead>
        <tbody id="edits-ranking-tbody"></tbody>
      </table>
    </div>
  </div>`;

  // Indicator Breakdown
  const indBreakdown = buildIndicatorBreakdown();
  if (indBreakdown.length > 0) {
    html += `<div class="edits-section">
      <div class="edits-section-title"><span class="icon group">&#9881;</span> Breakdown por Indicador</div>
      <div class="edits-table-wrapper">
        <table class="indicator-breakdown-table">
          <thead>
            <tr>
              <th>Indicador</th>
              <th>Total</th>
              <th>Ganhos</th>
              <th>Perdidos</th>
              <th>Ader&ecirc;ncia</th>
            </tr>
          </thead>
          <tbody>
            ${indBreakdown.map(g => `<tr>
              <td><strong>${g.nome}</strong></td>
              <td>${g.total.toLocaleString('pt-BR')}</td>
              <td style="color:var(--green);font-weight:700">${g.ganhos.toLocaleString('pt-BR')}</td>
              <td style="color:var(--red);font-weight:700">${g.perdidos.toLocaleString('pt-BR')}</td>
              <td><span class="pct-badge ${pctBadgeClass(g.pct)}">${g.pct}%</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
  }

  contentEl.innerHTML = html;
  renderEditsRankingTable();
  setupEditsInteractions();
}

function renderEditsRankingTable() {
  let data = buildAnalystMetrics();

  if (editsFilterSetor !== 'TODOS') {
    data = data.filter(m => m.setor.toUpperCase() === editsFilterSetor);
  }

  data.sort((a, b) => {
    let va, vb;
    if (editsSortCol === 'nome') { va = a.nome; vb = b.nome; }
    else if (editsSortCol === 'setor') { va = a.setor; vb = b.setor; }
    else { va = a[editsSortCol]; vb = b[editsSortCol]; }
    if (va < vb) return editsSortAsc ? -1 : 1;
    if (va > vb) return editsSortAsc ? 1 : -1;
    return 0;
  });

  const maxTotal = Math.max(...data.map(m => m.total), 1);
  const tbody = document.getElementById('edits-ranking-tbody');
  if (!tbody) return;

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:24px">Nenhum resultado</td></tr>';
    return;
  }

  tbody.innerHTML = data.map((m, i) => {
    const greenW = m.total > 0 ? Math.round((m.ganhos / maxTotal) * 100) : 0;
    const redW = m.total > 0 ? Math.round((m.perdidos / maxTotal) * 100) : 0;
    return `<tr>
      <td><span class="rank-num ${rankClass(i)}">${i + 1}</span></td>
      <td><strong>${m.nome}</strong></td>
      <td><span class="setor-badge-sm">${m.setor}</span></td>
      <td style="font-weight:700">${m.total}</td>
      <td style="color:var(--green);font-weight:700">${m.ganhos}</td>
      <td style="color:var(--red);font-weight:700">${m.perdidos}</td>
      <td><span class="pct-badge ${pctBadgeClass(m.pct)}">${m.pct}%</span></td>
      <td class="bar-cell">
        <div class="bar-track">
          <div class="bar-fill-green" style="width:${greenW}%"></div>
          <div class="bar-fill-red" style="width:${redW}%"></div>
          ${m.total > 0 ? `<span class="bar-label">${m.ganhos}G / ${m.perdidos}P</span>` : ''}
        </div>
      </td>
    </tr>`;
  }).join('');
}

function setupEditsInteractions() {
  document.querySelectorAll('[data-edits-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-edits-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      editsFilterSetor = btn.dataset.editsFilter;
      renderEditsRankingTable();
    });
  });

  document.querySelectorAll('[data-edits-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.editsSort;
      if (editsSortCol === col) {
        editsSortAsc = !editsSortAsc;
      } else {
        editsSortCol = col;
        editsSortAsc = col === 'nome' || col === 'setor';
      }
      document.querySelectorAll('#edits-ranking-table .sort-arrow').forEach(a => a.textContent = '');
      th.querySelector('.sort-arrow').textContent = editsSortAsc ? ' \u25B2' : ' \u25BC';
      renderEditsRankingTable();
    });
  });
}

// =============================================
// Tabs
// =============================================
function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
      // Render edits analysis when tab is selected
      if (btn.dataset.tab === 'edits' && editsLoaded) {
        renderEditsAnalysis();
      }
    });
  });
}

// =============================================
// Filters & Sort
// =============================================
function setupFilters() {
  // Setor filter (only individual tab filters, not edits filters)
  document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderTable();
    });
  });

  // Search
  document.getElementById('search-nome').addEventListener('input', e => {
    currentSearch = e.target.value.trim();
    renderTable();
  });

  // Table sort (individual table only)
  document.querySelectorAll('#team-table th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.sort;
      if (sortCol === col) {
        sortAsc = !sortAsc;
      } else {
        sortCol = col;
        sortAsc = true;
      }
      // Update sort arrows
      document.querySelectorAll('#team-table .sort-arrow').forEach(a => a.textContent = '');
      th.querySelector('.sort-arrow').textContent = sortAsc ? ' ▲' : ' ▼';
      renderTable();
    });
  });
}

// =============================================
// Auth & Supabase
// =============================================
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('config-alerta').style.display = 'block';
} else {
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const loginPage = document.getElementById('login-page');
  const dashboardPage = document.getElementById('dashboard-page');
  const loginError = document.getElementById('login-error');

  function showDashboard(user) {
    loginPage.style.display = 'none';
    dashboardPage.style.display = 'block';
    document.getElementById('user-info').textContent = user.email;
    renderDashboard();
    renderTable();
    setupTabs();
    setupFilters();

    // Pre-load cloud data for edits analysis
    carregarDadosNuvemAdmin().then(() => {
      editsLoaded = true;
      // If edits tab is already active, render immediately
      if (document.getElementById('panel-edits').classList.contains('active')) {
        renderEditsAnalysis();
      }
    });
  }

  // Check session
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) showDashboard(session.user);
  });

  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      showDashboard(session.user);
    } else {
      loginPage.style.display = 'block';
      dashboardPage.style.display = 'none';
    }
  });

  // Login
  document.getElementById('login-btn').addEventListener('click', async () => {
    const btn = document.getElementById('login-btn');
    const email = document.getElementById('admin-email').value.trim();
    const password = document.getElementById('admin-password').value;
    loginError.textContent = '';

    if (!email || !password) {
      loginError.textContent = 'Preencha e-mail e senha.';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Entrando...';

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        loginError.textContent = 'Erro: ' + error.message;
      } else if (!data.session) {
        loginError.textContent = 'Login falhou. Verifique suas credenciais.';
      }
    } catch (err) {
      loginError.textContent = 'Erro de conexão: ' + err.message;
    }

    btn.disabled = false;
    btn.textContent = 'Entrar';
  });

  document.getElementById('admin-password').addEventListener('keypress', e => {
    if (e.key === 'Enter') document.getElementById('login-btn').click();
  });

  // Logout
  document.getElementById('logout-btn').addEventListener('click', () => {
    supabase.auth.signOut();
  });

  // =============================================
  // Upload
  // =============================================
  function limparJson(texto) {
    return texto
      .replace(/:\s*NaN/g, ': null')
      .replace(/:\s*Infinity/g, ': null')
      .replace(/:\s*-Infinity/g, ': null');
  }

  async function uploadArquivo(fileInputId, nomeArquivo, statusId, btnId) {
    const fileInput = document.getElementById(fileInputId);
    const statusEl = document.getElementById(statusId);
    const btn = document.getElementById(btnId);

    if (!fileInput.files[0]) {
      statusEl.className = 'upload-status error';
      statusEl.textContent = 'Selecione um arquivo.';
      return;
    }

    btn.disabled = true;
    statusEl.className = 'upload-status progress';
    statusEl.textContent = 'Lendo arquivo...';

    const reader = new FileReader();
    reader.onload = async function(e) {
      try {
        const textoLimpo = limparJson(e.target.result);
        const dados = JSON.parse(textoLimpo);
        if (!Array.isArray(dados)) throw new Error('O arquivo deve conter um array JSON.');
        statusEl.textContent = 'Enviando ' + dados.length + ' registros...';
        const blob = new Blob([JSON.stringify(dados)], { type: 'application/json' });
        const { error } = await supabase.storage.from('dados').upload(nomeArquivo, blob, { upsert: true });
        if (error) throw error;
        statusEl.className = 'upload-status success';
        statusEl.textContent = 'Upload concluído! ' + dados.length + ' registros enviados.';
        fileInput.value = '';
      } catch (err) {
        statusEl.className = 'upload-status error';
        statusEl.textContent = 'Erro: ' + err.message;
      }
      btn.disabled = false;
    };
    reader.onerror = function() {
      statusEl.className = 'upload-status error';
      statusEl.textContent = 'Erro ao ler o arquivo.';
      btn.disabled = false;
    };
    reader.readAsText(fileInput.files[0]);
  }

  document.getElementById('btn-upload-empresarial').addEventListener('click', () => {
    uploadArquivo('file-empresarial', 'dados_empresarial.json', 'status-empresarial', 'btn-upload-empresarial');
  });
  document.getElementById('btn-upload-residencial').addEventListener('click', () => {
    uploadArquivo('file-residencial', 'dados_residencial.json', 'status-residencial', 'btn-upload-residencial');
  });
}
