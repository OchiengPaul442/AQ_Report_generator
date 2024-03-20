/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'src/services/redux/utils'
import { BlobProvider } from '@react-pdf/renderer'
// templates
import AirQoPdfDocument from './templates/AirQo'
import FrenchEmPdfDocument from './templates/FrenchEm'
import { BarLoader } from 'react-spinners'
import SaveIcon from 'src/assets/icons/SaveIcon'
import { Button as ButtonComp } from 'src/components/buttons'
import { Breadcrumb, BreadcrumbItem } from 'flowbite-react'
import { toast } from 'react-toastify'
import DocIcon from 'src/assets/icons/DocIcon'
import PdfIcon from 'src/assets/icons/PdfIcon'
import MockData from 'src/services/data/data.json'
// import { saveAs } from 'file-saver'

const ReportView = () => {
  const navigate = useNavigate()
  // const reportData = useSelector((state) => state.report.reportData)
  const reportTitle = useSelector((state) => state.report.reportTitle)
  const reportTemplate = useSelector((state) => state.report.reportTemplate)

  const getTemplate = () => {
    switch (reportTemplate) {
      case 'AirQo':
        return <AirQoPdfDocument data={MockData} />
      case 'French_Embassy':
        return <FrenchEmPdfDocument data={MockData} />
      default:
        return <AirQoPdfDocument data={MockData} />
    }
  }

  const handleFileSave = (blob: any, fileName: string) => {
    const reader = new FileReader()
    reader.onloadend = function () {
      // Convert blob to Base64
      const base64data = reader.result
      // Retrieve existing files from localStorage
      const savedFiles = JSON.parse(localStorage.getItem('savedFiles') || '[]')
      // Check if file with same name already exists
      const existingFile = savedFiles.find(
        (file: any) => file.fileName === fileName,
      )
      if (existingFile) {
        toast.error('File with the same name already exists')
        return
      }
      // Add new file to array along with the current date
      savedFiles.push({
        fileName,
        data: base64data,
        date: new Date().toISOString(),
      })
      // Save updated array to localStorage
      localStorage.setItem('savedFiles', JSON.stringify(savedFiles))
      // Set a timestamp for when the data was stored
      localStorage.setItem('timestamp', Date.now().toString())
      toast.success('File saved successfully')
    }
    reader.readAsDataURL(blob)
  }

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

      {/* show report */}
      <BlobProvider document={getTemplate()}>
        {({ url, blob, error }) => {
          if (error) {
            return (
              <p className="text-red-500">
                An error occurred while generating the report
              </p>
            )
          }

          if (!url) {
            return (
              <div className="absolute top-0 left-0 z-50 w-full h-full flex flex-col items-center justify-center">
                <BarLoader color="#006583" />
                <p className="mt-4 text-center">
                  Generating report, please wait...
                </p>
              </div>
            )
          }

          const handleSaveAs = () => {}

          return (
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 justify-end flex-wrap">
                <ButtonComp
                  backgroundColor="#006583"
                  text="Save"
                  icon={<SaveIcon width={20} height={20} />}
                  onClick={() => handleFileSave(blob, `${reportTitle}.pdf`)}
                />
                <ButtonComp
                  text="Download Doc"
                  backgroundColor="#145dff"
                  icon={<DocIcon width={20} height={20} />}
                  onClick={handleSaveAs}
                  disabled
                />
                <ButtonComp
                  backgroundColor="#800000"
                  text="Download PDF"
                  icon={<PdfIcon width={20} height={20} fill="#fff" />}
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = url
                    link.download = `${reportTitle}.pdf`
                    link.click()
                  }}
                />
              </div>

              <iframe src={url} title="report" width="100%" height="600px" />
            </div>
          )
        }}
      </BlobProvider>
    </div>
  )
}

export default ReportView
