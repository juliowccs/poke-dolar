"use client"
import { Pokemon, Usdbrl } from '@/@types';
import { pokeApi, priceApi } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { CircleDollarSign, Sun, Moon } from 'lucide-react';
 
 const getUSD_BRL = async (): Promise<Usdbrl> => {
   const response = await priceApi.get("/last/USD-BRL");
   return response.data.USDBRL;
 }

 const getPokemonById = async (id: number): Promise<Pokemon> => {
   const response = await pokeApi.get(`/pokemon/${id}`);
   return response.data;
 };

export default function PokeDolar() {
 const { data: usdBrl, isLoading: isLoadingUsdBrl, error: errorUsdBrl } = useQuery({queryKey: ['usdBrl'], queryFn: getUSD_BRL})

 const dolarPriceInt = usdBrl?.bid ? parseInt(usdBrl.bid.replace('.', '').substring(0, 3)) : 1

 const { data: pokemon, isLoading: isLoadingPokemon, error: errorPokemon } = useQuery({queryKey: ['pokemon', dolarPriceInt], queryFn: () => getPokemonById(dolarPriceInt)})

 const toggleTheme = () => {
   document.documentElement.classList.toggle('dark')
 }

 const typeTranslations: { [key: string]: string } = {
   normal: 'Normal',
   fire: 'Fogo',
   water: 'Água',
   electric: 'Elétrico',
   grass: 'Planta',
   ice: 'Gelo',
   fighting: 'Lutador',
   poison: 'Veneno',
   ground: 'Terra',
   flying: 'Voador',
   psychic: 'Psíquico',
   bug: 'Inseto',
   rock: 'Pedra',
   ghost: 'Fantasma',
   dragon: 'Dragão',
   dark: 'Sombrio',
   steel: 'Aço',
   fairy: 'Fada',
 }

 const statTranslations: { [key: string]: string } = {
   hp: 'HP',
   attack: 'Ataque',
   defense: 'Defesa',
   'special-attack': 'At. Esp.',
   'special-defense': 'Def. Esp.',
   speed: 'Velocidade',
 }

 const formatCurrency = (value: string) => {
   return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
 }
  
 const getTypeColor = (type: string) => {
   const colors: { [key: string]: string } = {
     normal: 'bg-gray-400',
     fire: 'bg-red-500',
     water: 'bg-blue-500',
     electric: 'bg-yellow-400',
     grass: 'bg-green-500',
     ice: 'bg-blue-300',
     fighting: 'bg-red-700',
     poison: 'bg-purple-500',
     ground: 'bg-yellow-600',
     flying: 'bg-indigo-400',
     psychic: 'bg-pink-500',
     bug: 'bg-green-400',
     rock: 'bg-yellow-800',
     ghost: 'bg-purple-700',
     dragon: 'bg-indigo-700',
     dark: 'bg-gray-800',
     steel: 'bg-gray-500',
     fairy: 'bg-pink-300',
   }
   return colors[type] || 'bg-gray-400'
 }

  if (isLoadingUsdBrl || isLoadingPokemon) {
   return (
     <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
       <div className="flex flex-col items-center space-y-4">
         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 dark:border-blue-400"></div>
         <p className="text-lg font-medium text-gray-700 dark:text-gray-200">Carregando dados do dólar e Pokémon...</p>
       </div>
     </div>
   )
 }

 if (errorUsdBrl) return (
   <div className="min-h-screen w-full bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 flex items-center justify-center">
     <div className="text-center">
       <p className="text-xl font-semibold text-red-600 dark:text-red-400">Erro ao carregar cotação: {errorUsdBrl.message}</p>
     </div>
   </div>
 )
 
 if (errorPokemon) return (
   <div className="min-h-screen w-full bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 flex items-center justify-center">
     <div className="text-center">
       <p className="text-xl font-semibold text-red-600 dark:text-red-400">Erro ao carregar Pokémon: {errorPokemon.message}</p>
     </div>
   </div>
 )

 if (!usdBrl?.bid) return (
   <div className="min-h-screen w-full bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 flex items-center justify-center">
     <div className="text-center">
       <p className="text-xl font-semibold text-yellow-600 dark:text-yellow-400">Cotação não disponível</p>
     </div>
   </div>
 )

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center py-8 relative">
          <button
            onClick={toggleTheme}
            className="absolute top-4 right-4 p-3 rounded-full bg-white hover:bg-gray-50 text-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-yellow-400 shadow-lg transition-all duration-300 hover:scale-105"
            aria-label="Alternar tema"
          >
            <Sun className="h-6 w-6 dark:hidden" />
            <Moon className="h-6 w-6 hidden dark:block" />
          </button>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
            PokéDólar
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Descubra seu Pokémon baseado na cotação do dólar!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/80 dark:bg-gray-800/80 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl transition-colors duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <CircleDollarSign className="text-green-600 dark:text-green-400 h-9 w-9" />
              </div>
              <CardTitle className="text-2xl text-green-600 dark:text-green-400">Cotação USD/BRL</CardTitle>
              <CardDescription className="dark:text-gray-300">Valor atual do dólar americano</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(usdBrl.bid)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Variação: {usdBrl.varBid} ({usdBrl.pctChange}%)
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-green-50 dark:bg-green-900/50 p-3 rounded-lg">
                  <p className="font-medium text-green-700 dark:text-green-400">Máxima</p>
                  <p className="text-green-600 dark:text-green-300">{formatCurrency(usdBrl.high)}</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/50 p-3 rounded-lg">
                  <p className="font-medium text-red-700 dark:text-red-400">Mínima</p>
                  <p className="text-red-600 dark:text-red-300">{formatCurrency(usdBrl.low)}</p>
                </div>
              </div>
              <div className="text-center bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  ID do Pokémon: <span className="font-bold">#{dolarPriceInt}</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 dark:border-gray-700 backdrop-blur-sm border-0 shadow-xl transition-colors duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Image 
                  src={pokemon?.sprites?.other?.['official-artwork']?.front_default || pokemon?.sprites.front_default || "/file.svg"} 
                  alt={pokemon?.name || "Pokémon"} 
                  width={120} 
                  height={120}
                  className="mx-auto drop-shadow-lg"
                />
              </div>
              <CardTitle className="text-2xl capitalize text-gray-800 dark:text-gray-100">
                {pokemon?.name} #{pokemon?.id}
              </CardTitle>
              <CardDescription className="dark:text-gray-300">
                Altura: {pokemon?.height ? (pokemon.height / 10).toFixed(1) : 0}m | 
                Peso: {pokemon?.weight ? (pokemon.weight / 10).toFixed(1) : 0}kg
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center gap-2">
                {pokemon?.types?.map((type) => (
                  <span
                    key={type.type.name}
                    className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getTypeColor(type.type.name)}`}
                  >
                    {typeTranslations[type.type.name] || type.type.name}
                  </span>
                ))}
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700 dark:text-gray-200 text-center">Estatísticas Base</h4>
                {pokemon?.stats?.slice(0, 6).map((stat) => (
                  <div key={stat.stat.name} className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300 w-16">
                      {statTranslations[stat.stat.name] || stat.stat.name}
                    </span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-200 w-8">
                      {stat.base_stat}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/50 p-3 rounded-lg">
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Habilidades</h4>
                <div className="flex flex-wrap gap-1">
                  {pokemon?.abilities?.map((ability) => (
                    <span
                      key={ability.ability.name}
                      className={`px-2 py-1 rounded text-xs capitalize ${
                        ability.is_hidden 
                          ? 'bg-yellow-100 text-yellow-700 border border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-600' 
                          : 'bg-purple-100 text-purple-700 dark:bg-purple-800/50 dark:text-purple-300'
                      }`}
                    >
                      {ability.ability.name.replace('-', ' ')}
                      {ability.is_hidden && ' (oculta)'}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center py-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Atualizado em: {new Date(usdBrl.create_date).toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  )
}