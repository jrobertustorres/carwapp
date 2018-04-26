import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app/constants';
import { Storage } from '@ionic/storage';

//ENTITYS
// import { VeiculoEntity } from './../model/veiculo-entity';

@Injectable()
export class OrcamentoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });
//   private veiculoEntity: VeiculoEntity;
//   private modeloEntity: ModeloEntity;

  constructor(public _http: Http,
              private _storage: Storage) {
  }

  public lancarOrcamentoServico(veiculoEntity) {
    try {

      return new Promise((resolve, reject) => {
        this._storage.get(Constants.TOKEN_USUARIO).then((tokenUsuario) => {
          this._http.post(Constants.API_URL + 'lancarOrcamentoServico/'
            + tokenUsuario, JSON.stringify(veiculoEntity), this.options)
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