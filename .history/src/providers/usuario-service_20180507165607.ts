import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Constants } from '../app/constants';
import { Storage } from '@ionic/storage';

//ENTITYS
import { UsuarioEntity } from '../model/usuario-entity';

@Injectable()
export class UsuarioService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });
  private usuarioEntity: UsuarioEntity;
  public userChangeEvent = new EventEmitter();
  public emailPessoaChangeEvent = new EventEmitter();

  constructor(public _http: Http,
              private _storage: Storage) {
  }

  public cadastraUsuario(usuarioEntity) {
    try {

      this.usuarioEntity = new UsuarioEntity();

      return new Promise((resolve, reject) => {

        this._http.post(Constants.API_URL + 'adicionaUsuario/', JSON.stringify(usuarioEntity), this.options)
          .map(function (res) { return res.json(); })
          .subscribe(data => {
            resolve(data);
            // localStorage.setItem('idUsuarioLogado', data.idUsuario);
            // localStorage.setItem('nomePessoa', data.nomePessoa);

            this._storage.set(Constants.ID_USUARIO, data.idUsuario);
            this._storage.set(Constants.TOKEN_USUARIO, data.token);
            this._storage.set(Constants.NOME_PESSOA, data.nomePessoa);
            
            localStorage.setItem(Constants.ID_USUARIO, data.idUsuario);
            localStorage.setItem(Constants.TOKEN_USUARIO, data.token);
            localStorage.setItem(Constants.NOME_PESSOA, data.nomePessoa);

            // this.userChangeEvent.emit(data.nomePessoa);
            // this.emailPessoaChangeEvent.emit(data.email);
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

  public getDadosUsuario() {
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

    public atualizaUsuario(usuarioEntity) {
        try {
    
          this.usuarioEntity = new UsuarioEntity();
    
          return new Promise((resolve, reject) => {
            this._http.post(Constants.API_URL + 'editaUsuario/'+
            localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(usuarioEntity), this.options)
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

  public atualizaSenhaUsuario(usuarioEntity) {
      try {
  
        this.usuarioEntity = new UsuarioEntity();
  
        return new Promise((resolve, reject) => {
          this._http.post(Constants.API_URL + 'alteraSenhaUsuario/'+
          localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(usuarioEntity), this.options)
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

  public recuperasenhaService(usuarioEntity) {
    try {

      this.usuarioEntity = new UsuarioEntity();
      return new Promise((resolve, reject) => {
        this._http.post(Constants.API_URL + 'recuperaSenha/', JSON.stringify(usuarioEntity), this.options)
          .map(function (res) { return res.json(); })
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