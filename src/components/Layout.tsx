import Wrapper, { WrapperVariant } from "./Wrapper";
import Navbar from "./NavBar";
import { ReactNode } from "react";

interface LayoutProps {
  variant?: WrapperVariant;
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <Navbar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
