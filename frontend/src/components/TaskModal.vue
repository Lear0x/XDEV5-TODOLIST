<template>
  <div class="modal-overlay" v-if="visible">
    <div class="modal">
      <h2>
        {{ isEditMode ? "Update task" : "Create task" }}
      </h2>
      <form @submit.prevent="handleSubmit">
        <label for="label">label:</label>
        <input id="label" v-model="taskData.label" required />

        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="taskData.description"
          required
        ></textarea>

        <label for="priority">priority:</label>
        <select id="priority" v-model="taskData.priority" required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        <label for="tag">Tag:</label>
        <input id="tag" v-model="taskData.tag" />

        <label for="startDate">Start Date:</label>
        <input
          id="startDate"
          type="date"
          v-model="formattedStartDate"
          required
        />

        <label for="endDate">End Date:</label>
        <input id="endDate" type="date" v-model="formattedEndDate" required />

        <label for="state">State:</label>
        <select id="state" v-model="taskData.state" required>
          <option value="To do">TO DO</option>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>

        <div class="form-actions">
          <button type="submit">
            {{ isEditMode ? "Update" : "Add" }}
          </button>
          <button type="button" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskModal",
  props: {
    visible: { type: Boolean, required: true },
    task: {
      type: Object,
      default: () => ({
        label: "",
        description: "",
        priority: "",
        tag: "",
        startDate: "",
        endDate: "",
        state: "To do",
        assignedTo: "6745c904e91d2af46701ab45",
      }),
    },
    isEditMode: { type: Boolean, default: false },
  },
  data() {
    return {
      taskData: { ...this.task },
    };
  },
  watch: {
    task: {
      immediate: true,
      handler(newTask) {
        this.taskData = { ...newTask };
      },
    },
  },
  computed: {
    formattedStartDate: {
      get() {
        return this.formatDateForInput(this.taskData.startDate);
      },
      set(value) {
        this.taskData.startDate = value;
      },
    },
    formattedEndDate: {
      get() {
        return this.formatDateForInput(this.taskData.endDate);
      },
      set(value) {
        this.taskData.endDate = value;
      },
    },
  },
  methods: {
    handleSubmit() {
      console.log("Emitting submit event:", this.taskData);
      this.$emit("submit", this.taskData);
    },
    formatDateForInput(date) {
      if (!date) return "";
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
};
</script>

<style scoped>
/* Main styles */
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
