"use client"
import { priceApi } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export interface Usdbrl {
  code: string
  codein: string
  name: string
  high: string
  low: string
  varBid: string
  pctChange: string
  bid: string
  ask: string
  timestamp: string
  create_date: string
}

 const getUSD_BRL = async (): Promise<Usdbrl> => {
   const response = await priceApi.get("/last/USD-BRL");
   return response.data.USDBRL;
 }

export default function PokeDolar() {
 const { data: usdBrl, isLoading, error } = useQuery({queryKey: ['usdBrl'], queryFn: getUSD_BRL})

 if (isLoading) return <p>Carregando...</p>

 if (error) return <p>Erro: {error.message}</p>

 if (!usdBrl?.bid) return <p>Cotação não disponível</p>

  return (
    <div>
     <p>Preço do Dólar: {usdBrl && Number(usdBrl.bid).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
    </div>
  )
}