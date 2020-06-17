import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppState } from "../app.reducer";
import { Store } from "@ngrx/store";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";
import { IngresoEgresoService } from "../services/ingreso-egreso.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubs: Subscription;
  constructor(
    private store: Store<AppState>,
    private _ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.userSubs = this.store
      .select("user")
      .pipe(filter((auth) => auth.user != null))
      .subscribe(({ user }) => {
        this._ingresoEgresoService.initIngresosEgresosListener(user.uid);
      });
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }
}
