import { Response, Request } from 'express';

import { Container} from 'typedi';

import config from '../../config';

import IUserRepo from '@/repos/IRepos/IUserRepo';

import { UserMapper } from "../mappers/UserMapper";
import { IUserDTO } from '../dto/IUserDTO';


exports.getMe = async function(req: Request, res: Response) {

    // NB: a arquitetura ONION não está a ser seguida aqui

    const userRepo = Container.get(config.repos.user.name) as IUserRepo

    if( !req.token || req.token == undefined )
        return res.json( new Error("Token inexistente ou inválido")).status(401);

    const user = await userRepo.findById( req.token.id );
    if (!user)
        return res.json( new Error("Utilizador não registado")).status(401);

    const userDTO = UserMapper.toDTO( user ) as IUserDTO;
    return res.json( userDTO ).status(200);
}
