import { useState } from "react";

export function useCurrencyInput() {
  const [displayValue, setDisplayValue] = useState("");

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, "");

    if (!value) {
      setDisplayValue("");
      return;
    }

    // Converte para número e divide por 100 para tratar os centavos
    const numberValue = Number(value) / 100;

    // Formata para o padrão brasileiro
    const formatted = numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    // Remove o "R$"
    setDisplayValue(formatted.replace("R$", "").trim());
  };

  return {
    value: displayValue,
    onChange: handleBudgetChange,
  };
}