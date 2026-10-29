'use client'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  return (
    <div className='flex'>
      <div className='ml-64 w-4/5'>
        {children}
      </div>
    </div>)
}
