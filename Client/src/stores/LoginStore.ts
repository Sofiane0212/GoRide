import { defineStore } from 'pinia';

export const useLoginStore = defineStore('Login', {
    state: () => ({
        previousView: '' as string,
        username: '' as string
    }),
    getters: {
        getPreviousView: (state) => state.previousView,
        getUserName: (state) => state.username
    },
    actions: {
        setPreviousView(inView: string) {
            this.previousView = inView;
        },
        setUserName(newName: string) {
            this.username = newName
        }
    }
})