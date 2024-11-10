<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      newUser: {
        nome: '',
        sobrenome: '',
        email: '',
        username: '',
        nascimento: '',
        senha: '',
        confirmacaoSenha: '',
        telefone: '',
        cpf: '',
        foto: null
      },
      address: {
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: ''
      },
      showAddressModal: false // Estado para controlar o modal
    };
  },
  methods: {
    // Função para buscar endereço com base no CEP
    async buscarEndereco() {
      const cep = this.address.cep.replace(/\D/g, ''); // Remove caracteres não numéricos
      if (cep.length === 8) {
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          if (response.data && !response.data.erro) {
            const data = response.data;
            this.address.rua = data.logradouro || '';
            this.address.bairro = data.bairro || '';
            this.address.cidade = data.localidade || '';
            this.address.estado = data.uf || '';
          } else {
            alert('CEP não encontrado.');
            this.resetAddressFields();
          }
        } catch (error) {
          console.error('Erro ao buscar o CEP:', error);
          alert('Erro ao buscar o CEP. Tente novamente.');
        }
      }
    },

    // Função para abrir o modal de endereço
    openAddressModal() {
      this.showAddressModal = true;
    },

    // Função para fechar o modal de endereço
    closeAddressModal() {
      this.showAddressModal = false;
    },

    // Função para registrar o usuário
    async submit() {
      if (!this.validateForm()) {
        alert('Preencha todos os campos obrigatórios.');
        return;
      }

      // Validação de senha
      if (this.newUser.senha !== this.newUser.confirmacaoSenha) {
        alert('As senhas não coincidem.');
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
          this.closeAddressModal();


          // Redireciona para a página inicial após o registro
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Erro ao registrar:', error);
        alert('Erro ao registrar. Tente novamente.');
      }
    },

    // Função para validar o formulário antes de enviar
    validateForm() {
      return (
        this.newUser.nome &&
        this.newUser.sobrenome &&
        this.newUser.email &&
        this.address.cep &&
        this.address.rua &&
        this.address.numero &&
        this.address.bairro &&
        this.address.cidade &&
        this.address.estado
      );
    },

    // Função para resetar os campos do formulário
    resetForm() {
      this.newUser = {
        nome: '',
        sobrenome: '',
        email: '',
        username: '',
        nascimento: '',
        senha: '',
        confirmacaoSenha: '',
        telefone: '',
        cpf: '',
        foto: null
      };
      this.resetAddressFields();
    },

    // Função para resetar os campos de endereço
    resetAddressFields() {
      this.address = {
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: ''
      };
    }
  }
};
</script>


<template>
  <div class="app">
    <!-- Círculos de fundo -->
    <div class="circle small"></div>
    <div class="circle medium"></div>
    <div class="circle extra-large"></div>
    <div class="circle final"></div>
    <div class="circle additional1"></div>
    <div class="circle additional2"></div>
    <div class="circle additional3"></div>

    <!-- Container Principal -->
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
      </div>
    </div>

    <!-- Modal de Endereço -->
    <div v-if="showAddressModal" class="modal">
  <div class="modal-content button-voltar">
    <button @click="showAddressModal = false">Voltar</button>
    <h2>Endereço</h2>

    <!-- Input para o CEP -->
    <div class="input-group">
      <input 
        type="text" 
        placeholder="CEP" 
        v-model="address.cep" 
        @blur="buscarEndereco" 
        maxlength="9" 
        required 
      />
    </div>
    
    <!-- Outros inputs para o endereço -->
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

    <button @click="submit">Registrar</button>
  </div>
</div>
  </div>
</template>


<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #ffffff;
  overflow: hidden;
}

.circle {
  border-radius: 50%;
  position: absolute;
  opacity: 0.9;
}

.circle.small {
  width: 200px;
  height: 200px;
  margin-bottom: 600px;
  background: #D9D9D9;
  z-index: 3;
}

.circle.medium {
  width: 450px;
  height: 450px;
  background: linear-gradient(207deg, #683636 30.01%, #B8B8B8 68.84%);
  left: 300px;
  margin-top: 150px;
  z-index: 2;
}

.circle.extra-large {
  width: 890px;                                
  height: 890px;
  background: linear-gradient(207deg, #B8B8B8 30.01%, #683636 68.84%);
  left: -320px;
  z-index: 1;
  margin-bottom: 150px
}

.circle.final {
  width: 450px;
  height: 450px;
  background: linear-gradient(194deg, #3A3A3A 46.22%, #5c2323 118.41%);
  right: 50px;
  z-index: 7;
}

.circle.additional1 { width: 300px; height: 300px; top: 65%; right: 20%;  background: #616161; }
.circle.additional2 { width: 400px; height: 400px; top: 20%; left: 50%; background: #634949; }
.circle.additional3 { width: 250px; height: 250px; bottom: 30%; left: 10%; background: #df0c87; }




.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 5;
  background: rgba(58, 58, 58, 0.9);
  border-radius: 20px;
  padding: 40px;
  width: 80%;
  max-width: 1000px;
  position: relative;
  margin-top: 40px;
  margin: auto;
}

.container input{
  border-radius: 50px;
}


.left-section, .right-section {
  width: 45%;
}

.left-section {
  flex: 0.4;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 120;
}


 

.right-section {
  flex: 0.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  z-index: 121;
}

h2 {
  color: #ffffff;
  text-align: center;
  margin-bottom: 30px;
}

.input-group {
  margin-bottom: 25px;
}

input {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid #b8b8b8;
  background-color: #f5f5f5;
  color: #333;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #007acc;
}

.custom-file-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: #7e7e7e;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
}

button {
  padding: 15px;
  background-color: #03b1ff;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #007acc;
}

button:disabled {
  background-color: #aaaaaa;
  cursor: not-allowed;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
}

.modal-content {
  background: #3a3a3a;
  padding: 40px;
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
}

.modal-content h2 {
  color: #ffffff;
  margin-bottom: 20px;
}

.modal-content .input-group {
  margin-bottom: 20px;
}

.modal-content input {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid #b8b8b8;
  background-color: #f5f5f5;
  color: #333;
  outline: none;
  transition: border-color 0.3s ease;

}

.modal-content button {
  background-color: #5c2323;
  margin-top: 20px;
}

.modal-content button:hover {
  background-color: #7e7e7e;
}
</style>

