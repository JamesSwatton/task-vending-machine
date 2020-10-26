<template>
    <div>
        <div class="relative w-48 h-56 ">
            <img
                src="../../assets/vending_spring.png"
                alt="vending spring"
                class="absolute bottom-0 left-0 z-10 pl-4"
            />
            <div
                id="item-shape"
                class="absolute bottom-0 left-0 z-0 bg-blue-500"
                :style="rectStyles[selectedStyle]"
            ></div>
        </div>
        <div class="flex items-center w-48 h-8 mt-3 bg-black">
            <p class="ml-12 text-2xl text-white">{{ vendingNum }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "VendingItem",
    props: ["selectedStyle", "vendingNum"],
    data() {
        return {
            rectStyles: [
                {
                    "margin-left": "49px",
                    width: "124px",
                    height: "232px"
                },
                {
                    "margin-left": "49px",
                    width: "135px",
                    height: "207px"
                },
                {
                    "margin-left": "49px",
                    width: "95px",
                    height: "245px"
                },
                {
                    "margin-left": "49px",
                    width: "134px",
                    height: "217px"
                },
                {
                    "margin-left": "49px",
                    width: "130px",
                    height: "205px"
                },
                {
                    "margin-left": "49px",
                    width: "96px",
                    height: "220px"
                }
            ]
        };
    },
    created() {
        console.log(this.selectedStyle);
        console.log(this.vendingNum);
    }
};
</script>

<style></style>
