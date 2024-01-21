import { defineStore } from 'pinia'

type State = {
  darkMode: boolean
}

export const useSettingsStore = defineStore({
    id: 'settings',
    persist: true,
    state: (): State => ({
        darkMode: false as boolean,
    }),
    getters: {
      getDarkMode(): boolean { return this.darkMode; },
    },
    actions: {
      setDarkMode(status: boolean): void {
        this.darkMode = status;
      },
      toggleDarkMode():void {
        this.darkMode = !this.darkMode;
      }
    }
});