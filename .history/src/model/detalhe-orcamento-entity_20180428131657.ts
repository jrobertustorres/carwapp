export class DetalheOrcamentoEntity {

  public idOrcamento: number;
  public idVeiculo: number;
  public placaVeiculo: string;
  public descricao: string;
  public dataOrcamento: string;
  public statusOrcamentoEnum: string;
  public listServicoOrcamento: ServicoOrcamentoEntity[] = [];

	private List<DetalheServicoOrcamentoEntity> listDetalheServicoOrcamentoEntity;

  constructor(){
  }
    
}