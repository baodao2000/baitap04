import { defineStore } from 'pinia'

interface WalletData {
  address: string
  acc_short: string
}

export const useWalletStore = defineStore('wallet', {
  state: () => {
    return {
      address: '',
      provider: null,
      acc_short: '',
      acc_long:''
    }
  },

  actions: {
    //@ts-ignore
    saveWalletData(payload: WalletData) {
      this.address = payload.address
      this.acc_long = payload.address
      this.acc_short = `${payload.address.slice(
        0,
        2
      )}...${payload.address.slice(-4)}`
    },
  },
})
