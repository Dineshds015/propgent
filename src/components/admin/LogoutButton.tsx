'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <button 
      onClick={handleLogout}
      className="w-full flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors mt-4 pt-4 border-t border-gray-200"
    >
      <LogOut size={18} /> Logout
    </button>
  );
}
