/*Pagina Schema que define a forma dos documentos dentro dessa coleção.*/
import mongoose, { Schema } from "mongoose";

//Usado na API de cadastro
const UsuarioSchema = new Schema({
    //Campo required informa se o campo é obrigatório ou não
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    avatar: { type: String, required: false },
    seguidores: { type: Number, default: 0 },
    seguindo: { type: Number, default: 0 },
    publicacoes: { type: Number, default: 0 },
});
 
export const UsuarioModel = (mongoose.models.usuarios ||
    mongoose.model('usuarios', UsuarioSchema));