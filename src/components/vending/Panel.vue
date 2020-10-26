<template>
    <div>
        <display-app :displayNum="displayNum"></display-app>
        <keypad-app @displayNum="displayNum = $event"></keypad-app>
    </div>
</template>

<script>
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
            displayNum: "0"
        };
    }
};
</script>
