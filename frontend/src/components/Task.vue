<template>
  <div class="task-box">
    <h3 class="task-title">{{ task.label }}</h3>
    <p class="task-deadline">{{ task.description }}</p>
    <p class="task-priority">Priority: {{ task.priority }}</p>
    <p class="task-deadline">
      {{ formattedStartDate }} - {{ formattedEndDate }}
    </p>

    <!-- tags -->
    <div class="tags-list" v-if="task.tag && task.tag.length">
      <span v-for="(tag, index) in task.tag" :key="index" class="tag">
        {{ tag }}
      </span>
    </div>

    <div class="task-actions">
      <button class="edit-btn" @click="editTask(task)">✏️</button>
      <button class="delete-btn" @click="deleteTask(task.id)">🗑️</button>
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
  computed: {
    formattedStartDate() {
      return this.formatDate(this.task.startDate);
    },
    formattedEndDate() {
      return this.formatDate(this.task.endDate);
    },
  },
  methods: {
    editTask(task) {
      this.$emit("edit-task", task);
    },
    deleteTask(id) {
      this.$emit("delete-task", id);
    },
    formatDate(date) {
      if (!date) return "N/A";
      const d = new Date(date);
      const options = { year: "numeric", month: "long", day: "numeric" };

      return d.toLocaleDateString("en-US", options);
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
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
}

.tags-list {
  margin-top: 8px;
}

.tag {
  display: inline-block;
  background-color: #e0e0e0;
  color: #333;
  padding: 4px 8px;
  margin: 2px;
  border-radius: 12px;
  font-size: 12px;
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
