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
    className="w-full bg-transparent text-right font-mono text-sm px-2 py-1.5 focus:outline-none focus:bg-secondary focus:ring-1 focus:ring-primary rounded-md transition-all duration-150"
    placeholder="0"
  />
);

export default CellInput;
