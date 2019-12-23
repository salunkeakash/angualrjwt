import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  RouteReuseStrategy,
  Router,
  ActivatedRoute
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private Auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  authenticated = false;
  role_id;
  islogin = false;
  returnUrl_;
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authenticated = this.Auth.authenticated;
    this.role_id = this.Auth.role_id;
    this.islogin = this.Auth.islogin;

    console.log(this.role_id);

    if (this.authenticated == true) {
      return true;
      // if (this.role_id == "1") {
      //   this.router.navigate(["/admin/"]);
      //   this.returnUrl_ = this.route.snapshot.queryParams["returnUrl"] || "/";
      //   return true;
      // } else if (this.role_id == "2") {
      //   this.router.navigate(["/payrolldash"]);
      //   this.returnUrl_ = this.route.snapshot.queryParams["returnUrl"] || "/";
      //   return true;
      // } else if (this.role_id == "3") {
      //   this.router.navigate(["/approverdash"]);
      //   this.returnUrl_ = this.route.snapshot.queryParams["returnUrl"] || "/";
      //   return true;
      // } else if (this.role_id == "4") {
      //   return true;
      //   this.router.navigateByUrl("/emp/");
      //   this.returnUrl_ = this.route.snapshot.queryParams["returnUrl"] || "/";
      // }
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
