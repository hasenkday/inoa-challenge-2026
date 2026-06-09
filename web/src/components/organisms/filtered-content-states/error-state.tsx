type ErrorStateProps = {
  message: string
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-3 text-center">
      <h2 className="text-error text-h4 font-medium">Erro ao carregar dados</h2>

      <p className="text-foreground-muted max-w-[420px] text-sm">{message}</p>
    </div>
  )
}
