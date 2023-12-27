<template>
  <div class="container-xxl d-flex justify-content-center flex-column">
    <h1 class="text-center">Connect Wallet</h1>
    <h3 class="text text-secondary-emphasis border border-3">Wallet Address: {{ walletAddress }}</h3>
    <h3 class="text text-secondary-emphasis border border-3">Wallet Value: {{ walletValue }}</h3>
    <button @click="scanQR" class="btn btn-primary w-25">Scan QR</button>
    <h1 v-if="qrCode">QR Code: {{ qrCode }}</h1>
    <button @click="voteForTeacher" class="btn btn-primary w-25 mt-2">Vote For The Teacher</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      walletAddress: "",
      walletValue: "",
      qrCode: "",
    }
  },
  methods:{
    scanQR(){
      console.log("scan qr")
    },
    voteForTeacher(){
      this.$router.push({ name: 'course-evaluation' });
    }
  }
};
</script>