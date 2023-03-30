import { Request, Response } from 'express';
import { Item } from '../models/item.model';
import { ItemRepository } from '../data/item.repository';
import crypto from 'crypto';
import { getProdutoPorId } from '../service/produto.service';

const repositoryItem = new ItemRepository();

export class ItemController {
  listar(request: Request, response: Response) {
    const itens = repositoryItem.listar();
    return response.status(200).json({
      message: 'ok',
      data: itens
    });
  }

  async cadastrar(request: Request, response: Response) {
    let { idProduto, quantidade, idCarrinho } = request.params;
    console.log(request.params);

    try {
      const produto = (await getProdutoPorId(Number.parseInt(idProduto))).data.data;
      console.debug(produto);

      if (!produto) {
        return response.status(404).json({ message: 'Produto não encontrado' });
      }

      if (!idCarrinho) {
        idCarrinho = crypto.randomUUID();
      }

      let item: Item = {
        produto: produto,
        quantidade: Number.parseInt(quantidade),
        carrinhoId: idCarrinho
      };

      item = repositoryItem.cadastrar(item);

      return response.status(201).json({
        message: 'Produto adicionado ao carrinho!',
        data: item
      });
    } catch (e) {
      console.error(e);
      response.status(404).json({ message: 'Produto não encontrado' });
    }
  }

  buscar(request: Request, response: Response) {
    const { id } = request.params;

    const itens = repositoryItem.buscar(id);

    return response.status(200).json({
      message: 'ok',
      data: itens
    });
  }
}
