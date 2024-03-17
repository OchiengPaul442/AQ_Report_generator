/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
// import { useSelector } from 'src/services/redux/utils'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { toast } from 'react-toastify'
// templates
import AirQoPdfDocument from './templates/AirQo'
import FrenchEmPdfDocument from './templates/FrenchEm'
import BackArrow from '@public/icons/BackArrow'
import { BarLoader } from 'react-spinners'
import SaveIcon from '@public/icons/SaveIcon'
import { Button as ButtonComp } from 'src/components/buttons'
import DownloadIcon from '@public/icons/DownloadIcon'

interface IndexProps {
  MockData: any
  showPDF: boolean
  setShowPDF: (showPDF: boolean) => void
}

const Index: React.FC<IndexProps> = ({ MockData, showPDF, setShowPDF }) => {
  const [loading, setLoading] = useState(false)
  const [reportTitle, setReportTitle] = useState('')
  const [displayPDF, setDisplayPDF] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('French_Embassy')
  const [showOptions, setShowOptions] = useState(true)

  const generatePDFReport = () => {
    if (reportTitle.trim() === '') {
      toast.error('Please provide a report title')
      return
    }

    setLoading(true)
    setDisplayPDF(true)
    setShowOptions(false)
    setLoading(false)
  }

  const getTemplate = () => {
    switch (selectedTemplate) {
      case 'AirQo':
        return <AirQoPdfDocument data={MockData} />
      case 'French_Embassy':
        return <FrenchEmPdfDocument data={MockData} />
      default:
        return <AirQoPdfDocument data={MockData} />
    }
  }

  const returnButton = () => {
    return (
      <button
        className="w-[2.5rem] h-[2.5rem] text-white rounded-lg p-2 hover:bg-gray-300 dark:hover:bg-gray-700"
        onClick={() => {
          if (displayPDF) {
            setDisplayPDF(false)
            setShowOptions(true)
          } else {
            setShowPDF(!showPDF)
          }
        }}
      >
        <BackArrow width={24} height={24} />
      </button>
    )
  }

  return (
    <>
      {/* Request user to provide the report title and choose a template */}
      {showOptions && (
        <div>
          {/* return buttons */}
          {returnButton()}
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <label htmlFor="reportTitle">
                Report Title {displayPDF && <small>{'(Editable)'}</small>}
              </label>
              <input
                type="text"
                id="reportTitle"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                placeholder="Enter report title"
                className="p-2 border-2 border-dotted border-yellow-500 rounded-lg bg-transparent dark:bg-gray-800 dark:text-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="template">Choose a template:</label>
              <select
                id="template"
                value={selectedTemplate}
                className="p-2 border-2 border-dotted border-yellow-500 rounded-lg bg-transparent dark:bg-gray-800 dark:text-white"
                onChange={(e) => setSelectedTemplate(e.target.value)}
              >
                <option value="AirQo">AirQo</option>
                <option value="French_Embassy">French Embassy</option>
              </select>
            </div>
            <ButtonComp
              backgroundColor="#800000"
              text={loading ? 'Generating...' : 'Generate Report'}
              onClick={generatePDFReport}
            />
          </div>
        </div>
      )}

      {displayPDF && (
        <PDFDownloadLink
          document={getTemplate()}
          fileName={`${reportTitle} Report.pdf`}
        >
          {({ url, loading, error }) => {
            if (loading) {
              return (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <BarLoader color="#d6a936" />
                  <p className="mt-2 text-lg text-gray-600">
                    Generating your report, please wait...
                  </p>
                </div>
              )
            }
            if (error) {
              return (
                <div className="flex flex-col justify-center items-center mt-8">
                  <p className="mt-2 text-lg text-red-600">
                    Error generating report. Please try again
                  </p>
                </div>
              )
            }
            return (
              <div>
                {returnButton()}
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold capitalize">
                    {reportTitle}
                  </h2>
                  <div className="flex flex-wrap">
                    <ButtonComp
                      backgroundColor="#006583"
                      text="Save"
                      icon={<SaveIcon width={20} height={20} />}
                      onClick={() => {}}
                    />
                    <ButtonComp
                      backgroundColor="#800000"
                      text="Download"
                      icon={<DownloadIcon width={20} height={20} />}
                      onClick={() => {
                        // download the pdf file
                        const link = document.createElement('a')
                        link.href = url as string
                        link.download = `${reportTitle} Report.pdf`
                        link.click()
                      }}
                    />
                  </div>
                </div>
                <iframe
                  src={url as string}
                  style={{
                    width: '100%',
                    height: '650px',
                  }}
                />
              </div>
            )
          }}
        </PDFDownloadLink>
      )}
    </>
  )
}

export default Index
