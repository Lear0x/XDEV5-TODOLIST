<template>
  <div class="todolist">
    <h1>
      ToDoList Vue {{ this.id }}
      <button class="add-task-btn" @click="openAddTaskModal">+</button>
    </h1>

    <div class="columns">
      <div class="column">
        <h2>TO DO</h2>
        <Task
          v-for="task in tasks.filter((task) => task.state === 'To do')"
          :key="task.id"
          :task="task"
          @edit-task="openEditTaskModal(task)"
          @delete-task="deleteTask"
        />
      </div>

      <div class="column">
        <h2>PENDING</h2>
        <Task
          v-for="task in tasks.filter((task) => task.state === 'Pending')"
          :key="task.id"
          :task="task"
          @edit-task="openEditTaskModal"
          @delete-task="deleteTask"
        />
      </div>

      <div class="column">
        <h2>DONE</h2>
        <Task
          v-for="task in tasks.filter((task) => task.state === 'Done')"
          :key="task.id"
          :task="task"
          @edit-task="openEditTaskModal"
          @delete-task="deleteTask"
        />
      </div>
    </div>

    <!-- Composant réutilisable TaskModal -->
    <TaskModal
      :visible="showModal"
      :task="selectedTask"
      :isEditMode="isEditMode"
      @submit="handleTaskSubmit"
      @close="closeModal"
    />
  </div>
</template>

<script>
import Task from "./Task.vue";
import TaskModal from "./TaskModal.vue";
import axios from "axios";

export default {
  name: "ToDoList",
  props: ["id"],
  components: { Task, TaskModal },
  data() {
    return {
      showModal: false,
      isEditMode: false,
      selectedTask: null,
      todolist: [],
      tasks: [],
    };
  },
  methods: {
    async fetchTodoList() {
      try {
        const id = this.id;
        await axios
          .get(`http://localhost:3000/api/todo-lists/${id}`)
          .then((response) => {
            this.tasks = response.data.todoItems;
            console.log(this.tasks);
          });

        console.log(this.tasks);
      } catch (error) {
        console.error("Erreur lors de la récupération des todolists :", error);
      }
    },
    openAddTaskModal() {
      this.selectedTask = null;
      this.isEditMode = false;
      this.showModal = true;
    },
    openEditTaskModal(task) {
      this.selectedTask = task;
      this.isEditMode = true;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async handleTaskSubmit(task) {
      if (this.isEditMode) {
        Object.keys(this.tasks).forEach((state) => {
          const index = this.tasks[state].findIndex((t) => t.id === task.id);
          if (index !== -1) {
            this.tasks[state][index] = task;
          }
        });
      } else {
        console.log(task);

        task.assignedTo = "6745c904e91d2af46701ab45";
        try {
          await axios
            .post(`http://localhost:3000/api/todo-items`, task)
            .then(async (response) => {
              console.log("response", response);
              console.log("item", this.tasks);
              const id = {
                todoItemId: response.data._id,
              };

              await axios
                .put(`http://localhost:3000/api/todo-Lists/${this.id}`, id)
                .then((response2) => {
                  console.log("response2", response2);
                });
            });
        } catch (error) {
          console.error("Erreur lors de l'ajout d'un item :", error);
        }
      }
      this.closeModal();
    },
    deleteTask(id) {
      Object.keys(this.tasks).forEach((state) => {
        this.tasks[state] = this.tasks[state].filter((task) => task.id !== id);
      });
    },
  },
  mounted() {
    this.fetchTodoList();
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
</style>
