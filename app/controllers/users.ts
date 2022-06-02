import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { hash } from 'bcryptjs';
import userService from '../services/users';
import { User } from '../models/user';
import { notFoundError } from '../errors';
import logger from '../logger';

function validateEmail(email: string): boolean {
  const domains = '@gmail.com';
  const isValidDomain = email.includes(domains);
  return isValidDomain;
}

function validatePassword(password: string): boolean {
  const isValidDomain = password.length >= 8 ?? true;
  return isValidDomain;
}

export function getUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return userService
    .findAll()
    .then((users: User[]) => res.send(users.map((u: User) => ({ ...u, password: undefined }))))
    .catch(next);
}

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const data = { ...req.body } as User;
    if (!validateEmail(data.email)) {
      logger.error(`invalid email ${data.email}`);
      return res.status(HttpStatus.CONFLICT).send('Email not valid..!');
    }
    const exists = await userService.findUser({ email: data.email });
    if (typeof exists === 'undefined') {
      if (!validatePassword(data.password)) {
        logger.error('invalid password');
        return res.status(HttpStatus.CONFLICT).send('Password does not match..!');
      }
      data.password = await hash(data.password, 10);
      const user = await userService.createAndSave(data);
      logger.info(`user signup ${data.email}`);
      return res.status(HttpStatus.CREATED).send({ user: { ...user, password: undefined } });
    }
    logger.error(`Email duplicated ${data.email}`);
    return res.status(HttpStatus.CONFLICT).send('The email has already been used');
  } catch (error) {
    logger.error(error);
    return next(error);
  }
}

export function getUserById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return userService
    .findUser({ id: parseInt(req.params.id) })
    .then((user: User) => {
      if (!user) {
        throw notFoundError('User not found');
      }
      return res.send(user);
    })
    .catch(next);
}
