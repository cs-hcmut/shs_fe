import { ReactNode } from "react";
import MainHeader from "../../components/MainHeader";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="relative bg-gray-100 w-full justify-between min-h-screen flex flex-col">
      <div className="w-full h-full flex-grow">
        <div className="fixed z-20 w-full top-0 h-20 left-0 flex flex-col">
          <MainHeader />
        </div>

        <div className="min-h-screen flex-grow pt h-full pt-20 w-full overflow-auto">
          {children}
        </div>
      </div>
      {/* <MainFooter /> */}
    </div>
  );
}
