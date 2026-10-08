'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, List, MessageSquare, Menu, X } from 'lucide-react';
import LogoutButton from '@/components/admin/LogoutButton';

export default function AdminSidebar({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on navigation on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 bg-white p-2 rounded-md shadow-md border border-gray-200 text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200 flex flex-col shrink-0
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="font-heading font-bold text-xl text-primary">Propgent CMS</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <Link href="/admin" className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${pathname === '/admin' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100 hover:text-primary'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/properties" className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${pathname.includes('/admin/properties') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100 hover:text-primary'}`}>
            <List size={20} /> Properties
          </Link>
          <Link href="/admin/queries" className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${pathname.includes('/admin/queries') ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100 hover:text-primary'}`}>
            <MessageSquare size={20} /> Enquiries
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
            <Home size={18} /> Back to Website
          </Link>
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
