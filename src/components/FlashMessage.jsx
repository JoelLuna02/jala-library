'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function FlashMessage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    const error = searchParams.get('error');
    const success = searchParams.get('success');

    if (error || success) {
      setMessage(error || success);
      setType(error ? 'error' : 'success');

      // limpiar la URL después de mostrar
      setTimeout(() => {
        router.replace(window.location.pathname);
      }, 3000);
    }
  }, [searchParams, router]);

  if (!message) return null;

  return (
    <div
      className={`p-3 rounded-md mb-4 text-sm font-medium ${
        type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
      }`}
    >
      {message}
    </div>
  );
}
