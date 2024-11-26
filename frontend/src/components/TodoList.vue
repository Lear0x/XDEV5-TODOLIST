<template>
  <div class="todolist">
    <h1>
      ToDoList Vue {{ id }}
      <button class="add-task-btn" @click="openAddTaskModal">+</button>
    </h1>

    <div class="columns">
      <!-- Colonnes des tâches -->
      <div class="column">
        <h2>TO DO</h2>
        <Task
          v-for="task in tasks.todo"
          :key="task.id"
          :task="task"
          @edit-task="openEditTaskModal(task)"
          @delete-task="deleteTask"
        />
      </div>

      <div class="column">
        <h2>In Progress</h2>
        <Task
          v-for="task in tasks.inProgress"
          :key="task.id"
          :task="task"
          @edit-task="openEditTaskModal"
          @delete-task="deleteTask"
        />
      </div>

      <div class="column">
        <h2>Finish</h2>
        <Task
          v-for="task in tasks.finish"
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

export default {
  name: "ToDoList",
  components: { Task, TaskModal },
  data() {
    return {
      showModal: false,
      isEditMode: false,
      selectedTask: null,
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
    handleTaskSubmit(task) {
      if (this.isEditMode) {
        // Met à jour la tâche existante
        Object.keys(this.tasks).forEach((state) => {
          const index = this.tasks[state].findIndex((t) => t.id === task.id);
          if (index !== -1) {
            this.tasks[state][index] = task;
          }
        });
      } else {
        // Ajoute une nouvelle tâche
        this.tasks[task.state].push({ ...task, id: Date.now() });
      }
      this.closeModal();
    },
    deleteTask(id) {
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
</style>
