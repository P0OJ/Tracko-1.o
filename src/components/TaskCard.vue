<template>
  <div
    class="bg-white p-3 rounded-lg shadow-md flex flex-col relative group w-full"
  >
    <!-- Display Mode -->
    <div v-if="!isEditing" class="flex justify-between items-center">
      <span class="break-words">{{ task.title }}</span>

      <!-- Edit Icon (Appears on Hover) -->
      <button
        class="hidden group-hover:block text-gray-500 hover:text-gray-700"
        @click="startEditing"
      >
        ✏️
      </button>
    </div>

    <!-- Edit Mode -->
    <div v-else class="flex flex-col gap-2">
      <textarea
        v-model="editedTitle"
        rows="2"
        class="border p-2 rounded w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 overflow-hidden"
        @input="adjustHeight"
        ref="textareaRef"
      ></textarea>

      <!-- Save & Cancel Buttons Below -->
      <div class="flex gap-4 mt-2">
        <button @click="saveEdit" class="text-green-500 hover:text-green-700">
          ✔
        </button>
        <button @click="cancelEdit" class="text-red-500 hover:text-red-700">
          ✖
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

const props = defineProps(["task"]);
const isEditing = ref(false);
const editedTitle = ref(props.task.title);
const textareaRef = ref(null);

const startEditing = () => {
  isEditing.value = true;
  editedTitle.value = props.task.title;

  // Auto-adjust height when entering edit mode
  nextTick(() => {
    adjustHeight();
    textareaRef.value?.focus();
  });
};

const saveEdit = () => {
  props.task.title = editedTitle.value;
  isEditing.value = false;
};

const cancelEdit = () => {
  isEditing.value = false;
  editedTitle.value = props.task.title;
};

const adjustHeight = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = "auto"; // Reset height
    textareaRef.value.style.height = textareaRef.value.scrollHeight + "px"; // Set new height
  }
};
</script>
