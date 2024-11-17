// stores/counter.js
import { defineStore } from 'pinia'

export const useTimelineStore = defineStore('timeline', {
  state: () => 
   ({
      timeline: {} as any,
   })
  ,
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setTimeline(timeline: any) {
      this.timeline = timeline;
    },
  },
  getters: {
    getTimeline(): any {
      return this.timeline;
    }
  },
})