// Verificar configuração do Firebase
if (!FIREBASE_CONFIG.apiKey) {
  document.getElementById('config-alerta').style.display = 'block';
} else {
  firebase.initializeApp(FIREBASE_CONFIG);
  const auth = firebase.auth();
  const storage = firebase.storage();

  const loginSection = document.getElementById('login-section');
  const uploadSection = document.getElementById('upload-section');
  const loginError = document.getElementById('login-error');

  // Monitorar estado de autenticação
  auth.onAuthStateChanged(user => {
    if (user) {
      loginSection.style.display = 'none';
      uploadSection.style.display = 'block';
      document.getElementById('user-info').textContent = 'Logado como: ' + user.email;
    } else {
      loginSection.style.display = 'block';
      uploadSection.style.display = 'none';
    }
  });

  // Login
  document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('admin-email').value.trim();
    const password = document.getElementById('admin-password').value;
    loginError.textContent = '';

    if (!email || !password) {
      loginError.textContent = 'Preencha e-mail e senha.';
      return;
    }

    auth.signInWithEmailAndPassword(email, password)
      .catch(err => {
        loginError.textContent = 'Erro: e-mail ou senha inválidos.';
      });
  });

  // Enter para login
  document.getElementById('admin-password').addEventListener('keypress', e => {
    if (e.key === 'Enter') document.getElementById('login-btn').click();
  });

  // Logout
  document.getElementById('logout-btn').addEventListener('click', () => auth.signOut());

  // Limpar NaN/Infinity do JSON exportado por Python/Pandas
  function limparJson(texto) {
    return texto
      .replace(/:\s*NaN/g, ': null')
      .replace(/:\s*Infinity/g, ': null')
      .replace(/:\s*-Infinity/g, ': null');
  }

  // Upload de arquivo
  function uploadArquivo(fileInputId, nomeArquivo, statusId, progressId, btnId) {
    const fileInput = document.getElementById(fileInputId);
    const statusEl = document.getElementById(statusId);
    const progressEl = document.getElementById(progressId);
    const btn = document.getElementById(btnId);

    if (!fileInput.files[0]) {
      statusEl.className = 'upload-status error';
      statusEl.textContent = 'Selecione um arquivo.';
      return;
    }

    const file = fileInput.files[0];
    btn.disabled = true;
    statusEl.className = 'upload-status progress';
    statusEl.textContent = 'Lendo arquivo...';

    const reader = new FileReader();

    reader.onload = function(e) {
      try {
        const textoLimpo = limparJson(e.target.result);
        const dados = JSON.parse(textoLimpo);

        if (!Array.isArray(dados)) {
          throw new Error('O arquivo deve conter um array JSON [ {...}, {...} ]');
        }

        // Criar blob com JSON limpo e enviar ao Firebase Storage
        const blob = new Blob([JSON.stringify(dados)], { type: 'application/json' });
        const ref = storage.ref(nomeArquivo);
        const uploadTask = ref.put(blob);

        // Barra de progresso
        progressEl.innerHTML = '<div class="progress-bar"><div class="progress-bar-fill" style="width:0%"></div></div>';
        const fill = progressEl.querySelector('.progress-bar-fill');

        uploadTask.on('state_changed',
          snapshot => {
            const pct = (snapshot.bytesTransferred / snapshot.totalBytes * 100).toFixed(0);
            fill.style.width = pct + '%';
            statusEl.textContent = 'Enviando... ' + pct + '%';
          },
          error => {
            statusEl.className = 'upload-status error';
            statusEl.textContent = 'Erro no upload: ' + error.message;
            progressEl.innerHTML = '';
            btn.disabled = false;
          },
          () => {
            statusEl.className = 'upload-status success';
            statusEl.textContent = 'Upload concluído! ' + dados.length + ' registros enviados.';
            progressEl.innerHTML = '';
            btn.disabled = false;
            fileInput.value = '';
          }
        );
      } catch (err) {
        statusEl.className = 'upload-status error';
        statusEl.textContent = 'Erro ao processar: ' + err.message;
        progressEl.innerHTML = '';
        btn.disabled = false;
      }
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
    uploadArquivo('file-empresarial', 'dados_empresarial.json', 'status-empresarial', 'progress-empresarial', 'btn-upload-empresarial');
  });

  document.getElementById('btn-upload-residencial').addEventListener('click', () => {
    uploadArquivo('file-residencial', 'dados_residencial.json', 'status-residencial', 'progress-residencial', 'btn-upload-residencial');
  });
}
