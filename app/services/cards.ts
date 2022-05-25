import axios from 'axios';
import config from '../../config';

export const BASE_URL = config.hearthstone.baseURL as string;
const API_HOST = config.hearthstone.apiHost as string;
const API_KEY = config.hearthstone.apiKey as string;

const client = axios.create({
  baseURL: BASE_URL,
  responseType: 'json'
});


export interface Hearthstone {
  basic: Basic[];
  classic: Classic[];
}

export interface Basic {
  cardID: string;
  dbfID: string;
  name: string;
  cardSet: string;
  type: string;
  faction?: string;
  rarity?: string;
  cost: number;
  text: string;
  playerClass: string;
  locale: string;
}

export interface Classic {
  cardID: string;
  dbfID: string;
  name: string;
  cardSet: string;
  type: string;
  text: string;
  playerClass: string;
  locale: string;
  mechanics?: Mechanic[];
}

export interface Mechanic {
  name: string;
}


export interface Info {
  patch: string;
  classes: string[];
  sets: string[];
  standard: string[];
  wild: string[];
  types: string[];
  factions: string[];
  qualities: string[];
  races: string[];
  locales: Locales;
}

export interface Locales {
  deDe: string;
  enGB: string;
  enUs: string;
  esEs: string;
  esMX: string;
  frFr: string;
  itIt: string;
  koKr: string;
  plPl: string;
  ptBr: string;
  ruRu: string;
  zhCN: string;
  zhTw: string;
  jaJp: string;
  thTh: string;
}



export async function getAllCards(): Promise<Hearthstone[]> {
  const response = await client.get<Hearthstone[]>('cards', {
    headers: {
      'X-RapidAPI-Host': API_HOST,
      'X-RapidAPI-Key': API_KEY
    }
  });
  return response.data;
}

export async function getInfo(): Promise<Info> {
  const response = await client.get<Info>('info', {
    headers: {
      'X-RapidAPI-Host': API_HOST,
      'X-RapidAPI-Key': API_KEY
    }
  });
  return response.data;
}

export default {
  getAllCards,
  getInfo
};
