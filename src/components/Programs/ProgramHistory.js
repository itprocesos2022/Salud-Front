import { useState } from 'react'
import { DataTable } from '../Shared'
import { ActionsTable } from '../UI'
import { useToggle } from '../../hooks'
import HistoryDetailModal from './Dialogs/HistoryDetail'

const Programhistory = () => {
  const [data, setData] = useState({})
  const { open: openView, toggleOpen: toggleOpenView } = useToggle()
  const dataTable = [
    {
      id: 1,
      name: 'dental',
      worker: 'Javiera Rivera'
    },
    {
      id: 2,
      name: 'odontólogico',
      worker: 'Fernando Hidalgo'
    }
  ]
  const onRowClick = (row) => {
    setData(row)
    toggleOpenView()
  }
  return (
    <div>
      <DataTable
        highlightOnHover
        pointerOnHover
        columns={[
          {
            name: 'Obra',
            selector: (row) => row.name,
            center: true
          },
          {
            name: 'Trabajador',
            selector: (row) => row.worker,
            center: true
          },
          {
            center: true,
            hide: 'lg',
            cell: (row) => <ActionsTable onView={() => onRowClick(row)} />
          }
        ]}
        data={dataTable}
      />
      <HistoryDetailModal
        open={openView}
        onClose={toggleOpenView}
        data={data}
      />
    </div>
  )
}
export default Programhistory
