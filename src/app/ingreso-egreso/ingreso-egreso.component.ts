import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IngresoEgreso } from "../models/ingreso-egreso";
import { IngresoEgresoService } from "../services/ingreso-egreso.service";

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
    private _ingresoEgresoService: IngresoEgresoService
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
    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this._ingresoEgresoService.crearIngresoEgreso(ingresoEgreso);
    this.ingresoForm.reset();
  }
}
