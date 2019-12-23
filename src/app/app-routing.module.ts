import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./services/auth.guard";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "admin",
    pathMatch: "full"
  },
  {
    path: "admin",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./pages/admin/admin.module").then(m => m.AdminModule),
    data: { expectedRole: ["Administrator"] }
  },
  {
    path: "emp",
    canActivate: [AuthGuard],
    loadChildren: () => import("./pages/emp/emp.module").then(m => m.EmpModule),
    data: { expectedRole: ["Employee"] }
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      expectedRole: [
        "Administrator",
        "Back Office User",
        "Client User",
        "Employee"
      ]
    }
  },
  {
    path: "**",
    redirectTo: "others/404"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
