import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";
const FONT_SIZE_KEY = "editorFontSize"; 

const useCodeStore = create((set) => ({
  code: "",
  output: "",
  theme: "vs-dark",
  fontSize: parseInt(localStorage.getItem(FONT_SIZE_KEY)) || 14,
  aiReview: "",
  isLoadingReview: false, 

  setCode: (code) => set({ code }),

  increaseFontSize: () =>
    set((state) => {
      const newSize = Math.min(state.fontSize + 2, 30);
      localStorage.setItem(FONT_SIZE_KEY, newSize);
      return { fontSize: newSize };
    }),

  decreaseFontSize: () =>
    set((state) => {
      const newSize = Math.max(state.fontSize - 2, 10);
      localStorage.setItem(FONT_SIZE_KEY, newSize);
      return { fontSize: newSize };
    }),

  fetchTheme: async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/theme`);
      if (res.data.theme) set({ theme: res.data.theme });
    } catch (error) {
      console.error("Failed to fetch theme:", error);
    }
  },

  setTheme: async (theme) => {
    set({ theme });
    try {
      await axios.post(`${API_BASE_URL}/theme`, { theme });
    } catch (error) {
      console.error("Failed to update theme:", error);
    }
  },

  runCode: () =>
    set((state) => {
      try {
        let log = [];
        const consoleLog = (msg) => log.push(msg);
        new Function("console", state.code)({ log: consoleLog });
        return { output: log.join("\n") };
      } catch (err) {
        return { output: "Error: " + err.message };
      }
    }),

  clearOutput: () => set({ output: "" }),

  reviewCode: async () => {
    const { code } = useCodeStore.getState();

    if (!code.trim()) {
      set({ aiReview: "Error: No code provided for review." });
      return;
    }

    set({ aiReview: "Reviewing code...", isLoadingReview: true });

    try {
      const res = await axios.post(`${API_BASE_URL}/review`, { prompt: code });


      set({ aiReview: res.data.review || "No review available.", isLoadingReview: false });
    } catch (error) {
      console.error("Failed to get AI review:", error);
      set({
        aiReview: `Error: ${error.response?.data?.error || "Unable to fetch AI review."}`,
        isLoadingReview: false
      });
    }
  },


  saveCode: async () => {
    try {
      const { code, aiReview } = useCodeStore.getState();
      await axios.post(`${API_BASE_URL}/save-code`, { code, review: aiReview });
      alert("Code saved successfully!");
    } catch (error) {
      console.error("Failed to save code:", error);
    }
  },
}));

export default useCodeStore;
