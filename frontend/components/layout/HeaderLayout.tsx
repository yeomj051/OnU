import Header from '../common/Header';

const HeaderLayout = (props: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default HeaderLayout;
