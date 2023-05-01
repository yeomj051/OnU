//512px
import tw from 'twin.macro';
import styled from 'styled-components';

const FixedWidth = styled.div`
  width: 512px;
  @media (max-width: 512px) {
    width: 100%;
  }
`;

const AppLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center">
      <FixedWidth>{props.children}</FixedWidth>
    </div>
  );
};

export default AppLayout;
