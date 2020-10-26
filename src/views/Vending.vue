<template>
    <div>
        <sidebar-app></sidebar-app>
        <panel-app></panel-app>
    </div>
</template>

<script>
import Panel from "../components/vending/Panel";
import SideBar from "../components/SideBar";
export default {
    name: "Vending",
    components: {
        "sidebar-app": SideBar,
        "panel-app": Panel
    }
};
</script>
