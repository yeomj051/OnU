import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { ClickAwayListener, Drawer } from '@mui/material';

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
    theme.palette.mode === 'light' ? '#F5F5F5' : grey[800],
  // border: 1,
  // borderStyle: 'solid',
  // borderBottom: 'none',
  // borderColor: 'black',
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor:
    theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 12,
  left: 'calc(50% - 15px)',
}));

function SwipeableEdgeDrawer(props: any) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Root>
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
      <ClickAwayListener
        onClickAway={toggleDrawer(false)}
        mouseEvent="onClick"
      >
        <Drawer
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onClick={toggleDrawer(!open)}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              position: 'absolute',
              top: -drawerBleeding + 20,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: 'visible',
              left: 0,
              right: 0,
            }}
          >
            <div className="p-2 mt-6">
              <Puller />
            </div>
          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pt: 2,

              height: '100%',
              overflow: 'auto',
            }}
          >
            {/* <Skeleton sx={{}} variant="rectangular" height="100%" /> */}
          </StyledBox>
        </Drawer>
      </ClickAwayListener>
    </Root>
  );
}

export default SwipeableEdgeDrawer;
