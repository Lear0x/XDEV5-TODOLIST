<template>
  <div class="modal-overlay" v-if="visible">
    <div class="modal">
      <h2>Create Task</h2>
      <form @submit.prevent="handleSubmit">
        <label for="label">Label:</label>
        <input id="label" v-model="taskData.label" required />

        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="taskData.description"
          required
        ></textarea>

        <label for="priority">Priority:</label>
        <select id="priority" v-model="taskData.priority" required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        <label for="tag">Tags:</label>
        <div class="tags-input-container">
          <input id="tag" v-model="newTag" placeholder="Add a tag" />
          <button type="button" @click="addTag">+</button>
        </div>
        <div class="tags-list">
          <span
            v-for="(tagItem, index) in taskData.tag"
            :key="index"
            class="tag"
          >
            {{ tagItem }}
            <button @click="removeTag(index)">×</button>
          </span>
        </div>

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
          <option value="To do">To Do</option>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>

        <div class="form-actions">
          <button type="submit">Add</button>
          <button type="button" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddTaskModal",
  props: {
    visible: { type: Boolean, required: true },
  },
  data() {
    return {
      taskData: {
        label: "",
        description: "",
        priority: "",
        tag: [], // Tableau pour stocker les tags
        startDate: "",
        endDate: "",
        state: "To do",
        assignedTo: "6745c904e91d2af46701ab45",
      },
      newTag: "", // Nouveau tag en cours d'ajout
    };
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
    addTag() {
      if (this.newTag.trim()) {
        this.taskData.tag.push(this.newTag.trim());
        this.newTag = ""; // Réinitialiser le champ de tag
      }
    },
    removeTag(index) {
      this.taskData.tag.splice(index, 1);
    },
  },
};
</script>

<style scoped>
/* Styles pour le container de tags */
.tags-input-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.tags-list {
  margin-top: 10px;
}

.tag {
  display: inline-block;
  background-color: #e0e0e0;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 20px;
  font-size: 14px;
  position: relative;
}

.tag button {
  background: none;
  border: none;
  font-size: 14px;
  margin-left: 5px;
  cursor: pointer;
  color: #ff0000;
}
</style>
