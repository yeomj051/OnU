import styled from 'styled-components';

const FixedWidth = styled.div`
  width: 512px;
  background-color: #ffffff;
  @media (max-width: 512px) {
    width: 100%;
  }
`;

const AppLayout = (props: {
  children: React.ReactNode;
}): React.ReactElement => {
  return (
    <div className="flex justify-center">
      <FixedWidth>{props.children}</FixedWidth>
    </div>
  );
};

export default AppLayout;
