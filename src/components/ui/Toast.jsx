import { useStore } from '../../context/StoreContext'
import Icon from './Icon'

export default function Toast() {
  const { toast } = useStore()
  const iconName =
    toast?.type === 'wish' ? 'heart-filled' : toast?.type === 'cart' ? 'bag' : 'check-circle'

  return (
    <div className="toast-wrap" aria-live="polite" aria-atomic="true">
      {toast && (
        <div className="toast" key={toast.id} role="status">
          <span className="toast__icon">
            <Icon name={iconName} size={18} />
          </span>
          <span className="toast__msg">{toast.message}</span>
        </div>
      )}
    </div>
  )
}
