import {Request, Response} from 'express';
import {WorkSession} from '../models/workSession';
import {User} from '../models/user';

export const startWorkSession = async (req: Request, res: Response) => {
    try {
        const {userId} = req.body;
        console.log(`Iniciando turno para o usuário com ID: ${userId}`);

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({message: 'Usuário não encontrado'});
        }

        const session = await WorkSession.create({userId, startTime: new Date()});
        res.status(201).json(session);
    } catch (error) {
        console.error(`Erro ao iniciar turno: ${(error as Error).message}`);
        res.status(500).json({message: 'Erro ao iniciar turno', error: (error as Error).message});
    }
};

export const endWorkSession = async (req: Request, res: Response) => {
    try {
        const {sessionId} = req.body;
        console.log(`Finalizando turno para a sessão com ID: ${sessionId}`);

        const session = await WorkSession.findByPk(sessionId);
        if (session) {
            session.endTime = new Date();
            await session.save();
            res.status(200).json(session);
        } else {
            res.status(404).json({message: 'Sessão não encontrada'});
        }
    } catch (error) {
        console.error(`Erro ao finalizar turno: ${(error as Error).message}`);
        res.status(500).json({message: 'Erro ao finalizar turno', error: (error as Error).message});
    }
};

export const getWorkSessions = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        console.log(`Obtendo sessões de trabalho para o usuário com ID: ${userId}`);

        const sessions = await WorkSession.findAll({where: {userId}});
        res.status(200).json(sessions);
    } catch (error) {
        console.error(`Erro ao obter sessões de trabalho: ${(error as Error).message}`);
        res.status(500).json({message: 'Erro ao obter sessões de trabalho', error: (error as Error).message});
    }
};
