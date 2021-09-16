<template>
    <div class="address">
        <div class="address-data">
            <div class="icon">
                <img src="../assets/ic_bet_shop_location.png" alt="place_icon">
            </div>
            <div>
                <span>{{receivedName}}</span>
                <span>{{receivedAddress}} </span>
                <span>{{receivedCity}} - {{receivedCounty}}</span>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FetchAddress',
        props: [ 
            'receivedName', 
            'receivedAddress',
            'receivedCity',
            'receivedCounty'
        ]
    }
</script>

<style scoped>
    .address {
        font-size: 13px;
    }
    .address-data {
        display: flex;
        background-color: white;
        color: #6e6e6e;
    }
    .icon {
        display: flex;
        margin-right: 8px;
        height: 25px;
    }
    @media (max-width: 780px) { 
        .address {
            margin: 0 15px;
        }
        .address-data {
            align-items: center;
        }
    }
</style>