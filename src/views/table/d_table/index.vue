<template>
  <d-table
    :table-data="data"
    :table-column-data="tableColumnData"
    stripe
    border
    highlight-current-row
    style="width:100%"
    max-height="600"
    :fit="true"
    empty-text="请等待..."
    @current-change="handleCurrentChange"
    @selection-change="handleSelectionChange"
  >
    <template #name="{row}">
      <el-popover
        effect="light"
        trigger="hover"
        placement="top"
      >
        <template #default>
          <p>姓名: {{ row.name }}</p>
          <p>住址: {{ row.address }}</p>
        </template>
        <template #reference>
          <div class="name-wrapper">
            <el-tag size="medium">
              {{ row.name }}
            </el-tag>
          </div>
        </template>
      </el-popover>
    </template>
    <template #default="{row}">
      <el-button
        type="text"
        size="small"
        @click="handleClick(row)"
      >
        查看
      </el-button>
      <el-button
        type="text"
        size="small"
      >
        编辑
      </el-button>
    </template>
  </d-table>
</template>
<script>
import DTable from '@/components/DTable/index'
import { reactive } from 'vue'
const useTableDataEffect = () => {
  const data = reactive([{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }, {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }
  ])
  return {
    data
  }
}
const useTableColumnDataEffect = () => {
  const tableColumnData = [{
    type: 'selection', // 多选
    width: '50'
  }, {
    prop: 'name', // 对应的属性
    label: '姓名', // 表头名称
    fixed: true, // 固定表头
    template: true, // 展示template内容
    width: '100', // 表头宽度
    sortable: true // 默认排序
  }, {
    prop: 'date',
    label: '时间'
  }, {
    prop: 'city',
    label: '城市'
  }, {
    prop: 'province',
    label: '地区'
  }, {
    prop: 'address',
    label: '地址'
  },
  {
    prop: 'address1',
    label: '地址1'
  },
  {
    prop: 'address2',
    label: '地址2'
  },
  {
    template: true, // 展示 template 内容  默认prop 为 default
    label: '操作', // 操作列显示
    fixed: 'right',
    width: '100'
  }]
  return {
    tableColumnData
  }
}
const useHandleClickEffect = () => {
  const handleClick = (row) => {
    console.log(row, 'row')
  }
  return {
    handleClick
  }
}
const useHandleCurrentChangeEffect = () => {
  const handleCurrentChange = (currentRow, oldCurrentRow) => {
    // console.log(currentRow, 'currentRow')
  }
  return {
    handleCurrentChange
  }
}
const useHandleSelectionChangeEffect = () => {
  const handleSelectionChange = (val) => {
    console.log(val, 'val')
  }
  return {
    handleSelectionChange
  }
}
export default {
  name: 'Index',
  components: { DTable },
  setup() {
    const { data } = useTableDataEffect()
    const { tableColumnData } = useTableColumnDataEffect()
    const { handleClick } = useHandleClickEffect()
    const { handleCurrentChange } = useHandleCurrentChangeEffect()
    const { handleSelectionChange } = useHandleSelectionChangeEffect()
    return {
      data,
      tableColumnData,
      handleClick,
      handleCurrentChange,
      handleSelectionChange
    }
  }
}
</script>

<style scoped>

</style>
