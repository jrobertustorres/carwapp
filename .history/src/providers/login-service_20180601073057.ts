import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Constants } from '../app/constants';

//ENTITYS
import { UsuarioEntity } from '../model/usuario-entity';

@Injectable()
export class LoginService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });
  public userChangeEvent = new EventEmitter();
  public emailPessoaChangeEvent = new EventEmitter();
  private usuarioEntity: UsuarioEntity;

  constructor(public http: Http) {
  }

  public login(usuarioEntity) {
    try {
      
      this.usuarioEntity = new UsuarioEntity();
      this.usuarioEntity = usuarioEntity;
      this.usuarioEntity.tokenPush = localStorage.getItem(Constants.TOKEN_PUSH);
      this.usuarioEntity.versaoApp = localStorage.getItem(Constants.VERSION_NUMBER);
      // this.usuarioEntity.versaoApp = this.appVersion.getVersionNumber();
      
      return new Promise((resolve, reject) => {
        this.http.post(Constants.API_URL + 'loginCliente/', 
        JSON.stringify(this.usuarioEntity), this.options)
          .map(res=>res.json())
          .subscribe(data => {
            resolve(data);

            // this._storage.set(Constants.ID_USUARIO, data.idUsuario);
            // this._storage.set(Constants.TOKEN_USUARIO, data.token);
            // this._storage.set(Constants.NOME_PESSOA, data.nomePessoa);

            localStorage.setItem(Constants.TOKEN_USUARIO, data.token);
            localStorage.setItem(Constants.NOME_PESSOA, data.nomePessoa);
            localStorage.setItem(Constants.ID_USUARIO, data.idUsuario);

            this.userChangeEvent.emit(data.nomePessoa);
            this.emailPessoaChangeEvent.emit(data.email);

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

  public loginByIdService(usuarioEntity) {
    try {
      this.usuarioEntity = new UsuarioEntity();
      this.usuarioEntity = usuarioEntity;
      this.usuarioEntity.tokenPush = localStorage.getItem(Constants.TOKEN_PUSH);
      this.usuarioEntity.versaoApp = localStorage.getItem(Constants.VERSION_NUMBER);

      console.log(this.usuarioEntity);
      
      return new Promise((resolve, reject) => {
        this.http.post(Constants.API_URL + 'loginByIdCliente/', 
        JSON.stringify(usuarioEntity), this.options)
          .map(res=>res.json())
          .subscribe(data => {
            resolve(data);

            // this._storage.set(Constants.ID_USUARIO, data.idUsuario);
            // this._storage.set(Constants.TOKEN_USUARIO, data.token);
            // this._storage.set(Constants.NOME_PESSOA, data.nomePessoa);

            localStorage.setItem(Constants.TOKEN_USUARIO, data.token);
            localStorage.setItem(Constants.NOME_PESSOA, data.nomePessoa);
            localStorage.setItem(Constants.EMAIL_PESSOA, data.email);
            localStorage.setItem(Constants.ID_USUARIO, data.idUsuario);

            this.userChangeEvent.emit(data.nomePessoa);
            this.emailPessoaChangeEvent.emit(data.email);

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

