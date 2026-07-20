import Sidebar from '@/components/admin/Sidebar';
import SignOutButton from '@/components/admin/SignOutButton';
import { ToastProvider } from '@/components/admin/toast/ToastProvider';
import { getAdminSession } from '@/lib/session';

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-[#F7F7F5]">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="flex items-center justify-between gap-4 px-6 py-4 bg-white border-b border-gray-200">
            <p className="text-dark/50 text-sm">Signed in as <span className="text-dark font-medium">{session?.email}</span></p>
            <SignOutButton />
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
