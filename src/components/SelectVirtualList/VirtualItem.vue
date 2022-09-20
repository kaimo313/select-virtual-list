<template>
    <div :class="['virtual-item', {'is-selected': curId === source.id}]" @click="handleClick">
        <span>{{source.name}}</span>
    </div>
</template>

<script>

export default {
    name: 'VirtualItem',
    props: {
        curId: {
            type: String,
            default: ""
        },
        source: {
            type: Object,
            default () {
                return {}
            }
        },
    },
    methods: {
        dispatch(componentName, eventName, ...rest) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;
            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;
                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(rest));
            }
        },
        handleClick() {
            // 通知 SelectVirtualList 组件，点击了项目
            this.dispatch('SelectVirtualList', 'clickVirtualItem', this.source);
        }
    }
}
</script>

<style lang="scss" scoped>
.virtual-item {
    font-size: 14px;
    padding: 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 32px;
    line-height: 32px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
        background-color: #eee;
    }
    &.is-selected {
        color: #409EFF;
        background-color: #dbeeff;
    }
}
</style>