<template>
  <div>
    <div id="main"></div>
  </div>
</template>

<script>
import { reqCatelist } from "../../utils/http";
export default {
  data() {
    return {
      catelist: []
    };
  },
  mounted() {
    reqCatelist({ istree: true }).then(res => {
      if (res.data.code == 200) {
        this.catelist = res.data.list;
      }
    });
  },
  watch: {
    catelist: {
      handler() {
        if (this.catelist.length > 0) {
          let myChart = require("echarts").init(
            document.getElementById("main")
          );
          var option = {
            title: {
              text: "分类数量"
            },
            tooltip: {},
            legend: {
              data: ["分类数量"]
            },
            xAxis: {
              data: this.catelist.map(item => item.catename)
            },
            yAxis: {},
            series: [
              {
                name: "分类数量",
                type: "bar",
                data: this.catelist.map(item =>
                  item.children ? item.children.length : 0
                )
              }
            ]
          };
          myChart.setOption(option);
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped>
#main {
  height: 600px;
  width: 1000px;
  margin: auto;
}
</style>