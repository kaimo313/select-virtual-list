<template>
    <el-popover
        v-model="visibleVirtualList"
        popper-class="select-virtual-list-popover"
        trigger="click"
        placement="bottom-start"
        :width="width">
        <virtual-list v-if="visibleVirtualList"
            ref="virtualListRef"
            class="virtual-list"
            :data-key="'id'"
            :keeps="keeps"
            :data-sources="dataList"
            :data-component="itemComponent"
            :extra-props="{ curId }"
            :estimate-size="estimateSize"
            :item-class="'list-item-custom-class'"
        ></virtual-list>
        <el-input slot="reference" 
            v-model="curValue"
            :style="`width:${width}px;`"
            :size="size"
            :placeholder="placeholder"
            @input="handleInput"
        ></el-input>
    </el-popover>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list';
import VirtualItem from './VirtualItem.vue';
export default {
    name: 'SelectVirtualList',
    props: {
        width: {
            type: Number,
            default: 250
        },
        size: {
            type: String,
            default: "small"
        },
        placeholder: {
            type: String,
            default: "请选择"
        },
        dataList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        // 虚拟列表在真实 dom 中保持渲染的项目数量
        keeps: {
            type: Number,
            default: 30
        },
        // 每个项目的估计大小，如果更接近平均大小，则滚动条长度看起来更准确。 建议分配自己计算的平均值。
        estimateSize: {
            type: Number,
            default: 32
        },
        // input输入触发方法
        virtualInputCall: Function,
        // 点击每个项目触发方法
        virtualClickItemCall: Function
    },
    components: {
        VirtualList
    },
    watch: {
        visibleVirtualList(n) {
            if(n) {
                // 当展示虚拟列表时，需要定位到选择的位置
                this.$nextTick(() => {
                    let temp = this.curIndex ? this.curIndex : 0;
                    // 方法一：手动设置滚动位置到指定索引。
                    this.$refs.virtualListRef.scrollToIndex(temp - 1);
                    // 方法二：手动将滚动位置设置为指定的偏移量。
                    // this.$refs.virtualListRef.scrollToOffset(this.estimateSize * (temp - 1));
                })
            }
        }
    },
    data () {
        return {
            curId: "", // 当前选择的 id
            curValue: "", // 当前选择的值
            curIndex: null, // 当前选择的索引
            visibleVirtualList: false, // 是否显示虚拟列表
            itemComponent: VirtualItem, // 由 vue 创建/声明的渲染项组件，它将使用 data-sources 中的数据对象作为渲染道具并命名为：source。
        };
    },
    created() {
        // 监听点击子组件
        this.$on('clickVirtualItem', (item) => {
            this.curId = item.id;
            this.curValue = item.name;
            this.curIndex = item.index;
            this.visibleVirtualList = false;
            console.log("item--->", item)
            this.virtualClickItemCall && this.virtualClickItemCall(item);
        })
    },
    methods: {
        // 输入框改变
        handleInput(val) {
            console.log("val--->", val);
            if(!val) {
                this.curId = "";
                this.curIndex = null;
            }
            this.virtualInputCall && this.virtualInputCall(val);
        }
    }
};
</script>

<style lang='scss'>
.el-popover.el-popper.select-virtual-list-popover {
    height: 300px;
    padding: 0;
    border: 1px solid #E4E7ED;
    border-radius: 4px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    .virtual-list {
        width: 100%;
        height: calc(100% - 20px);
        padding: 10px 0;
        overflow-y: auto;
    }
}
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #fff;
}
::-webkit-scrollbar-thumb {
    background-color: #aaa !important;
    border-radius: 10px !important;
}
::-webkit-scrollbar-track {
    background-color: transparent !important;
    border-radius: 10px !important;
    -webkit-box-shadow: none !important;
}
</style>