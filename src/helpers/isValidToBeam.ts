export  default function isValidToBeam(duration: string): boolean {
  return !["w", "h", "q"].includes(duration);
}
