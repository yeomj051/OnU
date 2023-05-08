import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { ClickAwayListener, Drawer } from '@mui/material';
import { itemStore } from '@/store/itemStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Transition } from '@headlessui/react';

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

type Item = {
  id: number; //itemId
  name: string; //제목
  manufacturer?: string; //제조사
  imgUrl: string; //썸네일 이미지
  itemUrl: string; //상세정보 링크
};

function CompareDrawer() {
  const [open, setOpen] = React.useState(false);
  const [itemList, setItemList] = React.useState<Item[]>([]);
  const [alert, setAlert] = React.useState(false);
  itemStore.subscribe((state) => state);
  const { items, removeItem } = itemStore();
  const router = useRouter();

  React.useEffect(() => {
    setItemList(items);
    console.log(itemList);
  }, [itemList, items]);

  const toggleDrawer = (newOpen: boolean) => () => {
    if (itemList.length !== 2 && !newOpen) setOpen(false);
    else if (itemList.length !== 2 && newOpen) setOpen(true);
    else setOpen(!open);
  };

  const deleteItem = (id: number) => {
    removeItem(id);
    setItemList(items.filter((item) => item.id === id));
  };

  const comparePills = () => {
    if (itemList.length >= 2)
      router.push('/pillcompare/pill-compare');
    else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
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
          {/* 비교함 내부 */}

          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-row w-full">
              <div className="indicator">
                {itemList[0] ? (
                  <div className="indicator-item badge badge-primary right-3">
                    <button
                      onClick={() => deleteItem(itemList[0].id)}
                    >
                      삭제
                    </button>
                  </div>
                ) : null}
                <div className="grid flex-grow w-56 h-56 card bg-base-300 rounded-box place-items-center">
                  {itemList[0] ? (
                    <div className="flex flex-col items-center">
                      <Image
                        src={itemList[0]?.imgUrl}
                        alt="item-img"
                        width={140}
                        height={100}
                        style={{ objectFit: 'cover' }}
                      />
                      <span>{itemList[0]?.name}</span>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="divider divider-horizontal" />
              <div className="indicator">
                {itemList[1] ? (
                  <div className="indicator-item badge badge-primary right-3">
                    <button
                      onClick={() => deleteItem(itemList[1].id)}
                    >
                      삭제
                    </button>
                  </div>
                ) : null}
                <div className="grid flex-grow w-56 h-56 card bg-base-300 rounded-box place-items-center">
                  {itemList[1] ? (
                    <div className="flex flex-col items-center">
                      <Image
                        src={itemList[1]?.imgUrl}
                        alt="item-img"
                        width={140}
                        height={100}
                        style={{ objectFit: 'cover' }}
                      />
                      <span>{itemList[1]?.name}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <button
              className="btn btn-wide btn-sm"
              onClick={comparePills}
            >
              비교하기
            </button>
          </div>
        </StyledBox>
      </Drawer>

      <Transition
        show={alert}
        enter="transition ease-in duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="toast">
          <div className="alert alert-info">
            <div>
              <span>비교할 상품이 없습니다</span>
            </div>
          </div>
        </div>
      </Transition>
    </Root>
  );
}

export default CompareDrawer;
