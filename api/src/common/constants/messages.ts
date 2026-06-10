export const messages = {
  /**
   * This API response messages
   */
  stocks: {
    retrieved: 'Histórico de preços carregado com sucesso.',
    partiallyRetrieved: 'Histórico carregado parcialmente. Alguns ativos não retornaram dados.',
    empty: 'Nenhum dado encontrado para os ativos e período informados.',
    notFound: (ticker: string) => `Ativo ${ticker} não encontrado ou sem dados no período.`,

    catalogRetrieved: 'Ativos encontrados com sucesso!',
    catalogEmpty: 'Nenhum ativo encontrado para a busca informada.',
  },

  /**
   * Brapi response messages
   */
  brapi: {
    failed: 'Falha ao adquirir histórico de preços dos ativos.',
    searchFailed: 'Falha ao buscar ativos disponíveis.',
  },
} as const
