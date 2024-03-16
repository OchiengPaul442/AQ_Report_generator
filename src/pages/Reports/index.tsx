/* eslint-disable @typescript-eslint/no-explicit-any */
import { Datepicker } from 'flowbite-react'
import Layout from 'src/layout/Layout'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { fetchGridDataAsync } from 'src/services/redux/GrideSlice'
import { useDispatch, useSelector } from 'src/services/redux/utils'
// import { getReportData } from 'src/services/apis/apis'
import BarLoader from 'react-spinners/BarLoader'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ReportGenerator from 'src/components/reports'
import MockData from 'src/services/data/data.json'

const Index = () => {
  const dispatch = useDispatch()
  const gridData = useSelector((state) => state.grid.data)
  const isLoading = useSelector((state) => state.grid.loading)
  const [loading, setLoading] = useState(false)
  const darkMode = useSelector((state) => state.darkMode.darkMode)
  const [showPDF, setShowPDF] = useState(false)

  // State variables to store the selected dates and grid
  const currentDate = new Date()
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  )
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  )
  const [selectedStartDate, setSelectedStartDate] =
    useState<Date>(firstDayOfMonth)
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(lastDayOfMonth)
  // Find the Uganda grid in the gridData
  const ugandaGrid = gridData[0]?.grids.find(
    (grid: any) => grid.long_name === 'Uganda',
  )
  const [selectedGrid, setSelectedGrid] = useState<any>({
    value: ugandaGrid?._id,
    label: ugandaGrid?.long_name,
  })

  useEffect(() => {
    dispatch(fetchGridDataAsync())
  }, [dispatch])

  const clearData = () => {
    setSelectedStartDate(null as any)
    setSelectedEndDate(null as any)
    setSelectedGrid(null)
    toast.success('Data cleared successfully!')
  }

  const generateReport = () => {
    // if any of the fields is empty, return
    if (!selectedStartDate || !selectedEndDate || !selectedGrid) {
      toast.error('Please fill all fields')
      return
    }

    // const data = {
    //   start_time: selectedStartDate,
    //   end_time: selectedEndDate,
    //   grid_id: selectedGrid.value,
    // }

    setLoading(true)
    // getReportData(data)
    //   .then(() => {
    //     setLoading(false)
    //     setShowPDF(true)
    //     toast.success('Data fetched successfully!')
    //   })
    //   .catch(() => {
    //     setLoading(false)
    //     setShowPDF(false)
    //     toast.error('An error occurred while fetching data')
    //   })
    setShowPDF(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <Layout>
      <div className="flex flex-col space-y-4">
        <div className={showPDF ? 'hidden' : 'block'}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Reports</h2>
            <button
              onClick={clearData}
              className="bg-[#800000] text-white font-bold py-2 px-4 rounded hover:bg-[#a30000] transition-all duration-300"
            >
              Clear Data
            </button>
          </div>
          <div className="flex justify-between gap-3 flex-wrap">
            {/* Date pickers */}
            <div className="flex flex-wrap items-center gap-2 cursor-pointer">
              <div className="flex flex-col">
                <label className="mb-1">Start Date</label>
                <Datepicker
                  className="w-64"
                  placeholder="Select start date ..."
                  value={
                    selectedStartDate
                      ? selectedStartDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : ''
                  }
                  style={{
                    cursor: 'pointer',
                  }}
                  onSelectedDateChanged={(date) => setSelectedStartDate(date)}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1">End Date</label>
                <Datepicker
                  className="w-64"
                  placeholder="Select end date ..."
                  value={
                    selectedEndDate
                      ? selectedEndDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : ''
                  }
                  style={{
                    cursor: 'pointer',
                  }}
                  onSelectedDateChanged={(date) => setSelectedEndDate(date)}
                />
              </div>
            </div>

            {/* Grid select */}
            <div className="flex flex-col">
              <label className="mb-1">Location</label>
              <Select
                className="basic-single w-64 bg-[#f9fafb] rounded-md border-none focus:outline-none dark:bg-gray-800 dark:text-white"
                classNamePrefix="select"
                placeholder="Select location ..."
                isDisabled={false}
                isLoading={isLoading}
                isClearable={true}
                isSearchable={true}
                name="Grids"
                value={selectedGrid}
                options={gridData[0]?.grids.map((grid) => ({
                  value: grid._id,
                  label: grid.long_name,
                }))}
                onChange={(selectedOption: any) =>
                  setSelectedGrid(selectedOption)
                }
                styles={{
                  input: (provided) => ({
                    ...provided,
                    fontSize: '0.875rem',
                    padding: '0.4rem',
                  }),
                  control: (base, state) => ({
                    ...base,
                    border: state.isFocused ? '0' : '1px solid #d2d6dc',
                    boxShadow: state.isFocused ? '0 0 0 3px #0060df' : 'none',
                    borderRadius: '8px',
                    backgroundColor: darkMode ? '#374151' : 'white',
                    color: darkMode ? 'white' : 'black',
                    cursor: 'pointer',
                  }),
                  container: (provided) => ({
                    ...provided,
                    border: '0',
                    outline: '0',
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: darkMode ? 'white' : 'black',
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? '#d6a936' : 'white',
                    color: state.isFocused ? 'white' : 'black',
                    cursor: 'pointer',
                  }),
                }}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <BarLoader color="#d6a936" />
            <p className="mt-2 text-lg text-gray-600">
              Preparing your report...
            </p>
          </div>
        ) : showPDF ? (
          <ReportGenerator
            MockData={MockData}
            showPDF={showPDF}
            setShowPDF={setShowPDF}
          />
        ) : (
          <div className="flex h-48 items-center justify-center border-2 border-dotted border-yellow-500 rounded-lg">
            <button
              className="bg-[#800000] hover:bg-[#a30000] transition-all duration-300 text-white font-bold py-2 px-4 rounded"
              onClick={generateReport}
            >
              Fetch Report Data
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Index
