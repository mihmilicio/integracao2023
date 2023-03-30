import { BaseResponse } from '../models/base_response.model';
import { URL_API_PRODUTO } from '../config/constants';
import axios from "axios";
import { Produto } from '../models/produto.model';

const api = axios.create({
  baseURL: URL_API_PRODUTO
});

export const getProdutoPorId = async (id: number) => {
  return api.get<BaseResponse<Produto>>(`produto/${id}`);
}
