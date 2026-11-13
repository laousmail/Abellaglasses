/** Shows a real value, or a yellow placeholder until the client gives us the information. */
export default function Fill({ value, placeholder = '__', style }: { value?: string | null; placeholder?: string; style?: React.CSSProperties }) {
  if (value) return <>{value}</>;
  return <span className="fill" style={style}>{placeholder}</span>;
}
