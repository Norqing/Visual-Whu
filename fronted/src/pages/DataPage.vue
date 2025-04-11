<template>
  <q-page class="q-pa-md">
    <h2 class="q-mb-md text-center">非遗文化数据分析</h2>
<<<<<<< HEAD

    <!-- 筛选和分析控制区 -->
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-sm-4">
        <q-select
          v-model="chartType"
          :options="chartOptions"
          label="选择图表类型"
          outlined
          dense
          class="q-mb-sm"
        />
      </div>
      <div class="col-12 col-sm-4">
        <q-select
          v-model="dataCategory"
          :options="dataCategoryOptions"
          label="选择数据分类"
          outlined
          dense
          class="q-mb-sm"
        />
      </div>
      <div class="col-12 col-sm-4">
        <q-input
          v-model="searchQuery"
          outlined
          dense
          label="搜索"
          clearable
          class="q-mb-sm"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <!-- 图表展示区域 -->
    <div class="chart-container q-mb-md">
      <q-spinner v-if="loading" color="primary" size="3em" />
      <div v-else-if="chartError" class="text-negative">{{ chartError }}</div>
      <div v-else style="width: 100%; height: 400px;">
        <bar-chart v-if="chartType === '柱状图'" :chart-data="filteredChartData" />
        <pie-chart v-else-if="chartType === '饼图'" :chart-data="filteredChartData" />
        <line-chart v-else-if="chartType === '折线图'" :chart-data="filteredChartData" />
      </div>
    </div>

    <!-- 数据表格区域 -->
    <div class="table-container q-pa-md">
      <q-table
        :rows="filteredData"
        :columns="columns"
        row-key="id"
        :pagination="pagination"
        :loading="loading"
        :filter="searchQuery"
        binary-state-sort
        flat
        bordered
      >
        <template v-slot:top>
          <div class="text-h6">非遗传承数据列表</div>
          <q-space />
          <q-btn
            color="primary"
            icon="file_download"
            label="导出数据"
            @click="exportTable"
            flat
          />
        </template>
      </q-table>
=======
    <q-select
      v-model="chartType"
      :options="chartOptions"
      label="选择图表类型"
      outlined
      dense
      class="q-mb-md"
      style="max-width: 200px"
    />
    <div class="chart-container">
      <q-list dense>
        <q-item v-for="(item, index) in sampleData" :key="index">
          <q-item-section>{{ item.name }}</q-item-section>
          <q-item-section side>{{ item.value }}</q-item-section>
        </q-item>
      </q-list>
>>>>>>> 2bb8487bfaeae7f365c84eef4619038c36b93b4d
    </div>
  </q-page>
</template>

<script setup>
<<<<<<< HEAD
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import * as XLSX from 'xlsx';
import BarChart from '../components/BarChart.vue';
import PieChart from '../components/PieChart.vue';
import LineChart from '../components/LineChart.vue';

const $q = useQuasar();
const loading = ref(false);
const chartError = ref('');
const chartType = ref('柱状图');
const chartOptions = ['柱状图', '饼图', '折线图'];
const dataCategory = ref('批次');
const dataCategoryOptions = ['批次', '地区', '年份', '类型'];
const searchQuery = ref('');
const pagination = ref({ rowsPerPage: 10 });

// 表格列定义
const columns = [
  { name: 'name', align: 'left', label: '名称', field: 'name', sortable: true },
  { name: 'type', align: 'left', label: '类型', field: 'type', sortable: true },
  { name: 'region', align: 'left', label: '申报地区或单位', field: 'region', sortable: true },
  { name: 'protector', align: 'left', label: '保护单位', field: 'protector', sortable: true },
  { name: 'content', align: 'left', label: '内容', field: 'content' },
  { name: 'year', align: 'left', label: '时间', field: 'year', sortable: true },
  { name: 'batch', align: 'left', label: '批次', field: 'batch', sortable: true }
];

// 数据存储
const heritageData = ref([]);

// 读取 public/国家非文化遗产.xlsx 文件
const readExcelFile = async () => {
  try {
    loading.value = true;
    chartError.value = '';

    const response = await fetch('/国家非文化遗产.xlsx');
    if (!response.ok) {
      throw new Error(`无法加载文件: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    console.log('文件 ArrayBuffer:', arrayBuffer.byteLength, 'bytes');

    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log('原始 XLSX 数据:', jsonData);

    // 动态获取表头
    const headers = jsonData[0];
    console.log('表头:', headers);

    const processedData = jsonData.slice(1).map((row, index) => {
      const content = row[headers.indexOf('内容')] ? String(row[headers.indexOf('内容')]).replace(/<br \/>/g, '') : '';
      let year = '';
      let batch = '';
      const yearValue = row[headers.indexOf('时间')];
      if (yearValue) {
        year = String(yearValue).replace(/<\/br>/g, '');
        const batchMatch = year.match(/\(第(.+?)批\)/);
        if (batchMatch) {
          batch = `第${batchMatch[1]}批`;
          year = year.replace(/\(第(.+?)批\)/, '').trim();
        }
      }

      let region = row[headers.indexOf('申报地区或单位')] || '';
      if (content && content.includes('申报地区或单位：')) {
        const regionMatch = content.match(/申报地区或单位：(.+?)$/);
        if (regionMatch) {
          region = regionMatch[1].trim();
        }
      }

      let province = '';
      if (region) {
        const provinceMatch = region.match(/(.*?省|.*?自治区)/);
        if (provinceMatch) {
          province = provinceMatch[0];
        }
      }

      return {
        id: index, // 添加唯一 ID
        name: row[headers.indexOf('名称')] || '',
        type: row[headers.indexOf('类型')] || '',
        region: region,
        province: province,
        protector: row[headers.indexOf('保护单位')] || '',
        content: content,
        year: year,
        batch: batch
      };
    }).filter(item => item.name);

    heritageData.value = processedData;
    console.log('处理后的数据:', heritageData.value);

    if ($q.notify) {
      $q.notify({
        message: `成功导入 ${heritageData.value.length} 条数据`,
        color: 'positive',
        icon: 'check_circle'
      });
    } else {
      console.warn('Quasar Notify 未启用');
    }
  } catch (error) {
    console.error('处理 .xlsx 文件失败:', error);
    chartError.value = '加载数据失败，请检查文件格式或路径';
    if ($q.notify) {
      $q.notify({
        message: '处理数据失败，请检查文件格式或路径',
        color: 'negative',
        icon: 'error'
      });
    } else {
      console.warn('Quasar Notify 未启用');
    }
  } finally {
    loading.value = false;
  }
};

// 处理图表数据
const processChartData = computed(() => {
  const data = {};

  if (dataCategory.value === '类型') {
    heritageData.value.forEach(item => {
      const key = item.type || '未知类型';
      if (!data[key]) data[key] = 0;
      data[key]++;
    });
  } else if (dataCategory.value === '地区') {
    heritageData.value.forEach(item => {
      const key = item.province || '未知地区';
      if (!data[key]) data[key] = 0;
      data[key]++;
    });
  } else if (dataCategory.value === '年份') {
    heritageData.value.forEach(item => {
      const key = item.year || '未知年份';
      if (!data[key]) data[key] = 0;
      data[key]++;
    });
  } else if (dataCategory.value === '批次') {
    heritageData.value.forEach(item => {
      const key = item.batch || '未知批次';
      if (!data[key]) data[key] = 0;
      data[key]++;
    });
  }

  const result = Object.entries(data).map(([name, value]) => ({ name, value }));
  console.log('Processed chart data:', result);
  return result.length > 0 ? result : [{ name: '暂无数据', value: 0 }];
});

// 过滤图表数据
const filteredChartData = computed(() => {
  if (!searchQuery.value) {
    return processChartData.value;
  }

  const query = searchQuery.value.toLowerCase();
  let filteredData;

  if (dataCategory.value === '类型') {
    filteredData = heritageData.value.filter(item =>
      (item.type || '').toLowerCase().includes(query)
    );
  } else if (dataCategory.value === '地区') {
    filteredData = heritageData.value.filter(item =>
      (item.region || '').toLowerCase().includes(query) ||
      (item.province || '').toLowerCase().includes(query)
    );
  } else if (dataCategory.value === '年份') {
    filteredData = heritageData.value.filter(item =>
      (item.year || '').toLowerCase().includes(query)
    );
  } else if (dataCategory.value === '批次') {
    filteredData = heritageData.value.filter(item =>
      (item.batch || '').toLowerCase().includes(query)
    );
  } else {
    filteredData = heritageData.value;
  }

  const data = {};
  let categoryField;

  if (dataCategory.value === '类型') {
    categoryField = 'type';
  } else if (dataCategory.value === '地区') {
    categoryField = 'province';
  } else if (dataCategory.value === '年份') {
    categoryField = 'year';
  } else if (dataCategory.value === '批次') {
    categoryField = 'batch';
  }

  filteredData.forEach(item => {
    const category = item[categoryField] || `未知${dataCategory.value}`;
    if (!data[category]) data[category] = 0;
    data[category]++;
  });

  const result = Object.entries(data).map(([name, value]) => ({ name, value }));
  console.log('Filtered chart data:', result);
  return result.length > 0 ? result : [{ name: '暂无数据', value: 0 }];
});

// 过滤表格数据
const filteredData = computed(() => {
  if (!searchQuery.value) {
    return heritageData.value;
  }

  const query = searchQuery.value.toLowerCase();
  return heritageData.value.filter(item =>
    (item.name || '').toLowerCase().includes(query) ||
    (item.type || '').toLowerCase().includes(query) ||
    (item.region || '').toLowerCase().includes(query) ||
    (item.province || '').toLowerCase().includes(query) ||
    (item.content || '').toLowerCase().includes(query) ||
    (item.year || '').toLowerCase().includes(query) ||
    (item.batch || '').toLowerCase().includes(query)
  );
});

// 导出表格数据
const exportTable = () => {
  const data = [
    ['名称', '类型', '申报地区或单位', '保护单位', '内容', '时间', '批次'],
    ...filteredData.value.map(item => [
      item.name,
      item.type,
      item.region,
      item.protector,
      item.content,
      item.year,
      item.batch
    ])
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, '非遗传承数据');
  XLSX.writeFile(wb, '非遗传承数据.xlsx');

  if ($q.notify) {
    $q.notify({
      message: '数据导出成功',
      color: 'positive',
      icon: 'check_circle'
    });
  }
};

// 组件挂载时读取文件
onMounted(async () => {
  await readExcelFile();
});
=======
import { ref } from "vue";

const chartType = ref("柱状图");
const chartOptions = ["柱状图", "饼图", "折线图"];
const sampleData = ref([
  { name: "剪纸", value: 120 },
  { name: "皮影", value: 200 },
  { name: "刺绣", value: 150 },
]);
>>>>>>> 2bb8487bfaeae7f365c84eef4619038c36b93b4d
</script>

<style scoped>
.chart-container {
  width: 100%;
<<<<<<< HEAD
  min-height: 400px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.table-container {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

h2 {
  color: #ff6b6b;
  font-weight: 500;
=======
  height: 400px;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  overflow-y: auto;
}
h2 {
  color: #ff6b6b;
>>>>>>> 2bb8487bfaeae7f365c84eef4619038c36b93b4d
}
</style>
