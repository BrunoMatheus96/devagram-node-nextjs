// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default (
    req: NextApiRequest,
    res: NextApiResponse
    //Criação de função na linha 8
) => {
    //Tratativas de métodos
    if (req.method === 'POST') {
        const {login, senha} = req.body;

        if(login === 'admin@admin.com' && senha === 'Admin@123'){
            res.status(200).json({msg : 'Usuario autenticado com sucesso'});
        }
        return res.status(400).json({erro: 'Ususario ou senha invalidos. Tente novamente.'}); //Vai retornar se colocarem alguma informação de login e senha errada
    }
    return res.status(405).json({erro: 'O metodo informado não é valido'}); //Vai retornar o método 405 (solicitação de algo que não está permitido) se usarem outro método diferente de POST
}