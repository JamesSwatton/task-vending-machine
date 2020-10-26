<template>
    <div class="h-screen p-8 pt-40 border-l border-gray-300">
        <div class="w-64 p-6 mx-8 border-2 border-gray-700 rounded-lg">
            <display-app :displayNum="displayNum"></display-app>
            <keypad-app @displayNum="displayNum = $event"></keypad-app>
            <div class="flex items-center justify-center">
                <div
                    id="token-slot"
                    class="w-2 h-20 bg-gray-800 rounded-md"
                ></div>
                <img
                    class="h-24 ml-3"
                    src="../../assets/insert_coin.png"
                    alt="insert coin sign"
                />
            </div>
        </div>
        <img
            src="../../assets/coin_stack.png"
            alt="stack of coins"
            class="absolute bottom-0 right-0 h-24 mb-32"
            style="margin-right: 200px"
        />
    </div>
</template>

<script>
import { eventBus } from "../../main";
import Display from "./Display.vue";
import Keypad from "./Keypad.vue";

export default {
    name: "Panel",
    components: {
        "display-app": Display,
        "keypad-app": Keypad
    },
    data() {
        return {
            displayNum: "0",
            vendingNumbers: []
        };
    },
    created() {
        eventBus.$on("vendingNumbers", data => {
            this.vendingNumbers = data;
        });
    }
};
</script>
