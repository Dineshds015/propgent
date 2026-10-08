'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

export default function DeletePropertyButton({ id, title }: { id: string, title: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete property');
      }
      
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('An error occurred while deleting the property.');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center text-red-600 hover:text-red-800 disabled:opacity-50"
      title="Delete Property"
    >
      <Trash2 size={18} />
    </button>
  );
}
