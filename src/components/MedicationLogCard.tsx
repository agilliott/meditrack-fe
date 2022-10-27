import { useCallback, useEffect, useRef, useState } from 'react';
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

import { useUpdateMedication } from '../hooks';
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
  medicationId: number;
  incrementSettings: {
    selectValues: number[];
    defaultSelectedValueIndex: number;
  };
  updated?: string;
  timeSinceUpdate?: string;
  updateError: boolean;
  updateSubmitting: boolean;
  updateSuccess: boolean;
  handleUpdate: ({
    quantity,
    medicationId,
    id,
  }: {
    quantity: number;
    medicationId: number;
    id?: number;
  }) => void;
  expanded: boolean;
  setExpanded: (medicationId: number, expandedStatus: boolean) => void;
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
  medicationId,
  timeSinceUpdate,
  updateError = false,
  updateSubmitting = false,
  updateSuccess = false,
  expanded = false,
  setExpanded,
  handleUpdate,
}: MedicationCardProps) => {
  const [totalAmount, setTotalAmount] = useState<number>(amount);
  const debouncedUpdate = useCallback(debounce(handleUpdate, 1000), []);
  const textInput = useRef<HTMLInputElement>(null);
  const { updateMedication } = useUpdateMedication();

  useEffect(() => {
    if (totalAmount != amount) {
      debouncedUpdate({ quantity: totalAmount, medicationId, id });
    }
  }, [totalAmount]);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) =>
    event.target.select();

  const handleExpand = () => {
    setExpanded(medicationId, expanded);
  };

  const handleAmountChange = (value: number, operator: OperatorType) => {
    if (operator === 'ADD') {
      setTotalAmount(totalAmount + value);
    } else {
      const subtractedAmount = totalAmount - value;
      setTotalAmount(subtractedAmount < 0 ? 0 : subtractedAmount);
    }
  };

  const updateSelectDefault = (index: number) => {
    updateMedication({
      user_medication_id: medicationId,
      default_increment_index: index,
    });
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && textInput.current) {
      e.preventDefault();
      textInput.current.blur();
    }
  };

  return (
    <Accordion expanded={expanded} elevation={1}>
      <AccordionSummary
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
          role="button"
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
          {updateError && (
            <ErrorOutline
              aria-label="An error has occurred"
              color="error"
              sx={{ margin: 'auto' }}
            />
          )}
          {updateSubmitting && !updateError && (
            <Box m="auto" pt="5px" aria-label="Submitting">
              <CircularProgress color="inherit" size={20} />
            </Box>
          )}
          {updateSuccess && !updateError && !updateSubmitting && (
            <CheckCircleOutline
              aria-label="Successfully updated"
              color="success"
              sx={{ margin: 'auto' }}
            />
          )}

          <TextField
            variant="filled"
            inputRef={textInput}
            value={totalAmount}
            onFocus={handleFocus}
            aria-label="quantity"
            onChange={(e) => {
              if (!isNaN(Number(e.target.value))) {
                setTotalAmount(Number(e.target.value));
              }
            }}
            onKeyDown={handleKeydown}
            sx={{ width: 55 }}
            InputProps={{
              hiddenLabel: true,
              disableUnderline: true,
            }}
            inputProps={{
              inputMode: 'numeric',
              sx: {
                textAlign: 'center',
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
          defaultSelectedValue={incrementSettings.defaultSelectedValueIndex}
          increment={{ callback: handleAmountChange }}
          decrement={{ callback: handleAmountChange }}
          onSelectChange={updateSelectDefault}
        />
        {updated && timeSinceUpdate && (
          <Box textAlign="right" pt={2}>
            <Timestamp date={new Date(updated)} timeLapsed={timeSinceUpdate} />
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default MedicationCard;
