import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const Home = () => {
    const chartRef = useRef(null)
  useEffect(() => {
    // 获取渲染图表的实例对象
    const chartDom = chartRef.current
    // 图表初始化生成图表实例
    const myChart = echarts.init(chartDom);
    // 图表参数
    const option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    };
    // 使用图表参数
    option && myChart.setOption(option);
  },[]);
  return (
    <div>
      <div ref={chartRef} style={{width:'500px',height:'400px'}}></div>
    </div>
  );
};

export default Home;
