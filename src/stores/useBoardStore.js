import { defineStore } from "pinia";
import api from "@/api";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchBoards() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get("/boards");
        this.boards = response.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async addBoard(boardName) {
      try {
        const response = await api.post("/boards", { name: boardName });
        this.boards.push(response.data); // Add new board to UI instantly
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});
