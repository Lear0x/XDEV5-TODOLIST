<template>
  <div class="homepage">
    <h1>
      Mes ToDoLists
      <button class="add-todolist-btn" @click="openAddTodoListModal">+</button>
      <button class="edit-mode-btn" @click="toggleDeleteMode">✏️</button>
    </h1>
    <div class="todo-lists">
      <div
        class="todo-box"
        v-for="list in todoLists"
        :key="list._id"
        @click="!deleteMode && goToList(list._id)"
      >
        <h2>{{ list.label }}</h2>
        <button
          class="trash"
          v-if="deleteMode"
          @click.stop="deleteTodoList(list._id)"
        >
          🗑️
        </button>
      </div>
    </div>

    <div class="modal-overlay" v-if="showModal">
      <div class="modal">
        <h2>Add Todolist</h2>
        <form @submit.prevent="addTodoList">
          <label for="label">Name of the Todolist:</label>
          <input
            id="label"
            v-model="newTodoList.label"
            placeholder="Ex: Courses de la semaine"
            required
          />
          <div class="form-actions">
            <button type="submit">Add</button>
            <button type="button" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      todoLists: [],
      showModal: false,
      deleteMode: false,
      newTodoList: {
        label: "",
      },
    };
  },
  methods: {
    goToList(id) {
      this.$router.push(`/todolist/${id}`);
    },
    async fetchTodoLists() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/todo-lists/"
        );
        this.todoLists = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des todolists :", error);
      }
    },
    openAddTodoListModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.newTodoList.label = "";
    },
    async addTodoList() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/todo-lists",
          this.newTodoList
        );
        this.todoLists.push(response.data);
        this.closeModal();
      } catch (error) {
        console.error("Erreur lors de l'ajout de la ToDoList :", error);
      }
    },
    toggleDeleteMode() {
      this.deleteMode = !this.deleteMode; // Alterne entre les modes normal et suppression
    },
    async deleteTodoList(id) {
      try {
        await axios.delete(`http://localhost:3000/api/todo-lists/${id}`);
        this.todoLists = this.todoLists.filter((list) => list._id !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression de la ToDoList :", error);
      }
    },
  },
  mounted() {
    this.fetchTodoLists();
  },
};
</script>

<style scoped>
/* Main styles */
.homepage {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.homepage h1 {
  margin-bottom: 30px;
  font-size: 28px;
  color: #333;
}

.todo-lists {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.trash {
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px;
  font-size: 16px;
  transition: transform 0.2s ease;
}

.todo-box {
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  transition: transform 0.3s, box-shadow 0.3s;
  padding: 10px;
}

.todo-box h2 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #555;
}

.todo-box button {
  padding: 10px 20px;
  /* background-color: #007bff; */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.todo-box:hover {
  transform: translateY(-5px);
  box-shadow: 2px 4px 15px rgba(0, 0, 0, 0.2);
  background-color: #bbbbbb;
}

.add-todolist-btn {
  margin-left: 20px;
  font-size: 20px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition: transform 0.2s;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal {
  background: white;
  padding: 15px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.3s ease;
}

.modal h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.modal form label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
  margin-top: 8px;
  font-size: 15px;
  color: #444;
}

.modal form input {
  width: 100%;
  padding: 6px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.3s;
}

.modal form input:focus {
  border-color: #28a745;
}

.modal .form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.modal .form-actions button {
  padding: 6px 10px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal .form-actions button[type="submit"] {
  background: #28a745;
  color: white;
}

.modal .form-actions button[type="submit"]:hover {
  background: #218838;
}

.modal .form-actions button[type="button"] {
  background: #dc3545;
  color: white;
}

.modal .form-actions button[type="button"]:hover {
  background: #c82333;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.edit-mode-btn {
  margin-left: 10px;
  font-size: 20px;
  background: #ffc107;
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition: transform 0.2s;
}

.edit-mode-btn:hover {
  transform: scale(1.1);
}
</style>
