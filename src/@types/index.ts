import { User as RawUser } from '@prisma/client';

export type User = Omit<RawUser, 'password'>;

export enum ClimatesTypes {
  Tropical = 'Tropical',
  Seco = 'Seco',
  Semiárido = 'Semiárido',
  Temperado = 'Temperado',
  Frio = 'Frio',
  Mediterrâneo = 'Mediterrâneo',
  Montanha = 'Montanha',
}

export enum BiomeTypes {
  'Amazônia' = 'Amazônia',
  'Cerrado' = 'Cerrado',
  'Mata Atlântica' = 'Mata Atlântica',
  'Caatinga' = 'Caatinga',
  'Pampa' = 'Pampa',
  'Pantanal' = 'Pantanal',
  'Floresta Tropical' = 'Floresta Tropical',
  'Savanas' = 'Savanas',
  'Desertos' = 'Desertos',
  'Floresta Temperada' = 'Floresta Temperada',
  'Pradarias' = 'Pradarias',
  'Taiga' = 'Taiga',
  'Tundra' = 'Tundra',
  'Floresta Mediterrânea' = 'Floresta Mediterrânea',
  'Biomas de Montanha' = 'Biomas de Montanha',
  'Outro' = 'Outro',
}
