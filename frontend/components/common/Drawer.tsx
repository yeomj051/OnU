import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { abort } from 'process';
import { ClickAwayListener } from '@mui/material';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light'
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor:
    theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

function SwipeableEdgeDrawer(props: any) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: any) => () => {
    setOpen(newOpen);
  };

  return (
    <ClickAwayListener
      onClickAway={toggleDrawer(!open)}
      mouseEvent="onClick"
    >
      <Root onClick={toggleDrawer(!open)}>
        <CssBaseline />
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(50% - ${drawerBleeding}px)`,
              overflow: 'visible',
              maxWidth: '512px',
              left: `calc(50% - 256px)`,
            },
          }}
        />
        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={true}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              position: 'absolute',
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: 'visible',
              left: 0,
              right: 0,
            }}
          >
            <Puller />

            <Typography sx={{ p: 2, color: 'text.secondary' }}>
              51 results
            </Typography>
          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: '100%',
              overflow: 'auto',
            }}
          >
            <Skeleton variant="rectangular" height="100%" />
          </StyledBox>
        </SwipeableDrawer>
      </Root>
    </ClickAwayListener>
  );
}

export default SwipeableEdgeDrawer;
