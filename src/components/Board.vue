<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold">Task Board</h2>
    <div class="flex gap-4 mt-6 overflow-x-auto">
      <Column
        v-for="col in columns"
        :key="col.id"
        :title="col.title"
        :tasks="col.tasks"
        @update:tasks="updateColumnTasks(col.id, $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Column from "./Column.vue";

const columns = ref([
  { id: "todo", title: "To Do", tasks: [{ id: 1, title: "Setup Backend" }] },
  { id: "doing", title: "Doing", tasks: [] }, // ✅ Now supports empty state
  { id: "done", title: "Done", tasks: [] }, // ✅ Now supports empty state
]);

const updateColumnTasks = (columnId, newTasks) => {
  const column = columns.value.find((col) => col.id === columnId);
  if (column) {
    column.tasks = newTasks;
  }
};
</script>
