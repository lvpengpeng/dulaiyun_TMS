<template>
  <div>
    <el-table
      :data="tableData"
      v-bind="{...attrs}"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-for="(item,index) in tableColumnData"
        :key="item.key || index"
        align="center "
        v-bind="{...item}"
      >
        <template
          v-if="item.template"
          #default="{row}"
        >
          <slot
            :name="item.prop || 'default'"
            :row="row"
          >
            <span>{{ row[item.prop] }}</span>
          </slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/**
 * 单选触发事件
 * @param context
 * @returns {{handleCurrentChange: handleCurrentChange}}
 */
const useHandleCurrentChangeEffect = (context) => {
  const handleCurrentChange = (currentRow, oldCurrentRow) => {
    context.emit('current-change', currentRow, oldCurrentRow)
  }

  return {
    handleCurrentChange
  }
}
/**
 * 多选触发事件
 * @param context
 * @returns {{handleSelectionChange: handleSelectionChange}}
 */
const useHandleSelectionChangeEffect = (context) => {
  const handleSelectionChange = (val) => {
    context.emit('selection-change', val)
  }

  return {
    handleSelectionChange
  }
}
export default {
  name: 'Index',
  props: {
    tableColumnData: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  emits: ['current-change', 'selection-change'],
  setup(props, context) {
    const { handleCurrentChange } = useHandleCurrentChangeEffect(context)
    const { handleSelectionChange } = useHandleSelectionChangeEffect(context)
    console.log(context.attrs, 'attrs')
    const attrs = context.attrs // 获取no-props 把父组件定义的属性直接使用
    return {
      handleCurrentChange,
      handleSelectionChange,
      attrs
    }
  }
}
</script>

<style scoped>

</style>
