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
import Panel from "../components/vending/Panel";
import SideBar from "../components/SideBar";
import VendingItemsList from "../components/vending/VendingItemsList";
export default {
    name: "Vending",
    components: {
        "sidebar-app": SideBar,
        "panel-app": Panel,
        "vending-list-app": VendingItemsList
    }
};
</script>
