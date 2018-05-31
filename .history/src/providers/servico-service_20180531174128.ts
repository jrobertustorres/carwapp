import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app/constants';

//ENTITYS
import { ServicoEntity } from './../model/servico-entity';

@Injectable()
export class ServicoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });
//   private veiculoEntity: VeiculoEntity;
  private servicoEntity: ServicoEntity;

  constructor(public _http: Http) {
  }


    public findTipoServico() {
        try {

          return new Promise((resolve, reject) => {
            // this._storage.get(Constants.TOKEN_USUARIO).then((tokenUsuario) => {
              this._http.post(Constants.API_URL + 'findTipoServico/'
                + localStorage.getItem(Constants.TOKEN_USUARIO), this.options)
                .map(res=>res.json())
                .subscribe(data => {
                  resolve(data);
                }, (err) => {
                  reject(err.json());
                });
            // });
          });
    
        } catch (e){
          if(e instanceof RangeError){
            console.log('out of range');
          }
        }
    }

    public findServicoByIdTipoServico(idTipoServico) {
        try {
            this.servicoEntity = new ServicoEntity();
            this.servicoEntity.idTipoServico = idTipoServico;

            return new Promise((resolve, reject) => {
              this._http.post(Constants.API_URL + 'findServico/'
                + localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(this.servicoEntity), this.options)
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