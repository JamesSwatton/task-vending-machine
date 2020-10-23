<template>
    <div>
        <keypad-app></keypad-app>
    </div>
</template>

<script>
import Keypad from "../components/vending/Keypad";
export default {
    name: "Vending",
    components: {
        "keypad-app": Keypad
    }
};
</script>
