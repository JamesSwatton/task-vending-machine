<template>
    <div class="flex flex-wrap px-16 pt-40 ml-20">
        <vending-item-app
            v-for="i in 8"
            :key="vendingNumbers[i - 1]"
            :selectedStyle="randNum()"
            :vendingNum="vendingNumbers[i - 1]"
        ></vending-item-app>
    </div>
</template>

<script>
import { eventBus } from "../../main";
import VendingItem from "./VendingItem";
export default {
    name: "VendingItemsList",
    components: {
        "vending-item-app": VendingItem
    },
    data() {
        return {
            vendingNumbers: []
        };
    },
    methods: {
        createNumbers(n) {
            for (let i = 0; i < n; i++) {
                let randNum = Math.floor(Math.random() * Math.floor(900) + 100);
                while (this.vendingNumbers.includes(randNum)) {
                    randNum = Math.floor(Math.random() * Math.floor(900) + 100);
                }
                this.vendingNumbers.push(randNum);
            }
            console.log(this.vendingNumbers);
        },
        randNum() {
            return Math.floor(Math.random() * Math.floor(6));
        }
    },
    created() {
        this.createNumbers(8);
        eventBus.$emit("vendingNumbers", this.vendingNumbers);
    }
};
</script>
