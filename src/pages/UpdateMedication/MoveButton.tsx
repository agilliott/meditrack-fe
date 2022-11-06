import { useState } from 'react';
import { SwapVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';

interface MoveButtonProps {
  disabled: boolean;
  upDisabled: boolean;
  downDisabled: boolean;
  index: number;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
}

const MoveButton = ({
  disabled = false,
  index,
  handleMoveUp,
  handleMoveDown,
  upDisabled,
  downDisabled,
}: MoveButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const buttonId = `direction-button-${index}`;
  const menuId = `direction-menu-${index}`;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      handleMoveUp();
    } else {
      handleMoveDown();
    }
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id={buttonId}
        disabled={disabled}
        aria-label="Move unit"
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <SwapVert />
      </IconButton>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': buttonId,
        }}
      >
        <MenuItem disabled={upDisabled} onClick={() => handleClose('up')}>
          Move up
        </MenuItem>
        <MenuItem disabled={downDisabled} onClick={() => handleClose('down')}>
          Move down
        </MenuItem>
      </Menu>
    </>
  );
};

export default MoveButton;
