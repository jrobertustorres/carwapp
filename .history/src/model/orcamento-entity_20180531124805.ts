import { ServicoOrcamentoEntity } from '../model/servico-orcamento-entity';

export class OrcamentoEntity {

  public idOrcamento: number;
  public idCotacao: number;
  public idOrcamentoFormat: string;
  public descricao: string;
  public dataOrcamento: string;
  public statusOrcamentoEnum: string;
  public placaVeiculo: string;
  public dataSolicitacao: Date;
  
  public listServicoOrcamento: ServicoOrcamentoEntity[] = [];
  public listIdFornecedor: number[];
  public listIdVeiculo: number[];

  constructor(){
  }
    
}