import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next"; // Request, Response e Handler padrão do Next
//import { politicaCORS } from "@/middlewares/politicaCORS"; // Importando o middleware de CORS que criamos
import { validarTokenJWT } from "@/middlewares/validarTokenJWT"; // Importando o middleware de validação do token JWT criado
import { conectarMongoDB } from "@/middlewares/conectarMongoDB"; // Importando o middleware de conexão com DB que foi criado
import type { RespostaPadraoMsg } from "@/types/RespostaPadraoMsg"; // Importando o tipo de resposta padrão que criamos
import { PublicacaoModel } from "@/models/PublicacaoModel"; // Importando o model da Publicação
import { UsuarioModel } from "../../models/UsuarioModel"; // Importando o model do Usuário
//import { NotificacaoModel } from "@/models/NotificacaoModel";


const likeEndpoint = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {
    try {

    } catch (e) { // Caso encontre algum erro imprime o erro no console
        console.log(e);
        return res.status(500).json({ erro: 'Ocorreu um erro para curtir/decurtir uma publicação' + e })
    }
}

export default (validarTokenJWT(conectarMongoDB(likeEndpoint))); // Exporta o endpoint de like passando pelos middlewares necessários