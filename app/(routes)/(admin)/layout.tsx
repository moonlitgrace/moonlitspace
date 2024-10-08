import dynamic from 'next/dynamic';
import React from 'react';

const DynamicAdminBar = dynamic(() => import('@/app/_components/_admin/admin-bar'), {
  ssr: false,
});

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mb-40 mt-10 flex w-full flex-col gap-10 md:mb-10">
      <DynamicAdminBar />
      {children}
    </div>
  );
}
