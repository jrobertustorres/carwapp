export class CotacaoEntity {

  public idCotacao: number;
  public idFornecedor: number;
  public idVeiculo: number;
  public idOrcamento: number;
  public valorTotal: number;

  public dataEntregaFormat: string;
  public validadeFormat: string;
  public tipoPagamento: string;
  public prazoPagamento: string;
  public observacao: string;
  public statusCotacaoEnum: string;

  constructor(){
  }
    
}