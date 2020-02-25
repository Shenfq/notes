<template>
  <v-chart :options="options" :init-options="initOptions" autoresize />
</template>

<style>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 100%;
  height: 500px;
}
</style>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/map";
import "echarts/lib/chart/radar";
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/sunburst";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/geo";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/dataset";

export default {
  components: {
    "v-chart": ECharts
  },
  props: {
    books: {
      type: Array,
      default () { return [] },
    }
  },
  data() {
    const books = this.books
    const colors = ["#cce6ff", "#6ab4ff", "#2f97ff", "#0883ff", "#0066cc"]
    const bgColor = "#0883ff"

    for (let i = 0; i < books.length; ++i) {
      const block = books[i].children;
      for (let star = 0; star < block.length; ++star) {
        const starCate = block[star]
        const starName = starCate.name
        const style = {
          color: colors[starName - 2]
        }
        starCate.name += '☆'
        starCate.label = style
        if (starCate.children) {
          block[star].children.forEach(function(book) {
            book.value = 1;
            book.itemStyle = style
            book.label = style
          });
        }
      }
      books[i].label = {
        color: bgColor,
        fontSize: 10,
      }
      books[i].itemStyle = {
        normal: {
          color: 'transparent'
        }
      };
    }

    const sunburst = {
      // backgroundColor: bgColor,
      color: colors,
      series: [
        {
          type: "sunburst",
          center: ["50%", "50%"],
          data: books,
          label: {
            rotate: "radial",
            color: bgColor
          },
          itemStyle: {
            borderColor: bgColor,
            borderWidth: 2
          },
          levels: [
            {},
            {
              r0: 0,
              r: 65
            },
            {
              r0: 65,
              r: 90,
              itemStyle: {
                color: "transparent"
              },
              label: {
                rotate: "tangential",
                fontSize: 10,
                color: colors[0]
              }
            },
            {
              r0: 90,
              r: 98,
              label: {
                color: colors[0],
                position: 'outside',
              },
            }
          ]
        }
      ]
    };
    return {
      initOptions: {
        renderer: "canvas"
      },
      options: sunburst
    };
  }
};
</script>