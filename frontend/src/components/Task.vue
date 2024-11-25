<template>
  <div class="task-box">
    <p class="task-title">{{ task.title }}</p>
    <p class="task-priority">Priorité: {{ task.priority }}</p>
    <p class="task-deadline">Échéance: {{ task.deadline }}</p>
    <div class="task-actions">
      <button class="edit-btn">✏️</button>
      <button class="delete-btn">🗑️</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskComponent",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    editTask(id) {
      this.$emit("edit-task", id);
    },
    deleteTask(id) {
      this.$emit("delete-task", id);
    },
  },
};
</script>

<style scoped>
.task-box {
  background: white;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  position: relative;
}

.task-title {
  font-weight: bold;
}

.task-priority,
.task-deadline {
  font-size: 12px;
  color: #555;
}

.task-actions {
  display: flex;
  gap: 5px;
  position: absolute;
  bottom: 5px;
  right: 5px;
}

.task-actions button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px;
  font-size: 16px;
  transition: transform 0.2s ease;
}

.task-actions button:hover {
  transform: scale(1.2);
}
</style>
