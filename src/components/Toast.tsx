import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ToastCtx {
  push: (msg: string, ms?: number) => void;
}

const Ctx = createContext<ToastCtx>({ push: () => {} });

export function useToast() {
  return useContext(Ctx);
}

interface Toast {
  id: number;
  msg: string;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((msg: string, ms = 3600) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, ms);
  }, []);

  return (
    <Ctx.Provider value={{ push }}>
      {children}
      {createPortal(
        <AnimatePresence>
          {toasts.map((t, i) => (
            <motion.div
              key={t.id}
              className="toast"
              style={{ bottom: `${2 + i * 4}rem` }}
              initial={{ opacity: 0, y: 20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 12, x: '-50%' }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {t.msg}
            </motion.div>
          ))}
        </AnimatePresence>,
        document.body
      )}
    </Ctx.Provider>
  );
}
