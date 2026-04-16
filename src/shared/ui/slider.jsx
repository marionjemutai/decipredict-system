export function Slider({ value, onValueChange, min = 0, max = 100, step = 1, className = "" }) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={(e) => onValueChange([Number(e.target.value)])}
      className={`w-full h-2 rounded-full accent-blue-500 cursor-pointer ${className}`}
    />
  );
}
