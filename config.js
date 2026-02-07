// =============================================================
// CONFIGURAÇÃO DO FIREBASE
// =============================================================
// Siga os passos abaixo para configurar:
//
// 1. Acesse https://console.firebase.google.com/
// 2. Clique em "Adicionar projeto" e crie um projeto
// 3. No painel do projeto, clique na engrenagem > "Configurações do projeto"
// 4. Em "Seus apps", clique no ícone Web (</>)
// 5. Registre o app (pode usar qualquer nome, ex: "Painel Claro")
// 6. Copie os valores do firebaseConfig para cá
//
// 7. No menu lateral, vá em "Authentication" > "Sign-in method"
//    - Ative "E-mail/senha"
//    - Em "Users", crie um usuário admin (seu e-mail e senha)
//
// 8. No menu lateral, vá em "Storage" > "Get started"
//    - Escolha a localização (ex: southamerica-east1)
//    - Vá em "Rules" e substitua por:
//
//      rules_version = '2';
//      service firebase.storage {
//        match /b/{bucket}/o {
//          match /{allPaths=**} {
//            allow read;
//            allow write: if request.auth != null;
//          }
//        }
//      }
//
// =============================================================

const FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
