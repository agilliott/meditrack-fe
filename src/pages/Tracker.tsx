import { Grid } from '@mui/material'
import { MedicationCard } from '../components';
import { MedicationCardProps } from '../components/MedicationCard'

const mockData: MedicationCardProps[] = [
  { name: 'Contour Next', icon: { name: 'TEST_STRIP', color: 'primary' }, amount: 2 },
  { name: 'Novofine 6mm', icon: { name: 'NEEDLE', color: 'secondary' }, amount: 5 },
  { name: 'NovoRapid', icon: { name: 'MEDICATION', color: 'warning' }, amount: 26 },
  { name: 'Levemir', icon: { name: 'MEDICATION', color: 'info' }, amount: 14 }
]

const Tracker = () => {
  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12}>Tracker</Grid>
      {mockData.map(item => (
        <Grid item xs={12} key={item.name}>
          <MedicationCard {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Tracker
