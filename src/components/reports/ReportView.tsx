/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'src/services/redux/utils'
import { PDFViewer } from '@react-pdf/renderer'
// templates
import AirQoPdfDocument from './templates/AirQo'
import FrenchEmPdfDocument from './templates/FrenchEm'
import BackArrow from '@public/icons/BackArrow'
import { BarLoader } from 'react-spinners'
import SaveIcon from '@public/icons/SaveIcon'
import { Button as ButtonComp } from 'src/components/buttons'
import DownloadIcon from '@public/icons/DownloadIcon'
import { Breadcrumb, BreadcrumbItem } from 'flowbite-react'

const ReportView = () => {
  const navigate = useNavigate()
  const reportData = useSelector((state) => state.report.reportData)
  const reportTitle = useSelector((state) => state.report.reportTitle)
  const reportTemplate = useSelector((state) => state.report.reportTemplate)
  const isLoading = useSelector((state) => state.chart.isLoading)

  const getTemplate = () => {
    switch (reportTemplate) {
      case 'AirQo':
        return <AirQoPdfDocument data={reportData} />
      case 'French_Embassy':
        return <FrenchEmPdfDocument data={reportData} />
      default:
        return <AirQoPdfDocument data={reportData} />
    }
  }

  console.log('isLoading', isLoading)

  // if (isLoading) {
  //   return (
  //     <div className="absolute top-0 left-0 z-50 w-full h-full flex flex-col items-center justify-center">
  //       <BarLoader color="#d6a936" />
  //       <p className="mt-4 text-center">Preparing the data, please wait...</p>
  //     </div>
  //   )
  // }

  return (
    <div className="mt-4 space-y-4">
      <Breadcrumb
        aria-label="Solid background breadcrumb example"
        className="bg-blue-200 rounded-md px-5 py-3 dark:bg-gray-800 dark:text-white dark:bg-blue-800"
      >
        <BreadcrumbItem href="#" onClick={() => navigate('/')}>
          Report Generator
        </BreadcrumbItem>
        <BreadcrumbItem href="#">Report</BreadcrumbItem>
      </Breadcrumb>

      {/* show report title */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold dark:text-white">{reportTitle}</h1>
      </div>

      {!isLoading && (
        <PDFViewer
          style={{
            width: '100%',
            height: '650px',
          }}
        >
          {getTemplate()}
        </PDFViewer>
      )}
    </div>
  )
}

export default ReportView
