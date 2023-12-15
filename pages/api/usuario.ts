import type { NextApiRequest, NextApiResponse } from 'next';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import { validarTokenJWT } from '../../middlewares/validarTokenJWT';
import { conectarMongoDB } from '../../middlewares/conectarMongoDB';
import { UsuarioModel } from '../../models/UsuarioModel';

const usuarioEndpoint = (req: NextApiRequest, res: NextApiResponse) => {

    return res.status(200).json('Usuario autenticado com sucesso');
}

export default validarTokenJWT(usuarioEndpoint);