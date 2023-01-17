import { defineStore } from 'pinia'

export const useSystemNStore = defineStore('SystemNStore', {
  state: () => ({
    menuItems: [] as string[],
  }),
  getters: {
    getterMenuItems(state) {
      return state.menuItems
    },

    // items: (state): Array<{ name: string; amount: number }> =>
    //   state.rawItems.reduce((items, item) => {
    //     const existingItem = items.find(it => it.name === item)

    //     if (!existingItem)
    //       items.push({ name: item, amount: 1 })

    //     else {
    //       existingItem.amount++
    //     }

    //     return items
    //   }, [] as Array<{ name: string; amount: number }>),
  },
  actions: {
    addMenuItems(value: string[]) {
      this.menuItems = value
    },

    // removeItem(name: string) {
    //   const i = this.rawItems.lastIndexOf(name)
    //   if (i > -1)
    //     this.rawItems.splice(i, 1)
    // },

    // async purchaseItems() {
    //   const user = useUserStore()
    //   if (!user.name)
    //     return

    //   console.log('Purchasing', this.items)

    //   const n = this.items.length

    //   this.rawItems = []

    //   return n
    // },
  },
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
// }
