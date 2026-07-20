'use client';

import { useRouter } from 'next/navigation';
import { FaSignOutAlt } from 'react-icons/fa';

export default function SignOutButton() {
  const router = useRouter();

  const onClick = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm text-dark/60 hover:text-red-500 transition-colors"
    >
      <FaSignOutAlt />
      Sign Out
    </button>
  );
}
