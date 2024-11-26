<template>
  <div class="modal-overlay" v-if="visible">
    <div class="modal">
      <h2>
        {{ isEditMode ? "Modifier une tâche" : "Créer une nouvelle tâche" }}
      </h2>
      <form @submit.prevent="handleSubmit">
        <label for="title">Titre:</label>
        <input id="title" v-model="taskData.title" required />

        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="taskData.description"
          required
        ></textarea>

        <label for="priority">Priorité:</label>
        <select id="priority" v-model="taskData.priority" required>
          <option value="Haute">Haute</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Basse">Basse</option>
        </select>

        <label for="tag">Tag:</label>
        <input id="tag" v-model="taskData.tag" required />

        <label for="startDate">Date de début:</label>
        <input
          id="startDate"
          type="date"
          v-model="taskData.startDate"
          required
        />

        <label for="endDate">Date de fin:</label>
        <input id="endDate" type="date" v-model="taskData.endDate" required />

        <label for="state">État:</label>
        <select id="state" v-model="taskData.state" required>
          <option value="todo">TO DO</option>
          <option value="inProgress">In Progress</option>
          <option value="finish">Finish</option>
        </select>

        <div class="form-actions">
          <button type="submit">
            {{ isEditMode ? "Modifier" : "Ajouter" }}
          </button>
          <button type="button" @click="$emit('close')">Annuler</button>
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
        title: "",
        description: "",
        priority: "Moyenne",
        tag: "",
        startDate: "",
        endDate: "",
        state: "todo",
      }),
    },
    isEditMode: { type: Boolean, default: false },
  },
  data() {
    return {
      taskData: { ...this.task }, // Copie des données pour modification locale
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", this.taskData); // Émet l'événement avec les données de la tâche
    },
  },
};
</script>

<style scoped>
/* Styles principaux de la modale */
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
