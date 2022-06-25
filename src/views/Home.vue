<template>
  <div class="container">
    <background src="../assets/diceGif.gif" />
    <div class="text-center pt-12">
      <h1 class="text-4xl mb-8">THE DICE SHOP</h1>
      <div v-if="walletStore.address != ''">
        <button class="button" @click="() => mintNFTHandler">Mint</button>
      </div>
      <p v-else>You've not connected your wallet yet</p>
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useWalletStore } from '../stores/wallet';
import { ethers } from 'ethers';



// Contract ABI
import MessagePortal from '../contracts/NFTCollectible.json';
import { log } from 'console';
const contractAddress = '0x5809689c338EBebe4f0f9FDA95dFD89E8996Da24';

export default defineComponent({
  name: 'WaveMe',

  components: {},


  setup() {
    const walletStore = useWalletStore();
    return {
      walletStore,
    };
  },
  mounted() {


  },
  //   watch: {
  //   '$store.': {
  //     handler() {
  //       this.getTodo();
  //     },
  //     immediate: true
  //   } 
  // },
  computed: {

    mintNFTHandler: async function () {

      //@ts-expect-error Window.ethers not TS
      if (typeof window.ethereum !== 'undefined') {
        //@ts-expect-error Window.ethers not TS
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        // Contract reference
        const nftContract = new ethers.Contract(
          contractAddress,
          MessagePortal.abi,
          signer
        );

        console.log("Initialize payment....");
        let nftTxn = await nftContract.mintNFTs(1, { value: ethers.utils.parseEther("0.01") });

        console.log(`Mined, see at : https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        alert(`Mined, see at : https://rinkeby.etherscan.io/tx/${nftTxn.hash}`)
      }
      else {
        console.log("Etherum obj does not exist")
      }
    }


  },
  watch: {

  },
});
</script>
<style>
.container {
  background-image:  url(../assets/diceGif.gif);
  width: 100%;
  height: 100%;
}
.button {
  background-color: red;
  font-size: 24px;
  border-radius: 30px;
  width: 20%;
  height: 50px;
  color: white;
}
</style>
