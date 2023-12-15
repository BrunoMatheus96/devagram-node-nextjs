// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { conectarMongoDB } from '../../middlewares/conectarMongoDB';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import type {LoginResposta} from '../../types/LoginResposta';
import md5 from 'md5';
import { UsuarioModel } from '../../models/UsuarioModel';
import jwt from 'jsonwebtoken';

const endpointLogin = async (
    req: NextApiRequest,
    res: NextApiResponse<RespostaPadraoMsg | LoginResposta>
    //Criação de função na linha 8
) => {

    //Token de segurança
    const { MINHA_CHAVE_JWT } = process.env;
    if (!MINHA_CHAVE_JWT) {
        return res.status(500).json({ erro: 'ENV Jwt nao informada' });
    }

    //Tratativas de métodos
    if (req.method === 'POST') {
        //Constantes resposáveis pelo payload do POST login
        const { login, senha } = req.body;

        //Constante responsável por verificar no banco se o email e a senha existem
        const usuariosEncontrados = await UsuarioModel.find({ email: login, senha: md5(senha) });

        //Nesse verificação o 'length' está verificando se tem pelo menos um login e senha
        if (usuariosEncontrados && usuariosEncontrados.length > 0) {
            //Constante vai receber o primeiro usuário da lista 
            const usuarioEncotrado = usuariosEncontrados[0]; // O [0] é para pegar o primeiro da lista

            //Criação do token de segurança na aplicação
            const token = jwt.sign({ _id: usuarioEncotrado._id }, MINHA_CHAVE_JWT);
            res.status(200).json({
                nome: usuarioEncotrado.nome,
                email: usuarioEncotrado.email,
                token
            });
        }
        return res.status(400).json({ erro: 'Usuario ou senha invalidos. Tente novamente.' }); //Vai retornar se colocarem alguma informação de login e senha errada
    }
    return res.status(405).json({ erro: 'O metodo informado não é valido' }); //Vai retornar o método 405 (solicitação de algo que não está permitido) se usarem outro método diferente de POST
}

/*Essa linha faz com que quando o if for chamado, ele primeiro
vai tentar se conectar ao banco de dados e depois executar o endpoint (if)*/
export default conectarMongoDB(endpointLogin);