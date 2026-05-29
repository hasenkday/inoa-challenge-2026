export const messages = {
  /**
   * This API response messages
   */
  stocks: {
    retrieved: 'Histórico de preços carregado com sucesso.',
    empty: 'Nenhum dado encontrado para o período informado.',
    notFound: (ticker: string) => `Ativo ${ticker} não encontrado.`,
  },

  /**
   * Brapi response messages
   */
  brapi: {
    failed: 'Falha ao adquirir histórico de preços dos ativos.',
  },
} as const
