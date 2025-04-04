import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";
const FONT_SIZE_KEY = "editorFontSize"; 

const useCodeStore = create((set) => ({
  code: "console.log('Hello, World!');",
  output: "",
  theme: "vs-dark",
  fontSize: parseInt(localStorage.getItem(FONT_SIZE_KEY)) || 14, 

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
      console.error("Failed to fetch theme", error);
    }
  },

  setTheme: async (theme) => {
    set({ theme });
    try {
      await axios.post(`${API_BASE_URL}/theme`, { theme });
    } catch (error) {
      console.error("Failed to update theme", error);
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
}));

export default useCodeStore;
