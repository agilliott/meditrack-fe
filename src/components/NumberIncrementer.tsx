import { useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import { RemoveCircleOutline, AddCircleOutline } from '@mui/icons-material';

import NumberSelect from './NumberSelect';

export type OperatorType = 'ADD' | 'SUBTRACT';

interface NumberIncrementerProps {
  selectValues: number[];
  defaultSelectedValue?: number;
  increment: {
    callback: (value: number, operator: OperatorType) => void;
    enabled?: boolean;
  };
  decrement: {
    callback: (value: number, operator: OperatorType) => void;
    enabled?: boolean;
  };
}

const NumberIncrementer = ({
  selectValues,
  defaultSelectedValue,
  increment,
  decrement,
}: NumberIncrementerProps) => {
  const [selected, setSelected] = useState(
    defaultSelectedValue || selectValues[0]
  );

  function handleSubtract() {
    decrement.callback(selected, 'SUBTRACT');
  }

  function handleAdd() {
    increment.callback(selected, 'ADD');
  }

  return (
    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={2}>
        <IconButton
          color="primary"
          aria-label={`Subtrack ${selected}`}
          onClick={handleSubtract}
        >
          <RemoveCircleOutline fontSize="large" />
        </IconButton>
      </Grid>
      <Grid item xs={8} m="auto">
        <Grid container>
          {selectValues.map((value) => (
            <Grid item xs key={value} textAlign="center">
              <NumberSelect
                value={value}
                selected={selected === value}
                callback={setSelected}
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
        >
          <AddCircleOutline fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default NumberIncrementer;