import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app/constants';
// import { Storage } from '@ionic/storage';

//ENTITYS
// import { VeiculoEntity } from './../model/veiculo-entity';
// import { OrcamentoEntity } from '../model/orcamento-entity';

@Injectable()
export class OrcamentoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });
  // private orcamentoEntity: OrcamentoEntity;

  constructor(public _http: Http) {
  }

  public lancarOrcamentoServico(orcamentoEntity) {
    try {

      return new Promise((resolve, reject) => {
        // this._storage.get(Constants.TOKEN_USUARIO).then((tokenUsuario) => {
          this._http.post(Constants.API_URL + 'lancarOrcamentoServico/'
            + localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(orcamentoEntity), this.options)
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

  public findOrcamentoByCliente() {
    try {

        return new Promise((resolve, reject) => {
          // this._storage.get(Constants.TOKEN_USUARIO).then((tokenUsuario) => {
            this._http.post(Constants.API_URL + 'findOrcamentoByCliente/'
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

  public detalhaOrcamentoByCliente(idOrcamento) {
    try {

      return new Promise((resolve, reject) => {
        // this._storage.get(Constants.TOKEN_USUARIO).then((tokenUsuario) => {
          this._http.post(Constants.API_URL + 'detalhaOrcamentoByCliente/'
            + localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(idOrcamento), this.options)
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

  public detalhaCotacao(idCotacao) {
    try {

      console.log(idCotacao);

      return new Promise((resolve, reject) => {
        this._http.post(Constants.API_URL + 'detalhaCotacao/'
          + localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(idCotacao), this.options)
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

  public escolherCotacao(idCotacao) {
    try {

      return new Promise((resolve, reject) => {
        // this._storage.get(Constants.TOKEN_USUARIO).then((tokenUsuario) => {
          this._http.post(Constants.API_URL + 'escolherCotacao/'
            + localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(idCotacao), this.options)
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

  public findCotacoesRespondidas(idOrcamento) {
    try {

        return new Promise((resolve, reject) => {
          // this._storage.get(Constants.TOKEN_USUARIO).then((tokenUsuario) => {
            this._http.post(Constants.API_URL + 'findCotacoesRespondidas/'
              + localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(idOrcamento), this.options)
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

}