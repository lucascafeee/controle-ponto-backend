import {Request, Response} from 'express';
import {User} from '../models/user';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const {code} = req.body;
        console.log(`Tentando encontrar usuário com o código: ${code}`);

        let user = await User.findOne({where: {id: code}});

        if (!user) {
            console.log(`Usuário não encontrado, criando um novo usuário com o código: ${code}`);
            user = await User.create({id: code});
        } else {
            console.log(`Usuário encontrado: ${user.id}`);
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(`Erro ao fazer login: ${(error as Error).message}`);
        res.status(500).json({message: 'Erro ao fazer login', error: (error as Error).message});
    }
};
