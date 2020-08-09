<template>
  <div id="app">
    <div id="top-wrap">
      <div id="top-title">人口推移グラフ</div>
      <div id="top-sub-title">都道府県別の人口推移グラフを生成します。</div>
    </div>
    <PrefSlctGroup @emit-pref-list="receivePref" />
    <PrefChart :data="chartData" :options="options" :css-classes="chartStyle" />
    <div id="footer">
      出典：RESAS（地域経済分析システム）
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PrefSlctGroup from "@/components/PrefSlctGroup.vue";
import PrefChart from "@/components/PrefChart.vue";

export default {
  name: "app",
  components: {
    PrefSlctGroup,
    PrefChart,
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [],
      },
      options: {
        animation: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "年度",
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "総人口（人）",
              },
            },
          ],
        },
      },
      chartStyle: "pref-chart",
    };
  },
  methods: {
    async receivePref(list) {
      const datasets = [];
      for (const i in list.prefCodeList) {
        const prefData = {};
        let foundSessionData = JSON.parse(
          sessionStorage.getItem("prefCode_" + list.prefCodeList[i])
        );
        const api = axios.create({
          baseURL: "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
          headers: { "X-API-KEY": process.env.VUE_APP_API_KEY },
        });
        if (!foundSessionData) {
          await api({
            method: "get",
            params: {
              prefCode: list.prefCodeList[i],
            },
          }).then((res) => {
            const resData = res.data.result.data[0].data;
            sessionStorage.setItem("prefCode_" + list.prefCodeList[i], JSON.stringify(resData));
            sessionStorage.setItem("labels", JSON.stringify(resData.map((obj) => obj.year)));
            foundSessionData = JSON.parse(
              sessionStorage.getItem("prefCode_" + list.prefCodeList[i])
            );
          });
        }
        prefData.data = foundSessionData.map((obj) => obj.value);
        prefData.label = list.prefNameList[i];
        prefData.borderColor = `hsl(${(360 / list.prefCodeList.length) * i}, 100%, 65%)`;
        prefData.fill = false;
        datasets.push(prefData);
      }
      this.chartData.labels = JSON.parse(sessionStorage.getItem("labels"));
      this.chartData.datasets = datasets;
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: left;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  #top-wrap {
    height: clamping($top-wrap-h);
    background: $top-bg-color;
    #top-title {
      max-width: $max-w-multiplier * 100px;
      margin: auto;
      padding-top: clamping($top-title-top-p);
      padding-left: clamping($top-title-left-p);
      color: black;
      font-weight: bold;
      font-size: clamping($top-title-fs, $max-title-fs-multiplier);
      @include fade-in-bottom();
    }
    #top-sub-title {
      max-width: $max-w-multiplier * 100px;
      margin: auto;
      padding-top: clamping($top-sub-title-top-p);
      padding-left: clamping($top-title-left-p);
      color: black;
      font-weight: bold;
      font-size: clamping($top-sub-title-fs, $max-title-fs-multiplier);
      @include fade-in-bottom(0.6s);
    }
  }
  .pref-chart {
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamping($chart-w);
    margin: clamping($pref-chart-m) auto;
    @include fade-in-bottom(1.8s);
  }
  #footer {
    margin-top: 20px;
    padding: 30px 0;
    text-align: center;
    border-top: 7px solid darkgray;
  }
}
</style>
