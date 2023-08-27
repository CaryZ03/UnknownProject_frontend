<script>
import Moveable from "vue-moveable";

export default {
    components: { Moveable },
    data() {
        const maxWidth = "auto";
        const maxHeight = "auto";
        const minWidth = "auto";
        const minHeight = "auto";
        const resizable = true;
        const keepRatio = false;
        const throttleResize = 1;
        const renderDirections = ["nw","n","ne","w","e","sw","s","se"];
        const targetRef = null;
        return {
            maxWidth,
            maxHeight,
            minWidth,
            minHeight,
            resizable,
            keepRatio,
            throttleResize,
            renderDirections,
            targetRef
        };
    },
    methods: {
        onResize(e) {
            e.target.style.width = `${e.width}px`;
            e.target.style.height = `${e.height}px`;
            e.target.style.transform = e.drag.transform;
        }
    },
    mounted() {
        this.targetRef = this.$refs.targetRef;
    }
};
</script>
<template>
    <div class="root">
        <div class="container">
            <div
                class="target"
                ref="targetRef"
                :style="`max-width: ${maxWidth};max-height: ${maxHeight};min-width: ${minWidth};min-height: ${minHeight};`"
            >Target</div>
            <Moveable
                :target="targetRef"
                :resizable="resizable"
                :keepRatio="keepRatio"
                :throttleResize="throttleResize"
                :renderDirections="renderDirections"
                @resize="onResize"/>
        </div>
    </div>
</template>