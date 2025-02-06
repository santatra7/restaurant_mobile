<template>
    <div>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from "chart.js";
  
  Chart.register(...registerables);
  
  export default {
    name: "BarChart",
    props: {
      chartData: Object,
    },
    watch: {
      chartData: {
        handler() {
          this.renderChart();
        },
        deep: true,
      },
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        if (this.chartInstance) {
          this.chartInstance.destroy();
        }
        this.chartInstance = new Chart(this.$refs.chartCanvas, {
          type: "bar",
          data: this.chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            animation: {
              duration: 1000,
              easing: "easeOutBounce",
            },
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  canvas {
    width: 100% !important;
    height: 300px !important;
  }
  </style>  