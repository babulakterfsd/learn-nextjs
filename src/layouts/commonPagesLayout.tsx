import { ChildrenType } from '@/types/global.types';
import Footer from '@/ui/footer';
import Navbar from '@/ui/navbar';

export default function CommonPagesLayout({ children }: ChildrenType) {
  return (
    <>
      <Navbar />
      <div className="main-container">{children}</div>
      <Footer />
    </>
  );
}
