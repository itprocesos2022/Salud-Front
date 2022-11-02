import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import SettingsList from '../../components/Settings/List/index'
import OTECSList from '../../components/Settings/OTECS/OTECSList'
import ScheduleList from '../../components/Settings/Schedule/ScheduleList'
import Prestadores from '../../components/Settings/Prestadores'
import Medidas from '../../components/Settings/Medidas/List'
import Years from '../../components/Settings/Years/List'

const Settings = () => (
  <Box>
    <PageHeading>Configuración</PageHeading>
    <Prestadores />
    <Years />
    <Medidas />
    <SettingsList />
    <OTECSList />
    <ScheduleList />
  </Box>
)

export default Settings
