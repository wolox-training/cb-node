import { Response, NextFunction, Request } from 'express';
import { Hearthstone, getAllCards, getInfo, Info } from '../services/cards';

export function findCards(_: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return getAllCards()
    .then((cards: Hearthstone[]) => res.send(cards))
    .catch(next);
}

export function findInfoAPI(_: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return getInfo()
    .then((info: Info) => res.send(info))
    .catch(next);
}
