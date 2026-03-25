interface CellInputProps {
  value: number;
  onChange: (v: number) => void;
}

const CellInput = ({ value, onChange }: CellInputProps) => (
  <input
    type="number"
    value={value || ""}
    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
    onFocus={(e) => e.target.select()}
    className="w-full bg-transparent text-right font-mono text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary rounded transition-colors"
    placeholder="0"
  />
);

export default CellInput;
