// =============================================================
// CONFIGURAÇÃO DO SUPABASE (100% gratuito)
// =============================================================
// Siga os passos abaixo para configurar:
//
// 1. Acesse https://supabase.com/ e crie uma conta gratuita
// 2. Clique em "New Project" e crie um projeto
//    - Defina um nome e uma senha para o banco (guarde a senha)
//    - Região: South America (São Paulo)
//
// 3. No menu lateral, vá em "Storage"
//    - Clique em "New bucket"
//    - Nome: dados
//    - Marque "Public bucket" (IMPORTANTE!)
//    - Clique em "Create bucket"
//
// 4. Ainda em Storage, clique no bucket "dados" > "Policies"
//    - Clique "New policy" > "For full customization"
//    - Policy name: "Permitir upload autenticado"
//    - Allowed operation: INSERT e UPDATE
//    - Target roles: authenticated
//    - Clique "Review" > "Save policy"
//
// 5. No menu lateral, vá em "Authentication" > "Users"
//    - Clique "Add user" > "Create new user"
//    - Defina e-mail e senha do admin
//    - Marque "Auto Confirm User"
//    - Clique "Create user"
//
// 6. No menu lateral, vá em "Project Settings" (engrenagem) > "API"
//    - Copie "Project URL" para SUPABASE_URL abaixo
//    - Copie "anon public" key para SUPABASE_ANON_KEY abaixo
//
// =============================================================

const SUPABASE_URL = '';      // ex: https://abcdefghij.supabase.co
const SUPABASE_ANON_KEY = ''; // ex: eyJhbGciOiJIUzI1NiIs...
