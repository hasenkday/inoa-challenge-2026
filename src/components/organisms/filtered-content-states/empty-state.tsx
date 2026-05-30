export function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
      <h2 className="text-h4 font-medium">Nenhum dado para exibir</h2>

      <p className="text-foreground-muted max-w-[360px] text-sm font-normal">
        Selecione um período e pelo menos um ativo para consultar os preços históricos.
      </p>
    </div>
  )
}
