<template>
    <div class="weather">
        <div v-for="(day, i) in everyEightIndex" :key="i">
            <five-day-forecast :day="day"></five-day-forecast>
        </div>
    </div>
</template>

<script>
    import FiveDayForecast from './FiveDayForecast.vue'

    export default {
        name: 'WeatherForecast',

        props: [
            "weather",
        ],

        data() {
            return {
                receivedTodayDate: ''
            }
        },

        components: {
            FiveDayForecast
        },
        
        computed: {
            everyEightIndex: function() {
                const weatherArray = []
                for( let i = 0; i < this.weather.length; i+=8) {
                    weatherArray.push(this.weather[i])
                }
                return weatherArray;
            }
        },
    }
</script>

<style scoped>
</style>