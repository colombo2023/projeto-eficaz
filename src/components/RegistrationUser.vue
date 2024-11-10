<script>
import axios from 'axios';

export default {
  data() {
    return {
      showAddressModal: false,
      newUser: {
        nome: '',
        sobrenome: '',
        username: '',
        nascimento: '',
        email: '',
        senha: '',
        confirmacaoSenha: '',
        telefone: '',
        cpf: '',
        foto: null
      },
      address: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: ''
      }
    };
  },
  methods: {
    handleFileUpload(event) {
      this.newUser.foto = event.target.files[0];
    },
    openAddressModal() {
      if (this.validateUser()) {
        this.showAddressModal = true;
      } else {
        alert('Preencha todos os campos obrigatórios.');
      }
    },
    validateUser() {
      return (
        this.newUser.nome &&
        this.newUser.sobrenome &&
        this.newUser.username &&
        this.newUser.email &&
        this.newUser.senha &&
        this.newUser.confirmacaoSenha &&
        this.newUser.telefone &&
        this.newUser.cpf
      );
    },
    async submit() {
      if (!this.validateAddress()) {
        alert('Preencha todos os campos de endereço.');
        return;
      }

      const formData = new FormData();
      Object.keys(this.newUser).forEach(key => {
        if (this.newUser[key]) formData.append(key, this.newUser[key]);
      });
      Object.keys(this.address).forEach(key => {
        formData.append(key, this.address[key]);
      });

      try {
        const response = await axios.post('/api/registrar', formData);
        if (response.status === 201) {
          alert('Registro realizado com sucesso!');
          this.resetForm();
        }
      } catch (error) {
        console.error('Erro ao registrar:', error);
        alert('Erro ao registrar. Tente novamente.');
      }
    },
    validateAddress() {
      return (
        this.address.rua &&
        this.address.numero &&
        this.address.bairro &&
        this.address.cidade &&
        this.address.estado &&
        this.address.cep
      );
    },
    resetForm() {
      this.newUser = {
        nome: '',
        sobrenome: '',
        username: '',
        nascimento: '',
        email: '',
        senha: '',
        confirmacaoSenha: '',
        telefone: '',
        cpf: '',
        foto: null
      };
      this.address = {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: ''
      };
      this.showAddressModal = false;
    }
  }
};
</script>

<template>
  <div class="app">
    <div class="circle small"></div>
    <div class="circle medium"></div>
    <div class="circle extra-large"></div>
    <div class="circle final"></div>

    <div v-if="!showAddressModal" class="container">
      <div class="left-section">
        <h2>REGISTRE-SE</h2>
        <div class="input-group">
          <input type="text" placeholder="Nome" v-model="newUser.nome" required />
        </div>
        <div class="input-group">
          <input type="text" placeholder="Sobrenome" v-model="newUser.sobrenome" required />
        </div>
        <div class="input-group">
          <input type="text" placeholder="Username" v-model="newUser.username" required />
        </div>
        <div class="input-group">
          <input type="date" v-model="newUser.nascimento" required />
        </div>
        <button @click="openAddressModal">Continuar para Endereço</button>
      </div>

      <div class="right-section">
        <h2>INFORMAÇÕES</h2>
        <div class="input-group">
          <input type="email" placeholder="Email" v-model="newUser.email" required />
        </div>
        <div class="input-group">
          <input type="password" placeholder="Senha" v-model="newUser.senha" required />
        </div>
        <div class="input-group">
          <input type="password" placeholder="Confirmação" v-model="newUser.confirmacaoSenha" required />
        </div>
        <div class="input-group">
          <input type="text" placeholder="CPF" v-model="newUser.cpf" required />
        </div>
        <div class="input-group">
          <input type="text" placeholder="Telefone" v-model="newUser.telefone" required />
        </div>
        <div class="input-group">
          <label for="file-upload" class="custom-file-upload">Selecionar Foto (Opcional)</label>
          <input id="file-upload" type="file" @change="handleFileUpload" />
        </div>
      </div>
    </div>

    <div v-if="showAddressModal" class="modal">
      <div class="modal-content">
        <button @click="showAddressModal = false">Voltar</button>
        <h2>Endereço</h2>
        <div class="input-group">
          <input type="text" placeholder="Rua" v-model="address.rua" required />
        </div>
        <div class="input-group">
          <input type="text" placeholder="Número" v-model="address.numero" required />
        </div>
        <div class="input-group">
          <input type="text" placeholder="Bairro" v-model="address.bairro" required />
        </div>
        <div class="input-group">
          <input type="text" placeholder="Cidade" v-model="address.cidade" required />
        </div>
        <div class="input-group">
          <input type="text" placeholder="Estado" v-model="address.estado" required />
        </div>
        <div class="input-group">
          <input type="text" placeholder="CEP" v-model="address.cep" required />
        </div>
        <button @click="submit">Registrar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos Gerais */
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #ffffff;
  overflow: hidden;
}

.circle { position: absolute; border-radius: 50%; }

.small { width: 200px; height: 200px; background: #d9d9d9;}
.medium { width: 450px; height: 450px; background: #b8b8b8;}
.extra-large { width: 650px; height: 650px; background: #7e7e7e; }
.final { width: 450px; height: 450px; background: #5c2323; }

.container {
  display: flex;
  width: 90%;
  max-width: 900px;
  background: rgba(58, 58, 58, 0.8);
  border-radius: 20px;
  padding: 30px;
}

.left-section, .right-section { width: 45%; }

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
}

button {
  background-color: #03b1ff;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 50px;
  cursor: pointer;
}
button:hover { background-color: #007acc; }
.modal { display: flex; align-items: center; justify-content: center; }
</style>
