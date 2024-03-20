/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'
import { BarChart } from 'src/components/charts'
import AirqoLogo from '/images/airqo.png'
import MakerereLogo from '/images/makerere.png'

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  text: {
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
    fontWeight: 'normal',
    lineHeight: 1.5,
    margin: 12,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 12,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 5,
  },
  image: {
    width: 50,
    height: 50,
  },
  figureCaption: {
    textAlign: 'center',
    fontSize: 10,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
})

interface FrenchEmProps {
  data: any
}

const Header: React.FC = () => {
  return (
    <View style={styles.header} fixed>
      <Image src={AirqoLogo} style={styles.image} />
      <Image src={MakerereLogo} style={styles.image} />
    </View>
  )
}

const FrenchEm: React.FC<FrenchEmProps> = ({ data }) => {
  if (!data) return null

  const startDate = new Date(
    data.airquality.period.startTime,
  ).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const endDate = new Date(data.airquality.period.endTime).toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    },
  )

  const chartData1 = {
    labels: data.airquality.site_monthly_mean_pm.map(
      (site_name: any) => site_name.site_name,
    ),
    datasets: [
      {
        label: 'PM2.5 Raw Values',
        data: data.airquality.site_monthly_mean_pm.map(
          (item: { pm2_5_raw_value: number }) => item.pm2_5_raw_value,
        ),
      },
    ],
  }

  const chartData2 = {
    labels: data.airquality.daily_mean_pm.map((item: { date: string }) =>
      new Date(item.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    ),
    datasets: [
      {
        label: 'Daily Mean PM2.5',
        data: data.airquality.site_monthly_mean_pm.map(
          (item: { pm2_5_raw_value: number }) => item.pm2_5_raw_value,
        ),
      },
    ],
  }

  const chartData3 = {
    labels: data.airquality.diurnal.map((item: { hour: number }) => item.hour),
    datasets: [
      {
        label: 'Diurnal PM2.5',
        data: data.airquality.diurnal.map(
          (item: { pm2_5_raw_value: number }) => item.pm2_5_raw_value,
        ),
      },
    ],
  }

  return (
    <Document
      title="Air Quality Report"
      author="AirQo"
      subject="Air Quality"
      language="en"
      pdfVersion="1.5"
    >
      {/* page 1 */}
      <Page size="A4" style={styles.page}>
        <Header />
        <View>
          <Text style={styles.title}>
            Air Quality Report from {startDate} to {endDate} French Embassy,
            Kampala, Uganda
          </Text>
        </View>
        <Text style={styles.subTitle}>Executive Summary</Text>
        <Text style={styles.text}>
          This report summarises the temporal air quality profiles observed by
          the AirQo monitor installed at the French Embassy in Kampala between{' '}
          {startDate} and {endDate}. The AirQo monitor measures particulate
          matter(PM2.5) concentration, one of the primary air pollutants. PM2.5
          are fine inhalable particles with diameters generally 2.5 micrometres
          and smaller. The data from the site indicates that the air quality at
          this location during the monitored period mainly alternated between
          moderate and unhealthy. During the end of 2023, the air quality was
          largely moderate, and in January 2024, the air quality was largely
          unhealthy.
        </Text>
        <Text style={styles.subTitle}>
          {data.airquality.sites['grid name']}
        </Text>
        <Text style={styles.text}>
          In February 2024, Uganda experienced a slight rise in average PM2.5
          concentration from 38.85 µg/m³ in January to 39.64 µg/m³ in February
          indicating a decline in air quality. This increase is attributed to
          the seasonal transition to a dry period, leading to elevated dust and
          particulate matter. Anticipated slight decrease in PM2.5 levels are
          expected in March 2024.
        </Text>
        <Text style={styles.text}>
          The highest mean PM2.5 levels were recorded at specific locations,
          with Nansana west ward in Wakiso district registering the highest at
          76.02 µg/m³. Monitoring air quality and taking necessary measures to
          mitigate the impact on public health are crucial in affected regions.
        </Text>
        <Text style={styles.text}>
          Notably, the locations registering the highest mean PM2.5 values in
          February were as follows in table 1 and figure 1.
        </Text>
        <View>
          <BarChart
            chartData={chartData1}
            graphTitle="PM2.5 Raw Values for Uganda"
            xAxisTitle="Location"
            yAxisTitle="PM2.5 Raw Values"
          />
          <Text
            style={{
              ...styles.figureCaption,
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            Figure 1: Figure showing the top 5 highest mean PM2.5 in Uganda
          </Text>
        </View>
        <Text style={styles.text}>
          The top five locations with the highest PM2.5 calibrated values in the
          dataset for the specified period include Nansana west ward in Wakiso,
          recording a PM2.5 value of 76.02 µg/m³. Following closely is Rushoroza
          Hill in Kabale with a value of 71.98 µg/m³, followed by Kasubi in
          Rubaga at 70.44 µg/m³. Kawempe comes in fourth with a PM2.5 value of
          67.95 µg/m³, while Mpanga in Fort Portal rounds out the top five with
          a recorded value of 66.06 µg/m³. Despite the variation in readings,
          there was a noticeable reduction in the highest value compared to
          January.
        </Text>
        <Text style={styles.text}>
          Conversely, the locations with the lowest mean PM2.5 that have less
          than 20 µg/m³ values in February as shown in figure 2:
        </Text>
        <View>
          <BarChart
            chartData={chartData2}
            graphTitle="Diurnal PM2.5 for Uganda"
            xAxisTitle="Date"
            yAxisTitle="PM2.5 Raw Values"
          />
          <Text style={styles.figureCaption}>
            Figure 2: Figure showing the least mean PM2.5 in Uganda with PM2.5
            less than 20 µg/m³
          </Text>
        </View>
        <Text style={styles.text}>
          Among the recorded PM2.5 calibrated values, a few sites exhibited
          particularly low levels, all measuring below 20 µg/m³. Notably, the
          site at Bahai in Kawempe, Kampala reported the lowest value at 10.75
          µg/m³, indicating a relatively clean air environment. Following
          closely, the site at Jinja Main Street in Jinja city registered a
          PM2.5 value of 19.87 µg/m³, slightly higher than the Bahai site but
          still well below the 20 threshold. Similarly, the site at Njeru also
          displayed a notably low PM2.5 level, recording at 18.80 µg/m³. This
          was an improvement from January levels where there was no location
          with values less than 20 µg/m³.
        </Text>
        <View>
          <Text style={styles.subTitle}>Diurnal</Text>
          <BarChart
            chartData={chartData3}
            graphTitle="Diurnal PM2.5 for Uganda"
            xAxisTitle="Hour"
            yAxisTitle="PM2.5 Raw Values"
          />
          <Text style={styles.figureCaption}>
            Figure 3: Diurnal PM2.5 for Uganda. (The time was in GMT)
          </Text>
        </View>
        <Text style={styles.text}>
          The hourly variation of PM2.5 concentrations, revealing insights into
          air quality patterns. The highest PM2.5 value occurs at 21:00 (9:00
          PM), while the lowest is at 16:00 (4:00 PM). Peak concentrations are
          observed at night and in the morning, indicating potential
          contributing sources or activities. Daytime hours generally show lower
          PM2.5 levels, suggesting improved air quality during the day.
          {'\n'}
          {'\n'}
          The PM2.5 value in uganda is higher than the WHO recommended standard
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  )
}

export default FrenchEm
