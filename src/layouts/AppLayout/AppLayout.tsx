import { ReactNode } from "react";
import PathBar, { PathElement } from "../../components/_common/PathBar";

interface AppLayoutProps {
  pathList: PathElement[];
  children?: ReactNode;
}

export default function AppLayout({ pathList, children }: AppLayoutProps) {
  return (
    <div className="container p-8">
      <PathBar pathList={pathList} />
      {children}
    </div>
  );
}
