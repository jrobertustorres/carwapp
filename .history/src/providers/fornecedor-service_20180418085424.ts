import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app/constants';
import { Storage } from '@ionic/storage';

//ENTITYS
import { ServicoEntity } from './../model/servico-entity';

@Injectable()
export class FornecedorService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });
//   private veiculoEntity: VeiculoEntity;
  private servicoEntity: ServicoEntity;

  constructor(public _http: Http,
              private _storage: Storage) {
  }

    // public findFornecedorPorRaio () {
    //     try {

    //       return new Promise((resolve, reject) => {
    //         this._storage.get(Constants.TOKEN_USUARIO).then((tokenUsuario) => {
    //           this._http.post(Constants.API_URL + 'findFornecedorPorRaio /'
    //             + tokenUsuario, this.options)
    //             .map(res=>res.json())
    //             .subscribe(data => {
    //               resolve(data);
    //             }, (err) => {
    //               // reject(err.json());
    //             });
    //         });
    //       });
    
    //     } catch (e){
    //       if(e instanceof RangeError){
    //         console.log('out of range');
    //       }
    //     }
    // }

    public findFornecedorPorRaio() {
        try {
            // this.servicoEntity = new ServicoEntity();
            // this.servicoEntity.idTipoServico = idTipoServico;

            // console.log(this.servicoEntity);

            return new Promise((resolve, reject) => {
              this._storage.get(Constants.TOKEN_USUARIO).then((tokenUsuario) => {
                this._http.post(Constants.API_URL + 'findFornecedorPorRaio/'
                  + tokenUsuario, JSON.stringify(this.servicoEntity), this.options)
                  .map(res=>res.json())
                  .subscribe(data => {
                    resolve(data);
                  }, (err) => {
                    // reject(err.json());
                  });
              });
            });
    
        } catch (e){
          if(e instanceof RangeError){
            console.log('out of range');
          }
        }
    }
}