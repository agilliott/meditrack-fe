import * as React from 'react';
import {
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  TextField,
  SvgIconProps,
  CircularProgress,
  Box,
  Theme,
} from '@mui/material';
import {
  Medication,
  MoreOutlined,
  PushPinOutlined,
  CheckCircleOutline,
  ErrorOutline,
} from '@mui/icons-material';

import NumberIncrementer, { OperatorType } from './NumberIncrementer';

interface Icon extends SvgIconProps {
  name: string;
}

export interface MedicationCardProps {
  name: string;
  icon?: Icon;
  amount: number;
  incrementSettings: {
    selectValues: number[];
    defaultSelectedValue: number;
  };
}

const iconMap: { [index: string]: (props: SvgIconProps) => JSX.Element } = {
  MEDICATION: Medication,
  TEST_STRIP: MoreOutlined,
  NEEDLE: PushPinOutlined,
};

const getIcon = (icon: Icon) => {
  const Component = iconMap[icon.name];
  return <Component color={icon.color} />;
};

const MedicationCard = ({
  name = 'Medication',
  icon = { name: 'MEDICATION', color: 'primary' },
  amount = 0,
  incrementSettings,
}: MedicationCardProps) => {
  const [totalAmount, setTotalAmount] = React.useState<number>(amount);
  const [expanded, setExpanded] = React.useState<boolean>(false);

  // TODO: post on debounced change
  // Fix icon alignment

  const error: boolean = false;
  const loading: boolean = false;
  const success: boolean = false;

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) =>
    event.target.select();

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleAmountChange = (value: number, operator: OperatorType) => {
    if (operator === 'ADD') {
      setTotalAmount(totalAmount + value);
    } else {
      const subtractedAmount = totalAmount - value;
      setTotalAmount(subtractedAmount < 0 ? 0 : subtractedAmount);
    }
  };

  return (
    <div>
      <Accordion expanded={expanded} elevation={3}>
        <AccordionSummary
          onClick={(e) => e.preventDefault}
          sx={{
            '&.Mui-focusVisible': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{ width: '70%', flexShrink: 0, margin: 'auto 0' }}
            onClick={handleExpand}
          >
            {getIcon(icon)}
            <Typography>{name}</Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-end"
            sx={{ width: '30%', flexShrink: 0, margin: 'auto 0' }}
          >
            {success && (
              <CheckCircleOutline color="success" sx={{ margin: 'auto' }} />
            )}
            {error && <ErrorOutline color="error" sx={{ margin: 'auto' }} />}
            {loading && (
              <Box m="auto" pt="5px">
                <CircularProgress color="inherit" size={20} />
              </Box>
            )}
            <TextField
              variant="outlined"
              value={totalAmount}
              onFocus={handleFocus}
              onChange={(e) => setTotalAmount(Number(e.target.value))}
              sx={{ width: 55 }}
              inputProps={{
                inputMode: 'numeric',
                sx: {
                  textAlign: 'center',
                  border: 'none',
                  backgroundColor: (theme: Theme) =>
                    theme.palette.background.default,
                },
              }}
            />
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <NumberIncrementer
            selectValues={incrementSettings.selectValues}
            defaultSelectedValue={incrementSettings.defaultSelectedValue}
            increment={{ callback: handleAmountChange }}
            decrement={{ callback: handleAmountChange }}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MedicationCard;
