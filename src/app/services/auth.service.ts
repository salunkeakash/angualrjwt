import { Injectable } from "@angular/core";

import { of, Observable } from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authenticated = false;
  expectedRole = "";
  role_id;
  islogin;
  returnUrl_;
  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.checkauth();
  }

  login(email, password) {
    let data = { email_address: email, password: password };
    return this.http.post("api/login", data).map((res: Response) => {
      // console.log(res.json());

      if (res.status == 200) {
        console.log(res.json());
        const token = res.json()["token"];
        localStorage.setItem("token", token);
      } else {
        return res.json();
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
}
