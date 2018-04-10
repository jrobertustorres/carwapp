export class UsuarioEntity {

  public idUsuario: number;
  public idPessoa: number;
  public idFornecedor: number;
  public idCliente: number;
  
  public nomePessoa: string;

  public idUsuarioFacebook: number;
  public email: string;
  public senha: string;
  public token: string;
  public tokenPush: string;
  // public statusAceitoTermoUso: boolean;
  public uuid: boolean;
  public versaoApp: number;

  public novaSenha: string;

  constructor(){
  }
}
