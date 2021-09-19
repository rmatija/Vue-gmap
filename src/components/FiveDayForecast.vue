<template>
    <div class="weather-day-container" :class="{ border: isToday }">
        <div  class="weather-date-container">
            <p class="dark">{{weekDay}} {{date}} {{month}}  <i>{{ isToday ? '(today)' : ''}}</i></p>
            <div class="weather-daily-temp">
                <p :class="[(minTemp <= 14 && 'blue-background') || (minTemp <= 17 && 'green-background') || (minTemp <= 25 && 'orange-background') || (minTemp > 25 && 'red-background')]">{{   minTemp }}C </p>
                <p :class="[(maxTemp <= 14 && 'blue-background') || (maxTemp <= 17 && 'green-background') || (maxTemp <= 25 && 'orange-background') || (maxTemp > 25 && 'red-background')]">{{ maxTemp }}C </p>
            </div>
        </div>
        <p>{{desc}}</p>
        <p><span class="dark">clouds: </span> {{ clouds }}%, {{ pressure }}hpa</p>
    </div>
</template>

<script>
export default {
    name: "FiveDayForecast",

    props: [
        "day",
    ],

    data() {
        return {
            receivedDate: '',
            myDate: '',
            weekDay: '',
            month: '',
            date: '',
            today: '',
            isToday: '',
            minTemp: '',
            maxTemp: '',
            desc: '',
            clouds: '',
            pressure: ''
        }
    },

    created() {
        this.getDate()
        this.setToday()
        this.getWeatherValues()
    },

    methods: {
        getDate() {
            this.receivedDate = this.day.dt
            this.myDate = new Date(this.receivedDate * 1000)
            this.weekDay = this.myDate.toLocaleString('default', { weekday: 'short' })
            this.date = this.myDate.toLocaleString('default', { day: 'numeric' })
            this.month = this.myDate.toLocaleString('default', { month: 'short' })
        },

        setToday() {
            this.today = new Date()
            this.isToday =  (this.today.toDateString() == this.myDate.toDateString())
        },
        
        getWeatherValues() {
            this.minTemp = (Math.round((this.day.main.temp_min) * 10) / 10)
            this.maxTemp = (Math.round((this.day.main.temp_max) * 10) / 10)
            this.desc = this.day.weather[0].description
            this.clouds = this.day.clouds.all
            this.pressure = this.day.main.pressure
        }     
    } 
}
</script>

<style>
    p {
        margin: 0;
    }

    .border {
        border-left: 2px solid blue;
    }

    .weather-day-container {
        flex: 1;
        line-height: 1.5;
        font-size: 12px;
        padding: 12px;
    }

    .weather-date-container {
        display: flex;
        justify-content: space-between;
    }

    .weather-daily-temp {
        display: flex;
    }

    .weather-daily-temp p {
        padding: 0 3px;
        margin-left: 3px;
        min-width: 30px;
        text-align: center;
        color: #ffffff;
    }

    .weather > div:nth-child(even) {
        background-color: white;
    }

    .weather > div:nth-child(odd) {
        background-color: #f7f7f7;
    }

    .dark {
        color: #6e6e6e;
        font-weight: 600;
    }

    .light {
        color: #ebebeb;
    }

    .blue-background {
        background-color: #3e5b9d;
    }

    .green-background {
        background-color: #8bba0a;
    }

    .orange-background {
        background-color: #e78f09;
    }

    .red-background {
        background-color: #e82e00;
    }
</style>