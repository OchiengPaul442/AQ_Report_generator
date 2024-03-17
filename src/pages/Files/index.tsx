import PropTypes from 'prop-types'
import Layout from 'src/layout/Layout'
import PdfIcon from '@public/icons/PdfIcon'
import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { useRef, useState } from 'react'
import { Button as ButtonComp } from 'src/components/buttons'
import DownloadIcon from '@public/icons/DownloadIcon'
import ShareIcon from '@public/icons/ShareIcon'

interface ReportItemProps {
  item: {
    title: string
    date: string
    type: string
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
      key={item.title}
      className={`flex items-center justify-between border-b border-gray-200 cursor-pointer py-2 px-2 ${
        index % 2 !== 0 ? 'bg-gray-300' : ''
      } hover:bg-gray-200 rounded-lg my-2`}
    >
      <div className="flex items-center">
        <PdfIcon width={30} height={30} />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>
      <div className="flex flex-wrap">
        <ButtonComp
          backgroundColor="#800000"
          text="Download"
          onClick={() => null}
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
          <Button onClick={handleShare} color="success">
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

ReportItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
}

const Index: React.FC = () => {
  const items = [
    {
      title: 'Report 1',
      date: '2021-09-01',
      type: 'pdf',
    },
    {
      title: 'Report 2',
      date: '2021-09-02',
      type: 'pdf',
    },
    {
      title: 'Report 3',
      date: '2021-09-03',
      type: 'pdf',
    },
    {
      title: 'Report 4',
      date: '2021-09-04',
      type: 'pdf',
    },
  ]

  return (
    <Layout>
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold mb-2">Saved Reports</h2>
        <div className="mt-4">
          {items.map((item, index) => (
            <ReportItem key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Index
