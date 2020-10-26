<template>
    <div>
        <sidebar-app></sidebar-app>
        <div class="flex">
            <vending-list-app></vending-list-app>
            <panel-app></panel-app>
        </div>
    </div>
</template>

<script>
import { eventBus } from "../main";
import Panel from "../components/vending/Panel";
import SideBar from "../components/SideBar";
import VendingItemsList from "../components/vending/VendingItemsList";
export default {
    name: "Vending",
    components: {
        "sidebar-app": SideBar,
        "panel-app": Panel,
        "vending-list-app": VendingItemsList
    },
    data() {
        return {
            vendingNumbers: [],
            enteredNum: ""
        };
    },
    watch: {
        enteredNum() {
            let result = this.vendingNumbers.includes(this.enteredNum);
            console.log(this.enteredNum);
            if (result) {
                console.log("yes, that number will vend");
            } else {
                console.log("please enter a valid item number to vend");
            }
        }
    },
    created() {
        eventBus.$on("vendingNumbers", data => {
            this.vendingNumbers = data;
        });
        eventBus.$on("enteredNum", data => {
            this.enteredNum = parseInt(data);
        });
    }
};
</script>
