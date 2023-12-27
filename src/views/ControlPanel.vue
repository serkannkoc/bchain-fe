<template>
  <div class="container">
    <div class="container d-flex justify-content-center mt-2">
      <button class="btn btn-primary me-4" @click="openWalletConnection">Connect Wallet</button>
      <button class="btn btn-primary" @click="openWalletDisConnection">Disconnect Wallet</button>
    </div>
    <div class="mt-3">
      <h1 class="text-center">Instant Market Data</h1>
      <table class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">1h%</th>
          <th scope="col">24h%</th>
          <th scope="col">7d%</th>
          <th scope="col">Market Cap</th>
          <th scope="col">Volume(24)</th>
          <th scope="col">Circulating Supply</th>
        </tr>
        </thead>
        <tbody>
        <!-- Loop through each coin in the response and populate the table -->
        <tr v-for="(coin, index) in marketData" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ coin.name }}</td>
          <td>{{ coin.quote.USD.price }}</td>
          <td>{{ coin.quote.USD.percent_change_1h }}</td>
          <td>{{ coin.quote.USD.percent_change_24h }}</td>
          <td>{{ coin.quote.USD.percent_change_7d }}</td>
          <td>{{ coin.quote.USD.market_cap }}</td>
          <td>{{ coin.quote.USD.volume_24h }}</td>
          <td>{{ coin.circulating_supply }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      marketData: [],
    };
  },
  created() {
    this.getMarketData();
  },
  methods: {
    async getMarketData() {
      try {
        const response = await axios.get('http://localhost:3001/market-data', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.marketData = response.data; // Assuming the response is an array of coins
      } catch (error) {
        console.error(error);
      }
    },
    openWalletConnection(){
      this.$router.push({name:"wallet-connection"})
    },
    openWalletDisConnection(){
      this.$router.push({name:"wallet-disconnection"})
    }
  },
};
</script>
