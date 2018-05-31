import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app/constants';

//ENTITYS
// import { OrdemServicoEntity } from '../model/orderm-servico-entity';

@Injectable()
export class OrdemServicoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });
  // private ordemServicoEntity: OrdemServicoEntity;

  constructor(public _http: Http) {
  }

  public avaliacaoFornecedor(ordemServicoEntity) {
      try {
          return new Promise((resolve, reject) => {
            this._http.post(Constants.API_URL + 'avaliaOrdemServico/'
              + localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(ordemServicoEntity), this.options)
              .map(res=>res.json())
              .subscribe(data => {
                resolve(data);
              }, (err) => {
                reject(err.json());
              });
          });
  
      } catch (e){
        if(e instanceof RangeError){
          console.log('out of range');
        }
      }
  }

}