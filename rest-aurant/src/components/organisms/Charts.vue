<template>
    <div class="stats-container">
      <h2 class="stats-title">Statistiques des ventes</h2>
      <p>Visualiser la liste de vente par semaine effectuer des recherches par date. 😉
        <br> Le chiffre d'affaire actuel monte à 300000MGA</p>
  
      <!-- Chart -->
      <div class="chart-container">
        <BarChart :chart-data="chartData" :options="chartOptions" />
      </div>
  
      <!-- Boutons de navigation -->
      <div class="navigation">
        <!-- Sélecteur de date -->
        <div class="date-picker">
          <input type="date" v-model="selectedDate" @change="goToDate" />
        </div>
        <button @click="previousWeek">
          <span class="material-symbols-rounded">chevron_left</span>
        </button>
        <button @click="nextWeek">
          <span class="material-symbols-rounded">chevron_right</span>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import BarChart from "../molecules/BarChart.vue";
  
  export default {
    name: "Charts",
    components: { BarChart },
    props: {
      salesData: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        today: new Date(),
        currentWeekStart: this.getMonday(new Date()),
        selectedDate: "",
      };
    },
    computed: {
      weekDays() {
        const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
        const start = new Date(this.currentWeekStart);
        return days.map((day, index) => {
          const date = new Date(start);
          date.setDate(start.getDate() + index);
          return { name: day, date };
        });
      },
      filteredSales() {
        return this.weekDays.map((day) => {
          const dateString = this.formatDate(day.date);
          return this.salesData[dateString] || 0;
        });
      },
      chartData() {
        return {
          labels: this.weekDays.map((day) => day.name),
          datasets: [
            {
              label: "Ventes (MGA)",
              data: this.filteredSales,
              backgroundColor: this.weekDays.map((day) =>
                day.date > this.today && this.currentWeekStart <= this.today
                  ? "hsla(0, 0%, 100%, 0.449)"
                  : "#cc2e63"
              ),
              borderWidth: 0,
            },
          ],
        };
      },
      chartOptions() {
        return {
          responsive: true,
          scales: {
            x: {
              grid: {
                display: false, // Supprime les grilles en arrière-plan
              },
              ticks: {
                color: 'hsl(337, 53%, 85%)', // Couleur des textes sur l'axe X
              },
            },
            y: {
              grid: {
                display: false, // Supprime les grilles en arrière-plan
              },
              ticks: {
                color: 'hsl(337, 53%, 85%)', // Couleur des textes sur l'axe Y
              },
            },
          },
        };
      },
    },
    methods: {
      getMonday(date) {
        const newDate = new Date(date);
        const day = newDate.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        newDate.setDate(newDate.getDate() + diff);
        return newDate;
      },
      formatDate(date) {
        return date.toISOString().split("T")[0];
      },
      previousWeek() {
        this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
        this.currentWeekStart = new Date(this.currentWeekStart);
      },
      nextWeek() {
        this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
        this.currentWeekStart = new Date(this.currentWeekStart);
      },
      goToDate() {
        if (this.selectedDate) {
          this.currentWeekStart = this.getMonday(new Date(this.selectedDate));
        }
      },
    },
  };
  </script>
  
  <style lang="scss">
  @use "@/scss/components/charts" as *;
  </style>  