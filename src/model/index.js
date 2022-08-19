import axios from 'axios';
import { atom, selector } from 'recoil';

export const avatarIdAtom = atom({
  key: 'avatarId',
  default: 0,
});

export const avatarUriState = selector({
  key: 'avatarUri',
  get: ({ get }) => {
    return `https://avatars.dicebear.com/api/human/${get(avatarIdAtom)}.jpg`;
  },
});

export const coinSymbolAtom = atom({
  key: 'coinSymbol',
  default: '',
});

export const coinPriceQuery = selector({
  key: 'coinPrice',
  get: async ({ get }) => {
    const sym = get(coinSymbolAtom);
    if (!sym) return -1;

    const res = await axios('https://api.binance.com/api/v3/avgPrice?symbol=' + sym);
    return res.data.price;
  },
});
