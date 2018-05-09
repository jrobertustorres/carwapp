import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app/constants';

//ENTITYS
// import { FornecedorEntity } from '../model/fornecedor-entity';


@Injectable()
export class FornecedorService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });
  // private fornecedorEntity: FornecedorEntity;

  constructor(public _http: Http) {
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

    public findFornecedorPorRaio(fornecedorEntity) {
        try {
            return new Promise((resolve, reject) => {
              
              // this._storage.get(Constants.TOKEN_USUARIO).then((tokenUsuario) => {
                this._http.post(Constants.API_URL + 'findFornecedorPorRaio/'
                  + localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(fornecedorEntity), this.options)
                  .map(res=>res.json())
                  .subscribe(data => {
                    resolve(data);
                  }, (err) => {
                  });
              // });
            });
    
        } catch (e){
          if(e instanceof RangeError){
            console.log('out of range');
          }
        }
    }

    public findDadosFornecedor (fornecedorEntity) {
        try {
            // this.fornecedorEntity = new FornecedorEntity();
            // this.fornecedorEntity.idFornecedor = idFornecedor;

            // console.log(this.fornecedorEntity);

            return new Promise((resolve, reject) => {
              // this._storage.get(Constants.TOKEN_USUARIO).then((tokenUsuario) => {
                this._http.post(Constants.API_URL + 'findDadosFornecedor /'
                  + localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(fornecedorEntity), this.options)
                  .map(res=>res.json())
                  .subscribe(data => {
                    resolve(data);
                  }, (err) => {
                    // reject(err.json());
                  });
              // });
            });
    
        } catch (e){
          if(e instanceof RangeError){
            console.log('out of range');
          }
        }
    }

    public imagemFornecedor(fornecedorEntity) {
      try {
          return new Promise((resolve, reject) => {
            // this._storage.get(Constants.TOKEN_USUARIO).then((tokenUsuario) => {
              this._http.post(Constants.API_URL + 'imagemFornecedor/'
                + localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(fornecedorEntity), this.options)
                .map(res=>res.json())
                .subscribe(data => {
                  resolve(data);
                }, (err) => {
                  // reject(err.json());
                });
            // });
          });
  
      } catch (e){
        if(e instanceof RangeError){
          console.log('out of range');
        }
      }
  }
}