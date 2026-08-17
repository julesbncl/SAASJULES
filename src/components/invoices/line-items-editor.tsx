"use client";

import React from "react";
import { Plus, Trash2, Calculator } from "lucide-react";
import { formatFCFA } from "@/lib/format";
import { computeLineTotal, calculateInvoiceTotals } from "@/lib/calculations/invoice-totals";

export interface LineItemState {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface LineItemsEditorProps {
  items: LineItemState[];
  onChange: (items: LineItemState[]) => void;
  vatRate?: number;
}

export function LineItemsEditor({
  items,
  onChange,
  vatRate = 18,
}: LineItemsEditorProps) {
  const handleAddItem = () => {
    const newItem: LineItemState = {
      id: `li_${Date.now()}`,
      description: "",
      quantity: 1,
      unitPrice: 0,
    };
    onChange([...items, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    const updated = items.filter((_, idx) => idx !== index);
    onChange(updated);
  };

  const handleUpdateItem = (
    index: number,
    field: keyof LineItemState,
    value: string | number
  ) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  const totals = calculateInvoiceTotals(
    items.map((i) => ({ quantity: i.quantity, unitPrice: i.unitPrice })),
    vatRate
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Articles & Prestations
          </h3>
        </div>
        <span className="text-xs text-slate-400">
          Calcul automatique TVA {vatRate}% & Total FCFA
        </span>
      </div>

      {/* Line Items List */}
      <div className="space-y-2.5">
        {items.map((item, index) => {
          const lineTotal = computeLineTotal(item.quantity, item.unitPrice);

          return (
            <div
              key={item.id || index}
              className="p-3.5 rounded-2xl bg-[#0f1524] border border-white/[0.07] grid grid-cols-12 gap-3 items-center hover:border-white/[0.14] transition-all group"
            >
              {/* Description */}
              <div className="col-span-12 md:col-span-6">
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Description de la prestation / produit
                </label>
                <input
                  type="text"
                  placeholder="Ex: Conception UI/UX, Maintenance mensuelle, Matériel..."
                  value={item.description}
                  onChange={(e) =>
                    handleUpdateItem(index, "description", e.target.value)
                  }
                  required
                  className="w-full px-3 py-2 text-xs bg-[#141b2b] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Quantity */}
              <div className="col-span-4 md:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Quantité
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={item.quantity === 0 ? "" : item.quantity}
                  onChange={(e) =>
                    handleUpdateItem(
                      index,
                      "quantity",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  required
                  className="w-full px-3 py-2 text-xs bg-[#141b2b] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tabular-nums text-center"
                />
              </div>

              {/* Unit Price FCFA */}
              <div className="col-span-5 md:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Prix Unit. (FCFA)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={item.unitPrice === 0 ? "" : item.unitPrice}
                  onChange={(e) =>
                    handleUpdateItem(
                      index,
                      "unitPrice",
                      parseInt(e.target.value, 10) || 0
                    )
                  }
                  required
                  className="w-full px-3 py-2 text-xs bg-[#141b2b] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tabular-nums text-right"
                />
              </div>

              {/* Line Total & Remove Action */}
              <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-2 pt-4 md:pt-0">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">
                    Total Ligne
                  </div>
                  <div className="text-xs font-bold text-white tabular-nums">
                    {formatFCFA(lineTotal)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  disabled={items.length <= 1}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  title="Supprimer la ligne"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Line Action */}
      <button
        type="button"
        onClick={handleAddItem}
        className="w-full py-2.5 rounded-2xl border border-dashed border-white/[0.15] hover:border-blue-500/50 bg-white/[0.02] hover:bg-blue-500/[0.05] text-slate-300 hover:text-blue-400 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
      >
        <Plus className="w-4 h-4" />
        <span>Ajouter une ligne de prestation</span>
      </button>

      {/* Live Financial Totals Breakdown Card */}
      <div className="p-4 rounded-2xl bg-[#090d17] border border-white/[0.08] space-y-2 mt-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Sous-total HT</span>
          <span className="font-semibold text-slate-200 tabular-nums">
            {formatFCFA(totals.subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>TVA ({vatRate}%)</span>
          <span className="font-semibold text-amber-400/90 tabular-nums">
            {formatFCFA(totals.vatAmount)}
          </span>
        </div>

        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-sm">
          <span className="font-bold text-white">Total TTC à payer</span>
          <span className="font-extrabold text-blue-400 text-base tabular-nums">
            {formatFCFA(totals.total)}
          </span>
        </div>
      </div>
    </div>
  );
}
