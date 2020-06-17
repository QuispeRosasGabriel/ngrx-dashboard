import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import "firebase/firestore";
import { IngresoEgreso } from "../models/ingreso-egreso";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class IngresoEgresoService {
  constructor(
    private firestore: AngularFirestore,
    private _authService: AuthService
  ) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this._authService.user.uid;
    this.firestore
      .doc(`${uid}/ingresos-egresos`)
      .collection("items")
      .add({ ...ingresoEgreso })
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  }

  initIngresosEgresosListener(uid: string) {
    this.firestore
      .collection(`${uid}/ingresos-egresos/items`)
      .valueChanges()
      .subscribe((resp) => console.log(resp));
  }
}
