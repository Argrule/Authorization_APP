import { useEffect } from 'react';

/**
 * Dialog 弹窗组件
 * @param {boolean} open 是否显示弹窗
 * @param {string} message 弹窗内容
 * @param {number} delay 自动关闭的秒数（可选，默认2秒）
 * @param {function} onClose 关闭回调
 */
const Dialog = ({ open, message, delay = 1, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      onClose && onClose();
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [open, delay, onClose]);

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '0%',
      left: '50%',
      transform: open ? 'translate(-50%, 40px)' : 'translate(-50%, 0)',
      background: 'linear-gradient(135deg, #0dbc79 60%, #1a1a1a 100%)',
      color: '#fff',
      padding: '22px 48px',
      borderRadius: '14px',
      zIndex: 9999,
      minWidth: '220px',
      textAlign: 'center',
      fontSize: '1.15rem',
      fontWeight: 500,
      boxShadow: '0 6px 32px 0 rgba(13,188,121,0.18), 0 1.5px 8px 0 rgba(0,0,0,0.12)',
      border: '2px solid #0dbc79',
      letterSpacing: '0.5px',
      transition: 'opacity 0.4s cubic-bezier(.25,.8,.25,1), transform 0.4s cubic-bezier(.25,.8,.25,1)',
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      animation: open ? 'dialog-slide-in 0.5s cubic-bezier(.25,.8,.25,1)' : 'dialog-slide-out 0.5s cubic-bezier(.25,.8,.25,1)'
    }}>
      {message}
      <style>{`
        @keyframes dialog-slide-in {
          0% { opacity: 0; transform: translate(-50%, -60px); }
          60% { opacity: 1; transform: translate(-50%, 48px); }
          100% { opacity: 1; transform: translate(-50%, 40px); }
        }
        @keyframes dialog-slide-out {
          0% { opacity: 1; transform: translate(-50%, 40px); }
          100% { opacity: 0; transform: translate(-50%, -60px); }
        }
      `}</style>
    </div>
  );
};

export default Dialog;
