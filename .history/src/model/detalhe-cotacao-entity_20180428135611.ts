export class DetalheCotacaoEntity {

  public idCotacao: number;
  public idFornecedor: number;
  public idVeiculo: number;
  public idOrcamento: number;
  public valorTotalFormat: string;
  public dataEntregaFormat: string;
  public validadeFormat: string;
  public tipoPagamento: string;
  public prazoPagamento: string;
  public observacao: string;
  public statusCotacaoEnum: string;

  constructor(){
  }
    
}