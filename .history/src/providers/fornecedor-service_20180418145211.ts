import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app/constants';
import { Storage } from '@ionic/storage';

//ENTITYS
import { FornecedorEntity } from '../model/fornecedor-entity';


@Injectable()
export class FornecedorService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });
  // private fornecedorEntity: FornecedorEntity;

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

    public findFornecedorPorRaio(idServico) {
        try {
            this.fornecedorEntity = new FornecedorEntity();
            this.fornecedorEntity.idServico = idServico;
            this.fornecedorEntity.latitude = -18.9157878;
            this.fornecedorEntity.longitude = -48.2893467;

            return new Promise((resolve, reject) => {
              this._storage.get(Constants.TOKEN_USUARIO).then((tokenUsuario) => {
                this._http.post(Constants.API_URL + 'findFornecedorPorRaio/'
                  + tokenUsuario, JSON.stringify(this.fornecedorEntity), this.options)
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

    public findDadosFornecedor (idFornecedor) {
        try {
            // this.fornecedorEntity = new FornecedorEntity();
            // this.fornecedorEntity.idFornecedor = idFornecedor;

            // console.log(this.fornecedorEntity);

            return new Promise((resolve, reject) => {
              this._storage.get(Constants.TOKEN_USUARIO).then((tokenUsuario) => {
                this._http.post(Constants.API_URL + 'findDadosFornecedor /'
                  + tokenUsuario, JSON.stringify(this.fornecedorEntity), this.options)
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