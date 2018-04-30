import { ServicoOrcamentoEntity } from '../model/servico-orcamento-entity';

export class OrcamentoEntity {

  public idOrcamento: number;
  public idCotacao: number;
  public descricao: string;
  public dataOrcamento: string;
  public statusOrcamentoEnum: string;
  public listServicoOrcamento: ServicoOrcamentoEntity[] = [];
  public listIdFornecedor: number[];
  public listIdVeiculo: number[];

  constructor(){
  }
    
}