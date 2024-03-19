/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Select from 'react-select'
import { fetchGridDataAsync } from 'src/services/redux/GrideSlice'
import { getReportDataAsync } from 'src/services/redux/ReportSlice'
import { useDispatch, useSelector } from 'src/services/redux/utils'
import { Button as ButtonComp } from 'src/components/buttons'
import DownloadIcon from '@public/icons/DownloadIcon'
import {
  setStartDate,
  setEndDate,
  setGridID,
  clearForm,
  setReportTitle,
  setReportTemplate,
} from 'src/services/redux/ReportSlice'
import { Spinner } from 'flowbite-react'
import { setLoading } from 'src/services/redux/ChartSlice'

const Index = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const gridData = useSelector((state) => state.grid.data)
  const isLoading = useSelector((state) => state.grid.loading)
  const darkMode = useSelector((state) => state.darkMode.darkMode)
  const startDate = useSelector((state) => state.report.startDate)
  const endDate = useSelector((state) => state.report.endDate)
  const gridID = useSelector((state) => state.report.gridID)
  const reportTitle = useSelector((state) => state.report.reportTitle)
  const reportTemplate = useSelector((state) => state.report.reportTemplate)
  const loadReportData = useSelector((state) => state.report.isLoading)

  useEffect(() => {
    dispatch(fetchGridDataAsync())
  }, [dispatch])

  const generateReportData = () => {
    dispatch(setLoading(true))
    dispatch(getReportDataAsync()).then((res: any) => {
      if (res.success) {
        navigate('/view')
        dispatch(setLoading(false))
      }
    })
  }

  return (
    <div>
      <div className="flex flex-col space-y-4">
        <div className="block space-y-4">
          <div className="flex justify-end gap-3">
            <ButtonComp
              backgroundColor="#145dff"
              text="Clear Form"
              onClick={() => dispatch(clearForm())}
            />
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="reportTitle"
                className="text-gray-700 dark:text-gray-200"
              >
                Report Title
              </label>
              <input
                type="text"
                id="reportTitle"
                value={reportTitle}
                onChange={(e) => dispatch(setReportTitle(e.target.value))}
                placeholder="Enter report title"
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="template"
                className="text-gray-700 dark:text-gray-200"
              >
                Choose a template:
              </label>
              <select
                id="template"
                value={reportTemplate}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => dispatch(setReportTemplate(e.target.value))}
              >
                <option value="AirQo">AirQo</option>
                <option value="French_Embassy">French Embassy</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between gap-3 flex-wrap">
            {/* Date pickers */}
            <div className="flex flex-wrap items-center gap-2 cursor-pointer">
              <div className="flex flex-col">
                <label className="mb-1">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  placeholder="Select start date ..."
                  value={startDate}
                  onChange={(e) => dispatch(setStartDate(e.target.value))}
                  className="p-2 w-64 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  placeholder="Select end date ..."
                  value={endDate}
                  onChange={(e) => dispatch(setEndDate(e.target.value))}
                  className="p-2 w-64 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
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
                value={
                  gridID
                    ? {
                        value: gridID,
                        label:
                          gridData[0]?.grids.find((grid) => grid._id === gridID)
                            ?.long_name || '',
                      }
                    : null
                }
                options={gridData[0]?.grids.map((grid) => ({
                  value: grid._id,
                  label: grid.long_name,
                }))}
                onChange={(selectedOption: any) =>
                  dispatch(setGridID(selectedOption.value))
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
                    backgroundColor: darkMode ? '#1f2937' : 'white',
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

          <div className="flex h-48 items-center justify-center border-2 border-dotted border-blue-500 rounded-lg">
            <ButtonComp
              backgroundColor="#145dff"
              text={loadReportData ? 'Fetching Data ...' : 'Fetch Report Data'}
              onClick={generateReportData}
              disabled={loadReportData}
              icon={
                loadReportData ? (
                  <Spinner
                    aria-label="Medium sized spinner example"
                    size="md"
                  />
                ) : (
                  <DownloadIcon width={20} height={20} />
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
