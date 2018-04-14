import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Constants } from '../app/constants';

//ENTITYS
import { VeiculoEntity } from './../model/veiculo-entity';

@Injectable()
export class VeiculoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });
  private veiculoEntity: VeiculoEntity;

  constructor(public _http: Http) {
  }

  public adicionaVeiculo(veiculoEntity) {
    try {

    //   this.veiculoEntity = new VeiculoEntity();

      return new Promise((resolve, reject) => {

        this._http.post(Constants.API_URL + 'adicionaVeiculo/', JSON.stringify(veiculoEntity), this.options)
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
    public findVeiculosCliente(veiculoEntity) {
        try {
    
          return new Promise((resolve, reject) => {
            this._http.post(Constants.API_URL  + 'findVeiculosCliente/' +
              localStorage.getItem(Constants.TOKEN_USUARIO),
              JSON.stringify(veiculoEntity), this.options)
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

  public getDadosVeiculo() {
      try {
  
        return this._http.post(Constants.API_URL + 'findDadosUsuario/'
          + localStorage.getItem(Constants.TOKEN_USUARIO), this.options)
          .map(res => res.json())
          .toPromise()
          .catch();
  
      } catch (e){
        if(e instanceof RangeError){
          console.log('out of range');
        }
      }
    }

    public atualizaVeiculo(veiculoEntity) {
        try {
    
        //   this.veiculoEntity = new VeiculoEntity();
    
          return new Promise((resolve, reject) => {
            this._http.post(Constants.API_URL + 'editaUsuario/'+
            localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(veiculoEntity), this.options)
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