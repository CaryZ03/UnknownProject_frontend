<script>
import Moveable from "vue-moveable";

export default {
    components: { Moveable },
    data() {
        const draggable = true;
        const throttleDrag = 1;
        const edgeDraggable = false;
        const startDragRotate = 0;
        const throttleDragRotate = 0;
        const targetRef = null;
        return {
            draggable,
            throttleDrag,
            edgeDraggable,
            startDragRotate,
            throttleDragRotate,
            targetRef
        };
    },
    methods: { onDrag(e) {
        e.target.style.transform = e.transform;
    } },
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
            >Target</div>
            <Moveable
                :target="targetRef"
                :draggable="draggable"
                :throttleDrag="throttleDrag"
                :edgeDraggable="edgeDraggable"
                :startDragRotate="startDragRotate"
                :throttleDragRotate="throttleDragRotate"
                @drag="onDrag"/>
        </div>
    </div>
</template>