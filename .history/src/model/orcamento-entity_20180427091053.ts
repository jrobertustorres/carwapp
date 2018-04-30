import { ServicoOrcamentoEntity } from '../model/servico-orcamento-entity';

export class OrcamentoEntity {

  private idOrcamento: number;
  private descricao: string;
  private dataOrcamento: string;
  private statusOrcamentoEnum: string;

  public listServicoOrcamento: ServicoOrcamentoEntity[] = [];
  // public listIdVeiculo: number[];
  // public listIdFornecedor: number[];
  public listIdFornecedor: Array<Object> = [];
  public listIdVeiculo: Array<Object> = [];

  // private List<Long> listIdVeiculo;
	// private List<ServicoOrcamentoEntity> listServicoOrcamento;
	// private List<Long> listIdFornecedor;

  constructor(){
  }
    
}