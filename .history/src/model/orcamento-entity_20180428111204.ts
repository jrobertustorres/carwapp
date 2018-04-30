import { ServicoOrcamentoEntity } from '../model/servico-orcamento-entity';

export class OrcamentoEntity {

  public idOrcamento: number;
  private descricao: string;
  private dataOrcamento: string;
  private statusOrcamentoEnum: string;

  public listServicoOrcamento: ServicoOrcamentoEntity[] = [];
  public listIdFornecedor: number[];
  public listIdVeiculo: number[];

  constructor(){
  }
    
}