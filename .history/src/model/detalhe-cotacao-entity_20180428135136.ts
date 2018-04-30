import { DetalheServicoOrcamentoEntity } from '../model/detalhe-servico-orcamento-entity';

export class DetalheCotacaoEntity {

  public idOrcamento: number;
  public idVeiculo: number;
  public placaVeiculo: string;
  public descricao: string;
  public dataOrcamento: string;
  public statusOrcamentoEnum: string;
  public listDetalheServicoOrcamentoEntity: DetalheServicoOrcamentoEntity[] = [];

  constructor(){
  }
    
}