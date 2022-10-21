import { useCallback, useEffect, useState } from 'react';
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
import debounce from 'lodash.debounce';

import NumberIncrementer, { OperatorType } from './NumberIncrementer';
import Timestamp from './Timestamp';

interface Icon {
  name: string;
  color: string;
}

export interface MedicationCardProps {
  name: string;
  icon?: Icon;
  amount: number;
  id?: number;
  medicineId: number;
  incrementSettings: {
    selectValues: number[];
    defaultSelectedValue: number;
  };
  updated?: string;
  timeSinceUpdate?: string;
  updateError: boolean;
  updateSubmitting: boolean;
  updateSuccess: boolean;
  handleUpdate: ({
    quantity,
    medicineId,
    id,
  }: {
    quantity: number;
    medicineId: number;
    id?: number;
  }) => void;
}

interface ShowIcon {
  success: boolean;
  loading: boolean;
  error: boolean;
}

const iconMap: { [index: string]: (props: SvgIconProps) => JSX.Element } = {
  INSULIN: Medication,
  TEST_STRIP: MoreOutlined,
  NEEDLE: PushPinOutlined,
};

const getIcon = (icon: Icon) => {
  const Component = iconMap[icon.name] || Medication;
  return (
    <Component
      sx={{ color: (theme: any) => theme.palette.colorOptions[icon.color] }}
    />
  );
};

const MedicationCard = ({
  name = 'Medication',
  icon = { name: 'MEDICATION', color: 'blue1' },
  amount = 0,
  incrementSettings,
  updated,
  id,
  medicineId,
  timeSinceUpdate,
  updateError = false,
  updateSubmitting = false,
  updateSuccess = false,
  handleUpdate,
}: MedicationCardProps) => {
  const [totalAmount, setTotalAmount] = useState<number>(amount);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [showIcon, setShowIcon] = useState<ShowIcon>({
    success: false,
    loading: false,
    error: false,
  });
  const debouncedUpdate = useCallback(debounce(handleUpdate, 500), []);

  useEffect(() => {
    if (totalAmount != amount) {
      debouncedUpdate({ quantity: totalAmount, medicineId, id });
    }
  }, [totalAmount]);

  useEffect(() => {
    if (updateError) {
      setShowIcon({ success: false, loading: false, error: true });
      setTimeout(() => {
        setShowIcon({ success: false, loading: false, error: false });
      }, 2000);
    }
    if (updateSubmitting) {
      setShowIcon({ success: false, loading: true, error: false });
      setTimeout(() => {
        setShowIcon({ success: false, loading: false, error: false });
      }, 2000);
    }
    if (updateSuccess) {
      setShowIcon({ success: true, loading: false, error: false });
      setTimeout(() => {
        setShowIcon({ success: false, loading: false, error: false });
      }, 2000);
    }
  }, [updateError, updateSubmitting, updateSuccess]);

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
    <>
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
            alignItems="center"
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
            {showIcon.success && (
              <CheckCircleOutline color="success" sx={{ margin: 'auto' }} />
            )}
            {showIcon.error && (
              <ErrorOutline color="error" sx={{ margin: 'auto' }} />
            )}
            {showIcon.loading && (
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
          {updated && timeSinceUpdate && (
            <Timestamp date={new Date(updated)} timeLapsed={timeSinceUpdate} />
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default MedicationCard;
