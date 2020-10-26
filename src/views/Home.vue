<template>
    <div class="h-screen">
        <sidebar-app>
            <add-task-app></add-task-app>
        </sidebar-app>
        <div class="flex">
            <tasks-app></tasks-app>
            <habits-app></habits-app>
        </div>
    </div>
</template>

<script>
import SideBar from "../components/SideBar"
import AddTask from "../components/AddTask"
import Tasks from "../components/Tasks";
import Habits from "../components/Habits";

export default {
    name: "Tasks",
    components: {
        "tasks-app": Tasks,
        "habits-app": Habits,
        "add-task-app": AddTask,
        "sidebar-app": SideBar
    }
};
</script>
