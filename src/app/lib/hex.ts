export function validateHex(hex: string) {
  const errors = {
    invalidLength: false,
    missingHash: false,
    invalidChars: false,
  }
  let valid = true
  if (![4, 5, 7, 9].includes(hex.length)) {
    errors.invalidLength = true
    valid = false
  }
  if (!hex.startsWith('#')) {
    errors.missingHash = true
    valid = false
  }
  const numPart = hex.slice(1)
  if (!numPart.match(/^[0-9A-Fa-f]+$/)) {
    errors.invalidChars = true
    valid = false
  }
  if (!valid) {
    return { valid: false as const, ...errors }
  }

  let withAlpha = false
  let shortHex = false
  if ([5, 9].includes(hex.length)) {
    withAlpha = true
  }
  if ([4, 5].includes(hex.length)) {
    shortHex = true
  }
  return { valid: true as const, withAlpha, shortHex }
}