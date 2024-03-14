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
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  text: {
    fontSize: 12,
    fontFamily: 'Times-Roman',
    fontWeight: 'normal',
    marginBottom: 10,
    lineHeight: 1.5,
  },
  section: {
    margin: 10,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
})

interface NemaProps {
  data: any
}

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Image src={AirqoLogo} style={styles.image} />
      <Image src={MakerereLogo} style={styles.image} />
    </View>
  )
}

const Nema: React.FC<NemaProps> = ({ data }) => {
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [10, 20, 30, 40, 50, 60, 70],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
      },
      {
        label: 'Dataset 2',
        data: [70, 60, 50, 40, 30, 20, 10],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
      },
    ],
  }
  return (
    <Document>
      {/* page 1 */}
      <Page size="A4" style={styles.page}>
        <Header />
        <View style={styles.section}>
          <Text style={styles.heading}>
            Air Quality Report for February 2024
          </Text>
          <Text style={styles.text}>
            This report presents an analysis of the PM2.5 concentrations in
            various locations for the month of February 2024. PM2.5 refers to
            particulate matter with a diameter of 2.5 micrometers or smaller,
            which can pose health risks when present in high concentrations. The
            data was collected from monitoring stations from AirQo and U.S.
            Department Of State across the continent, providing insights into
            air quality and potential health implications. The countries
            included in the analysis are Ivory Coast, Algeria, South Africa,
            Ethiopia, Madagascar, Mozambique, Ghana, Rwanda, Cameroon, Kenya,
            Uganda, Burundi, Burkina Faso, Nigeria, Egypt, and Chad.
          </Text>
          <Text style={styles.subHeading}>Uganda</Text>
          <Text style={styles.text}>
            In February 2024, Uganda experienced a slight rise in average PM2.5
            concentration from 38.85 µg/m³ in January to 39.64 µg/m³ in February
            indicating a decline in air quality. This increase is attributed to
            the seasonal transition to a dry period, leading to elevated dust
            and particulate matter. Anticipated slight decrease in PM2.5 levels
            are expected in March 2024.
          </Text>
          <Text style={styles.text}>
            The highest mean PM2.5 levels were recorded at specific locations,
            with Nansana west ward in Wakiso district registering the highest at
            76.02 µg/m³. Monitoring air quality and taking necessary measures to
            mitigate the impact on public health are crucial in affected
            regions.
          </Text>
          <Text style={styles.text}>
            Notably, the locations registering the highest mean PM2.5 values in
            February were as follows in table 1 and figure 1.
          </Text>
        </View>
      </Page>
      {/* page 2 */}
      <Page size="A4" style={styles.page}>
        <Header />
        <View style={styles.section}>
          <View>
            <BarChart chartData={chartData} />
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
            The top five locations with the highest PM2.5 calibrated values in
            the dataset for the specified period include Nansana west ward in
            Wakiso, recording a PM2.5 value of 76.02 µg/m³. Following closely is
            Rushoroza Hill in Kabale with a value of 71.98 µg/m³, followed by
            Kasubi in Rubaga at 70.44 µg/m³. Kawempe comes in fourth with a
            PM2.5 value of 67.95 µg/m³, while Mpanga in Fort Portal rounds out
            the top five with a recorded value of 66.06 µg/m³. Despite the
            variation in readings, there was a noticeable reduction in the
            highest value compared to January.
          </Text>
          <Text style={styles.text}>
            Conversely, the locations with the lowest mean PM2.5 that have less
            than 20 µg/m³ values in February as shown in figure 2:
          </Text>
        </View>
      </Page>
    </Document>
  )
}

export default Nema
