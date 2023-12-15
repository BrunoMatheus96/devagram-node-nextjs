import type { NextApiRequest, NextApiResponse } from 'next';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import type { CadastroRequisicao } from '../../types/CadastroRequisicao';
import { UsuarioModel } from '../../models/UsuarioModel';
import { conectarMongoDB } from '../../middlewares/conectarMongoDB';
import md5 from 'md5';

const endpointCadastro = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {

    if (req.method === 'POST') {
            const usuario = req.body as CadastroRequisicao; /*A const "usuario" vai receber o payload da requisição e vai preencher esse payload com as variáveis de CadastroRequisição.ts*/

        //Se não informar o nome ou so uma letra
        if (!usuario.nome || usuario.nome.length < 2) {
            return res.status(400).json({ erro: 'Nome invalido. Tente novamente.' }); //Vai retornar se colocarem alguma informação de login e senha errada
        }
        if (!usuario.email || usuario.email.length < 5 || !usuario.email.includes('@') || !usuario.email.includes('.')) {
            return res.status(400).json({ erro: 'Email invalido. Tente novamente.' }); //Vai retornar se colocarem alguma informação de login e senha errada
        }
        if (!usuario.senha || usuario.senha.length < 4) {
            return res.status(400).json({ erro: 'Senha invalida. Tente novamente ou altere a mesma.' }); //Vai retornar se colocarem alguma informação de login e senha errada
        }

        //Validacao se ja existe usuario com o mesmo email
        const usuariosComMesmoEmail = await UsuarioModel.find({ email: usuario.email });
        if (usuariosComMesmoEmail && usuariosComMesmoEmail.length > 0) {
            return res.status(400).json({ erro: 'Ja existe uma conta com o email informado' });
        }

        //salvar no banco de dados
        const usuarioASerSalvo = {
            nome: usuario.nome,
            email: usuario.email,
            senha: md5(usuario.senha) //md5 é utilizado para criptografar informações. Nesse caso é a senha
        }
        await UsuarioModel.create(usuarioASerSalvo);
        return res.status(200).json({ msg: 'Usuario criado com sucesso' });
    }
    return res.status(405).json({ erro: 'O metodo informado não é valido' }); //Vai retornar o método 405 (solicitação de algo que não está permitido) se usarem outro método diferente de POST
}

export default conectarMongoDB(endpointCadastro);