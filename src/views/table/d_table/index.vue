<template>
  <div>
    <div>
      <el-button
        type="primary"
        @click="handleCreate"
      >
        添加
      </el-button>
    </div>
    <d-table
      :table-data="list"
      :table-column-data="tableColumnData"
      stripe
      border
      highlight-current-row
      style="width:100%"
      :fit="true"
      empty-text="暂无数据"
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
          @click="handleUpdate(row)"
        >
          编辑
        </el-button>
      </template>
    </d-table>
    <pagination
      v-show="total > 0"
      v-model:page="listQuery.page"
      v-model:limit="listQuery.limit"
      :total="total"
      @pagination="useAxiosListEffect"
    />
    <div>
      <el-dialog
        v-model="dialogFormVisible"
        :title="textMap[dialogStatus]"
      >
        <el-form
          ref="dataForm_Dom"
          :rules="rules"
          :model="temp"
          label-position="left"
          label-width="70px"
          style="width: 400px; margin-left:50px;"
        >
          <el-form-item
            label="名字"
            prop="name"
          >
            <el-input v-model="temp.name" />
          </el-form-item>
          <el-form-item
            label="地址"
            prop="address"
          >
            <el-input v-model="temp.address" />
          </el-form-item>
          <el-form-item
            label="城市"
            prop="city"
          >
            <el-input v-model="temp.city" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button
              v-if="dialogStatus === 'create'"
              type="primary"
              @click="createData"
            >保存</el-button>
            <el-button
              v-else
              type="primary"
              @click="updateData"
            >更新</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import DTable from '@/components/DTable/index'
import Pagination from '@/components/Pagination/index'
import { reactive, toRefs, watchEffect, nextTick, ref } from 'vue'
// 模拟列表数据
const useTableDataEffect = () => {
  const oldData = [{
    date: '2016-05-02',
    name: '王小虎1',
    address: '上海市普陀区金沙江路 1518 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-04',
    name: '王小虎2',
    address: '上海市普陀区金沙江路 1517 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-01',
    name: '王小虎3',
    address: '上海市普陀区金沙江路 1519 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-03',
    name: '王小虎4',
    address: '上海市普陀区金沙江路 1516 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-02',
    name: '王小虎5',
    address: '上海市普陀区金沙江路 1518 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-04',
    name: '王小虎6',
    address: '上海市普陀区金沙江路 1517 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-01',
    name: '王小虎7',
    address: '上海市普陀区金沙江路 1519 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-03',
    name: '王小虎8',
    address: '上海市普陀区金沙江路 1516 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-02',
    name: '王小虎9',
    address: '上海市普陀区金沙江路 1518 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-04',
    name: '王小虎10',
    address: '上海市普陀区金沙江路 1517 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-01',
    name: '王小虎11',
    address: '上海市普陀区金沙江路 1519 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-03',
    name: '王小虎12',
    address: '上海市普陀区金沙江路 1516 弄',
    province: '上海',
    city: '普陀区'
  }, {
    date: '2016-05-02',
    name: '王小虎13',
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
  }]
  const total = 100
  return {
    oldData,
    total
  }
}
// 定义表格列名称
const useTableColumnDataEffect = () => {
  return [{
    type: 'selection', // 多选必须添加type selection
    width: '50'
  }, {
    prop: 'name', // 对应后端返回数据的属性
    label: '姓名', // 表头名称
    fixed: true, // 是否固定表头
    template: true, // 展示template内容必须添加这个属性
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
}
/**
 * 处理数据（如果后端支持分页数据直接调用接口传递参数即可）
 * @param listQuery
 */
const useAxiosListEffect = (listQuery) => {
  const data = reactive({ list: [] })
  const { oldData, total } = useTableDataEffect()
  const axiosList = (page, limit) => {
    const start = (page - 1) * limit
    const end = (page - 1) * limit + limit
    data.list = oldData.slice(start, end)
  }
  axiosList(listQuery.page, listQuery.limit)
  // 解决表格不更新问题
  watchEffect(() => { axiosList(listQuery.page, listQuery.limit) })
  const { list } = toRefs(data)
  return {
    total,
    list
  }
}
/**
 * 点击查看
 * @returns {(function(*=): void)|*}
 */
const useHandleClickEffect = () => {
  return (row) => {
    console.log(row, 'row')
  }
}

/**
 * 编辑
 * @returns {(function(*=): void)|*}
 */
const useHandleUpdateEffect = (dataForm_Dom, temp, dialogStatus, dialogFormVisible) => {
  const handleUpdate = (row) => {
    Object.keys(temp).map((key) => { temp[key] = row[key] })
    dialogStatus.value = 'update'
    dialogFormVisible.value = true
    nextTick(() => {
      dataForm_Dom.value.clearValidate()
    })
  }
  return {
    handleUpdate
  }
}

/**
 * 点击表格行
 * @returns {(function(*, *))|*}
 */
const useHandleCurrentChangeEffect = () => {
  return (currentRow, oldCurrentRow) => {
    // console.log(currentRow, 'currentRow')
  }
}
/**
 * 多选
 * @returns {(function(*=): void)|*}
 */
const useHandleSelectionChangeEffect = () => {
  return (val) => {
    console.log(val, '多选')
  }
}
// 表单校验器
const useRulesEffect = () => {
  const rules = {
    name: [{ required: true, message: 'type is required', trigger: 'chang' }],
    city: [{ required: true, message: 'timestamp is required', trigger: 'chang' }],
    address: [{ required: true, message: 'title is required', trigger: 'chang' }]
  }
  return { rules }
}
// 清空数据方法
const resetTemp = (temp) => {
  Object.keys(temp).map((key) => { temp[key] = '' })
}
// 点击创建按钮弹窗清空数据和表单验证
const useHandleCreateEffect = (dataForm_Dom, dialogStatus, dialogFormVisible, temp) => {
  const handleCreate = () => {
    resetTemp(temp)
    dialogStatus.value = 'create'
    dialogFormVisible.value = true
    nextTick(() => {
      dataForm_Dom.value.clearValidate()
    })
  }
  return {
    handleCreate
  }
}
// 提交创建表单
const useCreateDataEffect = (dataForm_Dom, dialogFormVisible) => {
  const createData = async() => {
    const form = dataForm_Dom.value
    if (!form) return
    try {
      await form.validate()
      setTimeout(() => {
        dialogFormVisible.value = false
        console.log('创建成功')
      })
    } catch (error) {

    }
  }
  return {
    createData
  }
}
// 提交更新表单
const useUpdateDataEffect = (dataForm_Dom, temp, dialogFormVisible) => {
  const updateData = async() => {
    const form = dataForm_Dom.value
    if (!form) return
    try {
      await form.validate()
      setTimeout(() => {
        const tempData = Object.assign({}, temp)
        dialogFormVisible.value = false
        console.log(tempData, '更新成功')
      })
    } catch (error) {

    }
  }
  return {
    updateData
  }
}
export default {
  name: 'Index',
  components: { DTable, Pagination },
  setup() {
    // 定义初始化数据当前第1页,每页显示10条数据
    const listQuery = reactive({ page: 1, limit: 10 })
    // list 表格数据 total 总共数据的条数
    const { list, total } = useAxiosListEffect(listQuery)
    // 定义表格表头，很多设置表格列设置需设置
    const tableColumnData = useTableColumnDataEffect()
    const handleClick = useHandleClickEffect()
    const handleCurrentChange = useHandleCurrentChangeEffect()
    const handleSelectionChange = useHandleSelectionChangeEffect()

    const textMap = reactive({
      update: '编辑',
      create: '创建'
    })
    const temp = reactive({
      date: '',
      name: '',
      address: '',
      province: '',
      city: ''
    })
    const dataForm_Dom = ref(null)
    const { rules } = useRulesEffect()
    const dialogStatus = ref('')
    const dialogFormVisible = ref(false)
    const { handleCreate } = useHandleCreateEffect(dataForm_Dom, dialogStatus, dialogFormVisible, temp)
    const { createData } = useCreateDataEffect(dataForm_Dom, dialogFormVisible)
    const { updateData } = useUpdateDataEffect(dataForm_Dom, temp, dialogFormVisible)
    const { handleUpdate } = useHandleUpdateEffect(dataForm_Dom, temp, dialogStatus, dialogFormVisible)
    return {
      listQuery,
      list,
      total,
      tableColumnData,
      useAxiosListEffect,
      handleClick,
      handleUpdate,
      handleCurrentChange,
      handleSelectionChange,
      dataForm_Dom,
      temp,
      rules,
      textMap,
      dialogStatus,
      dialogFormVisible,
      handleCreate,
      createData,
      updateData
    }
  }
}
</script>

<style scoped>

</style>
