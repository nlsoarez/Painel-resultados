// Verificar configuração do Supabase
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  document.getElementById('config-alerta').style.display = 'block';
} else {
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const loginSection = document.getElementById('login-section');
  const uploadSection = document.getElementById('upload-section');
  const loginError = document.getElementById('login-error');

  // Verificar sessão ao carregar
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      mostrarUpload(session.user);
    } else {
      loginSection.style.display = 'block';
    }
  });

  // Monitorar mudanças de auth
  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      mostrarUpload(session.user);
    } else {
      loginSection.style.display = 'block';
      uploadSection.style.display = 'none';
    }
  });

  function mostrarUpload(user) {
    loginSection.style.display = 'none';
    uploadSection.style.display = 'block';
    document.getElementById('user-info').textContent = 'Logado como: ' + user.email;
  }

  // Login
  document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('admin-email').value.trim();
    const password = document.getElementById('admin-password').value;
    loginError.textContent = '';

    if (!email || !password) {
      loginError.textContent = 'Preencha e-mail e senha.';
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      loginError.textContent = 'Erro: e-mail ou senha inválidos.';
    }
  });

  // Enter para login
  document.getElementById('admin-password').addEventListener('keypress', e => {
    if (e.key === 'Enter') document.getElementById('login-btn').click();
  });

  // Logout
  document.getElementById('logout-btn').addEventListener('click', () => {
    supabase.auth.signOut();
  });

  // Limpar NaN/Infinity do JSON exportado por Python/Pandas
  function limparJson(texto) {
    return texto
      .replace(/:\s*NaN/g, ': null')
      .replace(/:\s*Infinity/g, ': null')
      .replace(/:\s*-Infinity/g, ': null');
  }

  // Upload de arquivo
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

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function(e) {
      try {
        const textoLimpo = limparJson(e.target.result);
        const dados = JSON.parse(textoLimpo);

        if (!Array.isArray(dados)) {
          throw new Error('O arquivo deve conter um array JSON [ {...}, {...} ]');
        }

        statusEl.textContent = 'Enviando ' + dados.length + ' registros...';

        // Upload para Supabase Storage (upsert sobrescreve se já existir)
        const blob = new Blob([JSON.stringify(dados)], { type: 'application/json' });
        const { error } = await supabase.storage
          .from('dados')
          .upload(nomeArquivo, blob, { upsert: true });

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

    reader.readAsText(file);
  }

  // Botões de upload
  document.getElementById('btn-upload-empresarial').addEventListener('click', () => {
    uploadArquivo('file-empresarial', 'dados_empresarial.json', 'status-empresarial', 'btn-upload-empresarial');
  });

  document.getElementById('btn-upload-residencial').addEventListener('click', () => {
    uploadArquivo('file-residencial', 'dados_residencial.json', 'status-residencial', 'btn-upload-residencial');
  });
}
