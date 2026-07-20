'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

type ToastType = 'success' | 'error';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 1;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((type: ToastType, message: string) => {
    const id = nextId++;
    setToasts((current) => [...current, { id, type, message }]);
    setTimeout(() => remove(id), 3500);
  }, [remove]);

  const value: ToastContextValue = {
    success: (message) => push('success', message),
    error: (message) => push('error', message),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${
                toast.type === 'success'
                  ? 'bg-white border-green-200'
                  : 'bg-white border-red-200'
              }`}
            >
              {toast.type === 'success' ? (
                <FaCheckCircle className="text-green-500 mt-0.5 shrink-0" />
              ) : (
                <FaExclamationCircle className="text-red-500 mt-0.5 shrink-0" />
              )}
              <p className="text-sm text-dark flex-1">{toast.message}</p>
              <button
                onClick={() => remove(toast.id)}
                className="text-dark/30 hover:text-dark/60 transition-colors"
                aria-label="Dismiss"
              >
                <FaTimes className="text-xs" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
