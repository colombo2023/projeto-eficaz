<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const newUser = ref({
  nome: '',
  apelido: '',
  email: '',
  senha: '',
  cpf: '',
  dataNascimento: '',
  genero: '',
  telefone: '',
  endereco: []
});

const submit = async () => {
  try {
    await axios.post('https://672017f0e7a5792f053074c2.mockapi.io/apa/user', newUser.value);
    resetForm();
    router.push('/address');
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
};

const resetForm = () => {
  newUser.value = {
    nome: '',
    apelido: '',
    email: '',
    senha: '',
    cpf: '',
    dataNascimento: '',
    genero: '',
    telefone: '',
    endereco: []
  };
};

const irParaLogin = () => {
  router.push('/Login');
};
</script>



<template>
  <div class="registration-container">
    <!-- Container combinado -->
    <div class="combined-section">
      <!-- Seção da esquerda (Boas-vindas) -->
      <div class="welcome-section">
        <h2>BEM VINDO</h2>
        <h3><span>Novo</span> Cadastro</h3>
        <button class="create-account" @click="irParaLogin">Fazer Login</button>
      </div>

      <!-- Linha divisória -->
      <div class="divider"></div>

      <!-- Seção da direita (Formulário de Cadastro) -->
      <div class="registration-section">
        <h2><span>INFO</span>RMAÇÕES</h2>
        <form @submit.prevent="submit">
          <!-- Campos do formulário -->
          <div class="input-group">
            <input type="text" v-model="newUser.nome" placeholder="Nome completo" />
          </div>
          <div class="input-group">
            <input type="text" v-model="newUser.apelido" placeholder="Apelido" />
          </div>
          <div class="input-group">
            <input type="email" v-model="newUser.email" placeholder="E-mail" />
          </div>
          <div class="input-group">
            <input type="date" v-model="newUser.dataNascimento" placeholder="Data de Nascimento" />
          </div>
          <div class="input-group">
            <input type="text" v-model="newUser.cpf" placeholder="CPF" />
          </div>
          <div class="input-group">
            <select v-model="newUser.genero">
              <option value="" disabled selected>Selecione o Gênero</option>
              <option>Masculino</option>
              <option>Feminino</option>
              <option>Outro</option>
            </select>
          </div>
          <div class="input-group">
            <input type="password" v-model="newUser.senha" placeholder="Senha" />
          </div>
          <div class="input-group">
            <input type="text" v-model="newUser.telefone" placeholder="Telefone" />
          </div>
          <button type="submit" class="register-button">Salvar</button>
        </form>
      </div>
    </div>
  </div>
</template>



<style scoped>
.registration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #515151;
}

.combined-section {
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow: hidden;
}

.welcome-section, .registration-section {
  padding: 40px;
  color: #fff;
}

.welcome-section {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(202.46deg, #D9D9D9 42.19%, #2B2B2C 145%);
}

.welcome-section h2 {
  margin-bottom: 20px;
}

.welcome-section h3 {
  margin-bottom: 40px;
  font-size: 40px;
  color: #000;
}

.welcome-section h3 span {
  text-decoration: underline;
  color: #000;
}

.create-account {
  width: 200px;
  padding: 10px;
  border-radius: 40px;
  background-color: #444;
  color: #fff;
  cursor: pointer;
}

.create-account:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.divider {
  width: 1px;
  background-color: #555;
}

.registration-section {
  display: flex;
  flex-direction: column;
  width: 500px;
}

.registration-section h2 {
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
}

.registration-section span {
  text-decoration: underline;
}

.input-group {
  margin-bottom: 15px;
}

.input-group input, .input-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #555;
  border-radius: 50px;
  background-color: #33333375;
  color: #ffffff;
}

.register-button {
  padding: 12px;
  background-color: #03B1FF;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 50px;
  margin-top: 20px;
}

.register-button:hover {
  background-color: #007ACC;
}
</style>
