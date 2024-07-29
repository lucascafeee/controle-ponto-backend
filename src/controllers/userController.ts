import { Request, Response } from 'express';
import { User } from '../../models/user';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const user = await User.create({ name, email });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
