import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IngresoEgreso } from "../models/ingreso-egreso";
import { IngresoEgresoService } from "../services/ingreso-egreso.service";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import * as ui from "../shared/ui.actions";

@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styles: [],
})
export class IngresoEgresoComponent implements OnInit {
  ingresoForm: FormGroup;
  tipo: string = "ingreso";

  constructor(
    private fb: FormBuilder,
    private _ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      descripcion: ["", Validators.required],
      monto: ["", Validators.required],
    });
  }

  guardar() {
    if (this.ingresoForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());
    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this._ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        this.store.dispatch(ui.stopLoading());
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());
      });
  }
}
