/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react'
import ChartJsImage from 'chartjs-to-image'
import { Image } from '@react-pdf/renderer'

interface BarChartProps {
  chartData: any
  width?: number
  height?: number
  graphTitle?: string
  xAxisTitle?: string
  yAxisTitle?: string
}

export const BarChart: FC<BarChartProps> = ({
  chartData,
  width = 400 * 2,
  height = 400,
  graphTitle = '',
  xAxisTitle = '',
  yAxisTitle = '',
}) => {
  const [chartImageUrl, setChartImageUrl] = useState('')

  useEffect(() => {
    const generateChart = async () => {
      const myChart = new ChartJsImage()
      myChart.setConfig({
        type: 'bar',
        data: {
          ...chartData,
          datasets: chartData.datasets.map((dataset: any) => ({
            ...dataset,
            backgroundColor: 'rgba(0, 0, 255, 0.4)',
          })),
        },
        options: {
          title: {
            display: true,
            text: graphTitle,
          },
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: xAxisTitle,
                },
                ticks: {
                  autoSkip: false,
                  maxRotation: 45,
                  minRotation: 45,
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: yAxisTitle,
                },
              },
            ],
          },
          legend: {
            display: false,
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      })

      // set chart width and height
      myChart.setWidth(width)
      myChart.setHeight(height)

      const url = await myChart.toDataUrl()
      setChartImageUrl(url)
    }

    generateChart()
  }, [chartData, width, height, graphTitle, xAxisTitle, yAxisTitle])

  return chartImageUrl && <Image src={chartImageUrl} />
}
