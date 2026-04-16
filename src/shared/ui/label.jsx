export function Label({ className = "", ...props }) {
  return (
    <label
      className={`block text-sm font-semibold text-gray-700 ${className}`}
      {...props}
    />
  );
}
