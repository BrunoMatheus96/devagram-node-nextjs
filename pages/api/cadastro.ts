import type { NextApiRequest, NextApiResponse } from 'next';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import type { CadastroRequisicao } from '../../types/CadastroRequisicao';

const endpointCadastro = (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {

    if (req.method === 'POST') {
        const usuario = req.body as CadastroRequisicao;

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
        return res.status(200).json({ msg: 'Dados corretos' });
    }
    return res.status(405).json({ erro: 'O metodo informado não é valido' }); //Vai retornar o método 405 (solicitação de algo que não está permitido) se usarem outro método diferente de POST
}

export default endpointCadastro;
