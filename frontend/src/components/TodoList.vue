<template>
  <div class="todolist">
    <h1>
      ToDoList
      <button class="add-task-btn" @click="openAddTaskModal">+</button>
    </h1>

    <!-- filter -->
    <div class="filter-section">
      <label for="priority-filter">Priority:</label>
      <select id="priority-filter" v-model="filters.priority">
        <option value="">All</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <label for="tag-filter">Tag:</label>
      <input
        id="tag-filter"
        type="text"
        placeholder="Filter by tag"
        v-model="filters.tag"
      />

      <label for="tag-filter">Label:</label>
      <input
        id="tag-label"
        type="text"
        placeholder="Filter by label"
        v-model="filters.label"
      />
    </div>

    <div class="columns">
      <!-- TO DO Column -->
      <div class="column" @dragover.prevent @drop="handleDrop('To do')">
        <h2>TO DO</h2>
        <Task
          v-for="task in filteredTasks('To do')"
          :key="task._id"
          :task="task"
          @edit-task="openEditTaskModal(task)"
          @delete-task="deleteTask(task._id)"
          draggable="true"
          @dragstart="handleDragStart(task)"
        />
      </div>

      <!-- PENDING Column -->
      <div class="column" @dragover.prevent @drop="handleDrop('Pending')">
        <h2>PENDING</h2>
        <Task
          v-for="task in filteredTasks('Pending')"
          :key="task._id"
          :task="task"
          @edit-task="openEditTaskModal(task)"
          @delete-task="deleteTask(task._id)"
          draggable="true"
          @dragstart="handleDragStart(task)"
        />
      </div>

      <!-- DONE Column -->
      <div class="column" @dragover.prevent @drop="handleDrop('Done')">
        <h2>DONE</h2>
        <Task
          v-for="task in filteredTasks('Done')"
          :key="task._id"
          :task="task"
          @edit-task="openEditTaskModal(task)"
          @delete-task="deleteTask(task._id)"
          draggable="true"
          @dragstart="handleDragStart(task)"
        />
      </div>
    </div>

    <AddTaskModal
      :visible="showModalAdd"
      @submit="addTaskSubmit"
      @close="closeModal"
    />
    <EditTaskModal
      :visible="showModalEdit"
      :task="selectedTask"
      @submit="editTaskSubmit"
      @close="closeModal"
    />
  </div>
</template>

<script>
import Task from "./Task.vue";
import AddTaskModal from "./AddTaskModal.vue";
import EditTaskModal from "./EditTaskModal.vue";
import axios from "axios";

export default {
  name: "ToDoList",
  props: ["id"],
  components: { Task, AddTaskModal, EditTaskModal },
  data() {
    return {
      showModalAdd: false,
      showModalEdit: false,
      selectedTask: null,
      tasks: [],
      filters: {
        priority: "",
        tag: "",
        state: "",
        label: "",
      },
      draggedTask: null,
    };
  },
  methods: {
    async fetchTodoList() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/todo-lists/${this.id}`
        );
        this.tasks = response.data.todoItems;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    openAddTaskModal() {
      this.showModalAdd = true;
    },
    openEditTaskModal(task) {
      this.selectedTask = task;
      this.showModalEdit = true;
    },
    closeModal() {
      this.showModalAdd = false;
      this.showModalEdit = false;
    },
    async addTaskSubmit(task) {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/todo-items`,
          task
        );
        const createdTask = response.data;
        this.tasks.push(createdTask);

        await axios.put(`http://localhost:3000/api/todo-lists/${this.id}`, {
          todoItemId: createdTask._id,
        });
      } catch (error) {
        console.error("Error adding task:", error);
      } finally {
        this.closeModal();
      }
    },
    async editTaskSubmit(task) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/todo-items/${task._id}`,
          task
        );
        const updatedTask = response.data;

        const index = this.tasks.findIndex((t) => t._id === task._id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      } catch (error) {
        console.error("Error editing task:", error);
      } finally {
        this.closeModal();
      }
    },
    async deleteTask(id) {
      try {
        await axios.delete(`http://localhost:3000/api/todo-items/${id}`);
        this.tasks = this.tasks.filter((task) => task._id !== id);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
    filteredTasks(state) {
      return this.tasks.filter((task) => {
        const matchesState = state ? task.state === state : true;
        const matchesPriority =
          this.filters.priority !== ""
            ? task.priority === parseInt(this.filters.priority, 10) // Conversion en nombre
            : true;
        const matchesLabel =
          this.filters.label !== ""
            ? task.label
                ?.toLowerCase()
                .includes(this.filters.label.toLowerCase())
            : true;
        const matchesTag =
          this.filters.tag !== ""
            ? task.tag?.some((tag) =>
                tag.toLowerCase().includes(this.filters.tag.toLowerCase())
              )
            : true;

        return matchesState && matchesPriority && matchesTag && matchesLabel;
      });
    },
    handleDragStart(task) {
      this.draggedTask = task;
    },
    async handleDrop(newState) {
      if (!this.draggedTask) return;

      const updatedTask = { ...this.draggedTask, state: newState };

      try {
        const response = await axios.put(
          `http://localhost:3000/api/todo-items/${this.draggedTask._id}`,
          updatedTask
        );
        const index = this.tasks.findIndex(
          (t) => t._id === this.draggedTask._id
        );
        if (index !== -1) {
          this.tasks[index] = response.data;
        }
      } catch (error) {
        console.error("Error updating task state:", error);
      } finally {
        this.draggedTask = null;
      }
    },
  },
  mounted() {
    this.fetchTodoList();
  },
};
</script>

<style scoped>
/* Main styles */
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
  transition: background-color 0.2s;
}

.column:hover {
  background-color: #f0f8ff;
}

.task-box {
  background: white;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  cursor: grab;
}

.task-box:active {
  cursor: grabbing;
  opacity: 0.8;
}

.filter-section {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.filter-section label {
  font-size: 14px;
  font-weight: bold;
}

.filter-section select,
.filter-section input {
  padding: 5px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style>
