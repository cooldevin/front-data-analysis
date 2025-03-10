import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

type EChartsWrapperProps = {
  option: echarts.EChartsOption;
  style?: React.CSSProperties;
  theme?: string;
  onChartReady?: (chart: echarts.ECharts) => void;
};

export const EChartsWrapper: React.FC<EChartsWrapperProps> = ({
  option,
  style = { 
    height: '400px', 
    width: '100%',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.2)',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
  },
  theme,
  onChartReady,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current, theme, { renderer: 'canvas' });
      onChartReady?.(chartInstance.current);
    }

    return () => {
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [theme]);

  useEffect(() => {
    chartInstance.current?.setOption(option);
  }, [option]);

  return <div ref={chartRef} style={style} />;
};