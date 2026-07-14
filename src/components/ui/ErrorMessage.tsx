interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      className="rounded-xl border-2 border-dcq-red bg-red-50 px-6 py-4 text-center"
      role="alert"
    >
      <p className="text-lg font-medium text-dcq-red">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-lg bg-dcq-red px-6 py-2 text-white transition-colors hover:bg-dcq-red-dark"
        >
          Opnieuw proberen
        </button>
      )}
    </div>
  );
}
