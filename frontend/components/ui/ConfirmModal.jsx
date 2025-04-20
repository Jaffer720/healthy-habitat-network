export default function ConfirmModal({ isOpen, onClose, onConfirm, message = "Are you sure?" }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded p-6 w-full max-w-md shadow-md relative">
          <h2 className="text-xl font-semibold mb-4">Confirm Action</h2>
          <p className="mb-6">{message}</p>
          <div className="flex justify-end gap-3">
            <button
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
  