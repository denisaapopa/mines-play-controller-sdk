export function cleanInputInteger(value) {
    const cleaned = value.replace(/[^0-9]/g, "");
    return cleaned.replace(/^0+(?!\b)/, "");
}
//# sourceMappingURL=cleanInputInteger.js.map