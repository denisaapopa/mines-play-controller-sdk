export function cleanInputInteger(value: string) {
  const cleaned = value.replace(/[^0-9]/g, "");

  return cleaned.replace(/^0+(?!\b)/, "");
}
