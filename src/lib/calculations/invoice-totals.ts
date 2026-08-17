/**
 * Pure calculation functions for invoice amounts in FCFA (integers, no decimals)
 * Used consistently across client-side forms, repository layer, and server actions.
 */

export interface LineItemInput {
  quantity: number;
  unitPrice: number;
}

/**
 * Calculates a single line item total in FCFA
 */
export function computeLineTotal(quantity: number, unitPrice: number): number {
  const safeQty = isNaN(quantity) || quantity < 0 ? 0 : quantity;
  const safePrice = isNaN(unitPrice) || unitPrice < 0 ? 0 : unitPrice;
  return Math.round(safeQty * safePrice);
}

/**
 * Computes subtotal (Total HT) from a list of line items
 */
export function computeSubtotal(items: LineItemInput[]): number {
  return items.reduce((acc, item) => {
    return acc + computeLineTotal(item.quantity, item.unitPrice);
  }, 0);
}

/**
 * Computes VAT amount in FCFA from subtotal and VAT rate
 */
export function computeVatAmount(subtotal: number, vatRate: number): number {
  const safeSubtotal = isNaN(subtotal) || subtotal < 0 ? 0 : subtotal;
  const safeRate = isNaN(vatRate) || vatRate < 0 ? 0 : vatRate;
  return Math.round((safeSubtotal * safeRate) / 100);
}

/**
 * Computes total TTC in FCFA (subtotal + vat)
 */
export function computeTotal(subtotal: number, vatAmount: number): number {
  return subtotal + vatAmount;
}

/**
 * Full calculation bundle for an invoice
 */
export function calculateInvoiceTotals(items: LineItemInput[], vatRate: number = 18) {
  const subtotal = computeSubtotal(items);
  const vatAmount = computeVatAmount(subtotal, vatRate);
  const total = computeTotal(subtotal, vatAmount);

  return {
    subtotal,
    vatRate,
    vatAmount,
    total,
  };
}
