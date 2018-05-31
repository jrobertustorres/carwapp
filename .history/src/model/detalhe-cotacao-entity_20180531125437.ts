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
  public descricaoCliente: string;
  public observacao: string;
  public statusCotacaoEnum: string;

  public placaVeiculo: string;
  public frotaVeiculo: string;
  public nomeMarcaVeiculo: string;
  public nomeModeloVeiculo: string;
  public corVeiculo: string;

  public nomeFornecedor: string;
  public enderecoFornecedorFormat: string;
  public telefoneFornecedor: string;
  public telefone2Fornecedor: string;
  public emailFornecedor: string;
  public siteFornecedor: string;
  public avaliacaoFornecedor: number;

  constructor(){
  }
    
}