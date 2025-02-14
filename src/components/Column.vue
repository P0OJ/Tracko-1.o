<template>
  <div
    class="bg-column w-72 p-4 rounded-lg shadow-sm transition-all flex flex-col self-start"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragover.prevent
    @drop="onDrop"
  >
    <h3 class="text-lg font-semibold">{{ title }}</h3>

    <draggable
      :list="tasks"
      group="tasks"
      item-key="id"
      class="p-2 space-y-2 flex flex-col"
      @start="onDragStart"
      @end="onDragEnd"
    >
      <template #item="{ element }">
        <div class="w-full">
          <TaskCard v-if="draggingTask !== element" :task="element" />
          <div
            v-if="draggingTask === element"
            class="h-12 bg-gray-400/50 border-2 border-dashed border-gray-500 rounded-md"
          ></div>
        </div>
      </template>
    </draggable>

    <!-- ✅ Show Input Field for New Task -->
    <div v-if="isAddingTask" class="mt-2 p-2 bg-white rounded-md shadow">
      <input
        v-model="newTaskTitle"
        class="border p-2 rounded w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 overflow-hidden"
        placeholder="Enter task..."
        ref="taskInput"
        @keyup.enter="confirmAddTask"
        @keyup.esc="cancelAddTask"
      />
      <div class="flex gap-2 mt-2">
        <!-- ✅ Confirm Button -->
        <button
          @click="confirmAddTask"
          class="text-green-600 hover:text-green-800"
        >
          ✔
        </button>
        <!-- ✅ Cancel Button -->
        <button @click="cancelAddTask" class="text-red-600 hover:text-red-800">
          ✖
        </button>
      </div>
    </div>

    <!-- ✅ "Add a card" Button (Shown when no input is active) -->
    <button v-else class="mt-2 text-sm text-gray-600" @click="startAddingTask">
      + Add a card
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, nextTick } from "vue";
import draggable from "vuedraggable";
import TaskCard from "./TaskCard.vue";

const props = defineProps(["title", "tasks"]);
const emit = defineEmits(["update:tasks"]);

const isDraggingOver = ref(false);
const draggingTask = ref(null);
const isAddingTask = ref(false); // ✅ Track whether user is adding a task
const newTaskTitle = ref(""); // ✅ Input field value
const taskInput = ref(null); // ✅ Ref to input field

const onDragStart = (event) => {
  draggingTask.value = props.tasks[event.oldIndex];
};

const onDragEnter = () => {
  isDraggingOver.value = true;
};

const onDragLeave = () => {
  isDraggingOver.value = false;
};

const onDrop = () => {
  isDraggingOver.value = false;
  draggingTask.value = null;
};

const onDragEnd = () => {
  emit("update:tasks", props.tasks);
  isDraggingOver.value = false;
  draggingTask.value = null;
};

// ✅ Show input field when "Add a card" is clicked
const startAddingTask = async () => {
  isAddingTask.value = true;
  await nextTick(); // Wait until Vue updates the DOM
  taskInput.value.focus(); // Auto-focus the input field
};

// ✅ Confirm task creation when "✔" or Enter is pressed
const confirmAddTask = () => {
  if (newTaskTitle.value.trim() !== "") {
    emit("update:tasks", [
      ...props.tasks,
      { id: Date.now(), title: newTaskTitle.value.trim() },
    ]);
  }
  cancelAddTask();
};

// ✅ Cancel task creation when "✖" or Escape is pressed
const cancelAddTask = () => {
  isAddingTask.value = false;
  newTaskTitle.value = ""; // Clear input field
};
</script>
