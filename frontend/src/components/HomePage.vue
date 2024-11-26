<template>
  <div class="homepage">
    <h1>Mes ToDoLists</h1>
    <div class="todo-lists">
      <div
        class="todo-box"
        v-for="list in todoLists"
        :key="list._id"
        @click="goToList(list._id)"
      >
        <h2>{{ list.label }}</h2>
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
      todoLists: [], // Liste vide initialement
    };
  },
  methods: {
    // Méthode pour naviguer vers une todolist
    goToList(id) {
      this.$router.push(`/todolist/${id}`);
    },
    // Méthode pour récupérer les données
    async fetchTodoLists() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/todo-lists/"
        );
        this.todoLists = response.data; // Assigner les données à la liste
        console.log(this.todoLists);
      } catch (error) {
        console.error("Erreur lors de la récupération des todolists :", error);
      }
    },
  },
  // Récupérer les données au montage du composant
  mounted() {
    this.fetchTodoLists();
  },
};
</script>

<style scoped>
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
  background-color: #007bff;
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
</style>
