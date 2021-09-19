<template>
    <div class="time">
        <div class="time-data">
            <div class="time-icon">
                <img src="../assets/ic_bet_shop_hours.png" alt="clock_icon" />
            </div>
            <div class="clock-text">
                {{ calcOpeningHours }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OpeningHours',

        data() {
            return {
                opened: 'Open now until 16h.',
                closed: 'Opens tomorrow at 8h.'
            }
        },

        computed: {
            calcOpeningHours() {
                const date = new Date();
                const hours = date.getHours();
                
                return (hours >= 8 && hours < 16) ? this.opened : this.closed;
            }
        }
    }
</script>

<style scoped>
    .time {
        font-size: 13px;
    }

    .time-data {
        display: flex;
        align-items: center;
        background-color: white;
        color: #6e6e6e;
    }

    .time-icon{
        display: flex;
        margin-right: 8px;
        height: 25px;
    }

    @media (max-width: 780px) { 
        .time {
            margin: 0 15px;
        }
    }
</style>