import * as React from 'react';
import { Stack, Accordion, AccordionDetails, AccordionSummary, Typography, TextField, SvgIconProps } from '@mui/material';
import { Medication, MoreOutlined, PushPinOutlined } from '@mui/icons-material';

interface Icon extends SvgIconProps {
  name: string,
}

export interface MedicationCardProps {
  name: string,
  icon: Icon,
  amount: number,
}

const iconMap: { [index: string]: (props: SvgIconProps) => JSX.Element } = {
  MEDICATION: Medication,
  TEST_STRIP: MoreOutlined,
  NEEDLE: PushPinOutlined,
}

const getIcon = (icon: Icon) => {
  const Component = iconMap[icon.name];
  return (
    <Component color={icon.color} />
  )
}

const MedicationCard = ({ name = 'Medication', icon = { name: 'MEDICATION', color: 'primary' }, amount = 0 }: MedicationCardProps) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const handleExpand = () => { setExpanded(!expanded) };

  return (
    <div>
      <Accordion expanded={expanded} elevation={3}>
        <AccordionSummary>
          <Stack direction="row" spacing={2} sx={{ width: '75%', flexShrink: 0, margin: 'auto 0' }} onClick={handleExpand}>
            {getIcon(icon)}
            <Typography>
              {name}
            </Typography>
          </Stack>
          <TextField variant="outlined" type="number" defaultValue={amount} inputProps={{ sx: { textAlign: 'center' } }} />
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default MedicationCard;
