<template>
  <div class="todolist">
    <h1>
      ToDoList Vue {{ id }}
      <button class="add-task-btn" @click="showModal = true">+</button>
    </h1>

    <!-- Colonnes des tâches -->
    <div class="columns">
      <div class="column">
        <h2>TO DO</h2>
        <Task
          v-for="task in tasks.todo"
          :key="task.id"
          :task="task"
          @edit-task="editTask"
          @delete-task="deleteTask"
        />
      </div>

      <div class="column">
        <h2>In Progress</h2>
        <Task
          v-for="task in tasks.inProgress"
          :key="task.id"
          :task="task"
          @edit-task="editTask"
          @delete-task="deleteTask"
        />
      </div>

      <div class="column">
        <h2>Finish</h2>
        <Task
          v-for="task in tasks.finish"
          :key="task.id"
          :task="task"
          @edit-task="editTask"
          @delete-task="deleteTask"
        />
      </div>
    </div>

    <!-- Modale pour créer une tâche -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>Créer une nouvelle tâche</h2>
        <form @submit.prevent="addTask">
          <label for="title">Titre:</label>
          <input id="title" v-model="newTask.title" required />

          <label for="description">Description:</label>
          <textarea
            id="description"
            v-model="newTask.description"
            required
          ></textarea>

          <label for="priority">Priorité:</label>
          <select id="priority" v-model="newTask.priority" required>
            <option value="Haute">Haute</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>

          <label for="tag">Tag:</label>
          <input id="tag" v-model="newTask.tag" required />

          <label for="startDate">Date de début:</label>
          <input
            id="startDate"
            type="date"
            v-model="newTask.startDate"
            required
          />

          <label for="endDate">Date de fin:</label>
          <input id="endDate" type="date" v-model="newTask.endDate" required />

          <label for="state">État:</label>
          <select id="state" v-model="newTask.state" required>
            <option value="todo">TO DO</option>
            <option value="inProgress">In Progress</option>
            <option value="finish">Finish</option>
          </select>

          <div class="form-actions">
            <button type="submit">Ajouter</button>
            <button type="button" @click="showModal = false">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "./Task.vue";

export default {
  name: "ToDoList",
  props: ["id"],
  components: {
    Task,
  },
  data() {
    return {
      showModal: false,
      newTask: {
        title: "",
        description: "",
        priority: "Moyenne",
        tag: "",
        startDate: "",
        endDate: "",
        state: "todo",
      },
      tasks: {
        todo: [
          {
            id: 1,
            title: "Tâche 1",
            priority: "Haute",
            deadline: "2024-11-30",
            state: "todo",
          },
          {
            id: 2,
            title: "Tâche 2",
            priority: "Moyenne",
            deadline: "2024-12-05",
            state: "todo",
          },
        ],
        inProgress: [
          {
            id: 3,
            title: "Tâche 3",
            priority: "Basse",
            deadline: "2024-12-01",
            state: "inProgress",
          },
        ],
        finish: [
          {
            id: 4,
            title: "Tâche 4",
            priority: "Moyenne",
            deadline: "2024-11-25",
            state: "finish",
          },
        ],
      },
    };
  },
  methods: {
    addTask() {
      const newTask = { ...this.newTask, id: Date.now() };

      // Ajouter la tâche dans la bonne liste selon l'état
      if (newTask.state === "todo") {
        this.tasks.todo.push(newTask);
      } else if (newTask.state === "inProgress") {
        this.tasks.inProgress.push(newTask);
      } else if (newTask.state === "finish") {
        this.tasks.finish.push(newTask);
      }

      // Réinitialiser le formulaire et fermer la modale
      this.newTask = {
        title: "",
        description: "",
        priority: "Moyenne",
        tag: "",
        startDate: "",
        endDate: "",
        state: "todo",
      };
      this.showModal = false;
    },
    editTask(id) {
      alert(`Éditer la tâche avec l'ID ${id}`);
      // Implémente ici la logique d'édition
    },
    deleteTask(id) {
      // Recherche et suppression dans les listes appropriées
      Object.keys(this.tasks).forEach((state) => {
        this.tasks[state] = this.tasks[state].filter((task) => task.id !== id);
      });
    },
  },
};
</script>

<style scoped>
/* Styles principaux */
.todolist {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.todolist h1 {
  font-size: 28px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-task-btn {
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

.add-task-btn:hover {
  transform: scale(1.1);
}

.columns {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.column {
  flex: 1;
  background: #f9f9f9;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.task-box {
  background: white;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
}

/* Styles de la modale */
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
  padding-right: 25px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.3s ease;
}

.modal h2 {
  font-size: 25px;
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

.modal form input,
.modal form textarea,
.modal form select {
  width: 100%;
  padding: 6px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.3s;
}

.modal form input:focus,
.modal form textarea:focus,
.modal form select:focus {
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

/* Animation */
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
</style>
