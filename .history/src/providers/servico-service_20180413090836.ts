import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app/constants';
import { Storage } from '@ionic/storage';

//ENTITYS
// import { VeiculoEntity } from './../model/veiculo-entity';
import { ModeloEntity } from '../model/modelo-entity';

@Injectable()
export class VeiculoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });
//   private veiculoEntity: VeiculoEntity;
  private modeloEntity: ModeloEntity;

  constructor(public _http: Http,
              private _storage: Storage) {
  }

  public adicionaVeiculo(veiculoEntity) {
    try {

      return new Promise((resolve, reject) => {

        this._http.post(Constants.API_URL + 'adicionaVeiculo/' +
        localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(veiculoEntity), this.options)
          .map(function (res) { return res.json(); })
          .subscribe(data => {
            resolve(data);
            // localStorage.setItem('idUsuarioLogado', data.idUsuario);
            // localStorage.setItem('nomePessoa', data.nomePessoa);
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

  // public findVeiculosCliente(cotacaoEntity: CotacaoEntity) {
    public findVeiculosCliente() {
        try {
    
          return new Promise((resolve, reject) => {
            this._http.post(Constants.API_URL  + 'findVeiculosCliente/' +
              localStorage.getItem(Constants.TOKEN_USUARIO), this.options)
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

    public findTipoVeiculo() {
        try {
    
          return new Promise((resolve, reject) => {
            this._http.post(Constants.API_URL  + 'findTipoVeiculo/' +
              localStorage.getItem(Constants.TOKEN_USUARIO), this.options)
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

    public findListMarcaVeiculo() {
        try {
    
          return new Promise((resolve, reject) => {
            this._http.post(Constants.API_URL  + 'findListMarcaVeiculo/' +
              localStorage.getItem(Constants.TOKEN_USUARIO), this.options)
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

    public findListModeloVeiculoByMarca(idMarca) {
        try {
            this.modeloEntity = new ModeloEntity();
            this.modeloEntity.idMarca = idMarca;
    
          return new Promise((resolve, reject) => {
            this._http.post(Constants.API_URL  + 'findListModeloVeiculo/'+
            localStorage.getItem(Constants.TOKEN_USUARIO) , JSON.stringify(this.modeloEntity), this.options)
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

    public detalheVeiculosCliente(idVeiculo) {
        try {
    
          return new Promise((resolve, reject) => {
            this._storage.get(Constants.TOKEN_USUARIO).then((tokenUsuario) => {
              this._http.post(Constants.API_URL + 'detalheVeiculosCliente/'
                + tokenUsuario, JSON.stringify(idVeiculo), this.options)
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

      public alteraVeiculo(veiculoEntity) {
        try {
    
            console.log(veiculoEntity);
            
            return new Promise((resolve, reject) => {
                this._storage.get(Constants.TOKEN_USUARIO).then((tokenUsuario) => {
                    console.log(tokenUsuario);
                  this._http.post(Constants.API_URL + 'alteraVeiculo/'
                  + tokenUsuario, JSON.stringify(veiculoEntity), this.options)
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

    // public alteraVeiculo(veiculoEntity) {
    //     try {

    //         console.log(veiculoEntity);
    
    //       return new Promise((resolve, reject) => {
    //         this._http.post(Constants.API_URL + 'alteraVeiculo/'+
    //         localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(veiculoEntity), this.options)
    //           .subscribe(data => {
    //             resolve(data);
    //           }, (err) => {
    //             reject(err.json());
    //           });
    //       });
    
    //     } catch (e){
    //       if(e instanceof RangeError){
    //         console.log('out of range');
    //       }
    //     }
    // }


}