import { useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import { RemoveCircleOutline, AddCircleOutline } from '@mui/icons-material';

import NumberSelect from './NumberSelect';

export type OperatorType = 'ADD' | 'SUBTRACT';

interface NumberIncrementerProps {
  selectValues: number[];
  defaultSelectedValue: number;
  increment: {
    callback: (value: number, operator: OperatorType) => void;
    enabled?: boolean;
  };
  decrement: {
    callback: (value: number, operator: OperatorType) => void;
    enabled?: boolean;
  };
  onSelectChange: (value: number) => void;
}

const NumberIncrementer = ({
  selectValues,
  defaultSelectedValue,
  increment,
  decrement,
  onSelectChange,
}: NumberIncrementerProps) => {
  const { callback: dCallback, enabled: dEnabled = true } = decrement;
  const { callback: iCallback, enabled: iEnabled = true } = increment;
  const [selected, setSelected] = useState(
    selectValues[defaultSelectedValue] || selectValues[0]
  );

  function handleSubtract() {
    dCallback(selected, 'SUBTRACT');
  }

  function handleAdd() {
    iCallback(selected, 'ADD');
  }

  function handleChange(value: number, index: number) {
    setSelected(value);
    onSelectChange(index);
  }

  return (
    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={2}>
        <IconButton
          color="primary"
          aria-label={`Subtract ${selected}`}
          onClick={handleSubtract}
          disabled={!dEnabled}
        >
          <RemoveCircleOutline fontSize="large" />
        </IconButton>
      </Grid>
      <Grid item xs={8} m="auto">
        <Grid container>
          {selectValues.map((value, index) => (
            <Grid item xs key={value} textAlign="center">
              <NumberSelect
                value={value}
                selected={selected === value}
                callback={handleChange}
                index={index}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={2} textAlign="right">
        <IconButton
          color="primary"
          aria-label={`Add ${selected}`}
          onClick={handleAdd}
          disabled={!iEnabled}
        >
          <AddCircleOutline fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default NumberIncrementer;
