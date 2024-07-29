import { Request, Response } from 'express';
import { WorkSession } from '../../models/workSession';

export const startWorkSession = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const session = await WorkSession.create({ userId, startTime: new Date() });
        res.status(201).json(session);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const endWorkSession = async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.body;
        const session = await WorkSession.findByPk(sessionId);
        if (session) {
            session.endTime = new Date();
            await session.save();
            res.status(200).json(session);
        } else {
            res.status(404).json({ message: 'Session not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getWorkSessions = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const sessions = await WorkSession.findAll({ where: { userId } });
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
