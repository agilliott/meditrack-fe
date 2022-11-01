import {
  Grid,
  Card,
  Typography,
  IconButton,
  Stack,
  Button,
} from '@mui/material';
import { SwapVert } from '@mui/icons-material';
import { getIcon } from '../utils/getIcon';

type MedicationCardProps = {
  id: number;
  // order: number;
  title: string;
  searchable: boolean;
  medication_category_id: number;
  icon_colour: string;
  icon_key: string;
  default_increment_index: number;
  increments: number[];
  measurements?: string[];
  meta: {
    created_at: string;
    updated_at: string;
  };
};

const MedicationCard = ({
  title,
  icon_colour,
  icon_key,
  increments,
  meta,
}: MedicationCardProps) => {
  return (
    <Card elevation={1}>
      <Grid container padding={3} spacing={1}>
        <Grid item xs margin="auto">
          <Stack direction="row" spacing={1}>
            {getIcon({ color: icon_colour, name: icon_key })}
            <Typography>{title}</Typography>
          </Stack>
        </Grid>
        <Grid item alignSelf="flex-end">
          <IconButton color="primary" aria-label="Reorder">
            <SwapVert />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Typography variant="subtitle2">
              Increments: {increments.join(', ')}
            </Typography>
          </Stack>
          <Grid item xs={12}>
            <Stack
              direction="row"
              spacing={1}
              pt={2}
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Typography variant="subtitle2" sx={{ opacity: 0.5 }}>
                Added: {new Date(meta.created_at).toLocaleDateString()}
              </Typography>
              <Button color="primary" variant="outlined" size="large">
                Edit
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MedicationCard;
