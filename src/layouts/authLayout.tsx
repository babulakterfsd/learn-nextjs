import { ChildrenType } from '@/types/global.types';

export default function AuthLayout({ children }: ChildrenType) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
