// Detecta se está na página de cadastro
const formCadastro = document.getElementById('formCadastro');
const formLogin = document.getElementById('formLogin');

//  Cadastro
if (formCadastro) {
  const erroMsg = document.getElementById('erroCadastro');

  formCadastro.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmar = document.getElementById('confirmar').value;

    if (senha !== confirmar) {
      erroMsg.textContent = 'As senhas não coincidem.';
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarios.find(u => u.email === email)) {
      erroMsg.textContent = 'Já existe uma conta com esse e-mail.';
      return;
    }

    usuarios.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    erroMsg.style.color = 'green';
    erroMsg.textContent = 'Cadastro realizado com sucesso!';

    setTimeout(() => {
      formCadastro.reset();
      window.location.href = 'login.html'; // redireciona para login
    }, 1000);
  });
}

// Login
if (formLogin) {
  const erroLogin = document.getElementById('erroLogin');

  formLogin.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Procura usuário com o mesmo e-mail e senha
    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuarioEncontrado) {
      erroLogin.style.color = 'green';
      erroLogin.textContent = 'Login realizado com sucesso!';

      // Armazena o usuário logado (opcional)
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));

      // Redireciona após 1 segundo
      setTimeout(() => {
        window.location.href = 'fase01.html'; // página de destino
      }, 1000);
    } else {
      erroLogin.textContent = 'E-mail ou senha incorretos.';
    }
  });
}
// Recupera senha
const formRecuperar = document.getElementById('formRecuperar');

if (formRecuperar) {
  const emailInput = document.getElementById('emailRecuperar');
  const msg = document.getElementById('mensagemRecuperar');

  formRecuperar.addEventListener('submit', function handleEmail(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
      msg.style.color = 'red';
      msg.textContent = 'Nenhum usuário encontrado com esse e-mail.';
      return;
    }

    // Troca o conteúdo do formulário por campos de redefinição
    formRecuperar.innerHTML = `
      <label for="novaSenha">Nova Senha:</label>
      <input type="password" id="novaSenha" required minlength="6">

      <label for="confirmarSenha">Confirmar Nova Senha:</label>
      <input type="password" id="confirmarSenha" required minlength="6">

      <button type="submit" id="btnRedefinir">Redefinir Senha</button>
      <p id="mensagemRecuperar" class="mensagem-sucesso"></p>
    `;

    // Remove o evento antigo e adiciona o novo (redefinição)
    formRecuperar.removeEventListener('submit', handleEmail);

    formRecuperar.addEventListener('submit', function (event2) {
      event2.preventDefault();

      const novaSenha = document.getElementById('novaSenha').value;
      const confirmarSenha = document.getElementById('confirmarSenha').value;
      const msgNova = document.getElementById('mensagemRecuperar');

      if (novaSenha !== confirmarSenha) {
        msgNova.style.color = 'red';
        msgNova.textContent = 'As senhas não coincidem.';
        return;
      }

      if (novaSenha.length < 6) {
        msgNova.style.color = 'red';
        msgNova.textContent = ' A senha deve ter pelo menos 6 caracteres.';
        return;
      }

      // Atualiza a senha do usuário
      const indice = usuarios.findIndex(u => u.email === email);
      usuarios[indice].senha = novaSenha;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      msgNova.style.color = 'green';
      msgNova.textContent = 'Senha redefinida com sucesso! Redirecionando...';

      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
    });
  });
}


