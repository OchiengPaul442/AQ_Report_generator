/* eslint-disable @typescript-eslint/no-explicit-any */
import PropTypes from 'prop-types'
import Layout from 'src/layout/Layout'
import PdfIcon from '@public/icons/PdfIcon'
import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { useRef, useState } from 'react'
import { Button as ButtonComp } from 'src/components/buttons'
import DownloadIcon from '@public/icons/DownloadIcon'
import ShareIcon from '@public/icons/ShareIcon'
import { Alert } from 'flowbite-react'
import { toast } from 'react-toastify'
import { setAlert } from 'src/services/redux/DarkModeSlice'
import { useDispatch } from 'src/services/redux/utils'

interface ReportItemProps {
  item: {
    fileName: string
    data: string
    date: string
  }
  index: number
}

const ReportItem: React.FC<ReportItemProps> = ({ item, index }) => {
  const [openModal, setOpenModal] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const handleShare = () => {
    console.log(emailRef.current?.value)
  }

  return (
    <div
      key={item.fileName || index}
      className="flex flex-wrap items-center justify-between border-b border-gray-200 cursor-pointer py-2 px-2 hover:bg-gray-200 rounded-lg my-2 dark:border-gray-600 dark:hover:bg-gray-500"
    >
      <div className="flex items-center">
        <PdfIcon width={30} height={30} />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white capitalize">
            {item.fileName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {formattedDate}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap">
        <ButtonComp
          backgroundColor="#034d38"
          text="Download"
          onClick={() => {
            const link = document.createElement('a')
            link.href = item.data
            link.download = `${item.fileName}.pdf`
            link.click()
            toast.success('Report downloaded successfully')
          }}
          icon={<DownloadIcon width={20} height={20} />}
        />
        <ButtonComp
          backgroundColor="#006583"
          text="Share"
          onClick={() => setOpenModal(true)}
          icon={<ShareIcon width={20} height={20} />}
        />
      </div>

      {/* modal */}
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        size="md"
        initialFocus={emailRef}
      >
        <Modal.Header>
          <p className="text-xl font-semibold">Share Report</p>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col">
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <TextInput
              ref={emailRef}
              id="email"
              placeholder="Enter email address"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)} color="gray">
            Cancel
          </Button>
          <Button onClick={handleShare} color="blue">
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

ReportItem.propTypes = {
  item: PropTypes.shape({
    fileName: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
}

const Index: React.FC = () => {
  const dispatch = useDispatch()

  // Retrieve savedFiles from localStorage
  const items = JSON.parse(localStorage.getItem('savedFiles') || '[]')

  // Function to check if data should be cleared
  const checkClearData = () => {
    const timestamp = localStorage.getItem('timestamp')
    if (timestamp) {
      const diff = Date.now() - Number(timestamp)
      // If it's been 3 days or more, warn the user that the savedFiles will be cleared in 24 hours
      if (
        diff >= 3 * 24 * 60 * 60 * 1000 &&
        diff < 4 * 24 * 60 * 60 * 1000 - 30 * 60 * 1000
      ) {
        dispatch(
          setAlert({
            message:
              'Your saved reports will be cleared in 24 hours. Please ensure that all necessary data is secured before this timeframe.',
            type: 'warning',
            visibility: true,
          }),
        )
      }
      // If it's been 4 days minus 30 minutes or more, warn the user that the savedFiles will be cleared in 30 minutes
      if (
        diff >= 4 * 24 * 60 * 60 * 1000 - 30 * 60 * 1000 &&
        diff < 4 * 24 * 60 * 60 * 1000
      ) {
        dispatch(
          setAlert({
            message:
              'Your saved reports will be cleared in 30 minutes. Please ensure that all necessary data is secured before this timeframe.',
            type: 'warning',
            visibility: true,
          }),
        )
      }
      // If it's been 4 days or more, clear the savedFiles and hide the alert
      if (diff >= 4 * 24 * 60 * 60 * 1000) {
        localStorage.removeItem('savedFiles')
        localStorage.removeItem('timestamp')
      }

      // Timeout the alert after 2 minutes
      setTimeout(() => {
        dispatch(
          setAlert({
            message: '',
            type: '',
            visibility: false,
          }),
        )
      }, 2 * 60 * 1000)
    }
  }

  // Check every minute
  setInterval(checkClearData, 60 * 1000)

  return (
    <Layout pageTitle="Saved Reports">
      {items.length > 0 && (
        <div className="mb-2">
          <Alert color="info" className="border-2 border-blue-500 rounded-md">
            <span className="font-semibold">Important Information:</span>
            Please note that you have the option to download or share your saved
            reports. However, for data management purposes, these reports will
            only be retained in the system for a period of 4 days. After this
            period, they will be automatically removed from the system. We
            recommend ensuring that all necessary data is secured before this
            timeframe.
          </Alert>
        </div>
      )}
      <div className="flex flex-col">
        {items.length > 0 ? (
          items.map((item: any, index: number) => (
            <ReportItem key={item.fileName} item={item} index={index} />
          ))
        ) : (
          <p className="text-lg text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center dark:text-gray-300">
            No reports have been saved yet. Start by generating a new report.
          </p>
        )}
      </div>
    </Layout>
  )
}

export default Index
