import { defineStore } from 'pinia'

type State = {
  darkMode: boolean
  backend: string
  pollInterval: number
}

export const useSettingsStore = defineStore({
  id: 'settings',
  persist: true,
  state: (): State => ({
    darkMode: false as boolean,
    backend: 'https://graphql.dev.runbook.solutions' as string,
    pollInterval: 5 as number
  }),
  getters: {
    getDarkMode(): boolean {
      return this.darkMode
    },
    getBackendServer(): string {
      if (this.backend == '')
        return 'https://graphql.dev.runbook.solutions'

      return this.backend
    }
  },
  actions: {
    setDarkMode(status: boolean): void {
      this.darkMode = status
    },
    toggleDarkMode(): void {
      this.darkMode = !this.darkMode
    }
  }
})
