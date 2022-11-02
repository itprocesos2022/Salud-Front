import {
  Box,
  Card,
  IconButton,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import { StatusChip } from '../UI'

const CardSituation = ({ onEdit, onDelete }) => (
  <Grid item xs={12} md={12}>
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onEdit}>
            <Edit color="primary" />
          </IconButton>

          <IconButton onClick={onDelete}>
            <Delete color="error" />
          </IconButton>
        </Box>
        <Box my={1}>
          <Typography>AFP/ISP: </Typography>
          <Typography>ISAPRE/ FONASA:</Typography>
          <Typography>ISP/Fonasa:</Typography>
          <Typography>Monto de pensión: </Typography>
          <Box marginBottom="10px">
            <StatusChip label={`Pensionado:`} />
          </Box>
          <Box marginBottom="10px">
            <StatusChip label={`Pertenece a reconocer: `} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Grid>
)

CardSituation.propTypes = {}

export default CardSituation
