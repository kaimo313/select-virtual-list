<template>
    <select-virtual-list 
        :width="250"
        size="small"
        placeholder="请选择"
        :dataList="dataList"
        :keeps="30"
        :estimateSize="32"
        :virtualInputCall="virtualInputCall"
        :virtualClickItemCall="virtualClickItemCall"
    ></select-virtual-list>
</template>

<script>
import SelectVirtualList from '../components/SelectVirtualList/index.vue';
// 获取模拟数据
import { getList } from '../utils/list.js';

export default {
    data () {
        return {
            dataList: [],
        }
    },
    components: {
        SelectVirtualList
    },
    created() {
        // 2 秒返回 2 万条数据
        console.log("dataList--->开始获取数据");
        getList(20000, 2000).then(res => {
            this.dataList = res;
            console.log("dataList--->数据获取完毕", res);
        })
    },
    methods: {
        // 输入回调
        virtualInputCall(val) {
            console.log("virtualInputCall---->", val);
            // ...
        },
        // 点击项目回调
        virtualClickItemCall(item) {
            console.log("virtualClickItemCall---->", item);
            // ...
        }
    }
}
</script>
