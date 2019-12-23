import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { RequestOptions, Headers, Http } from "@angular/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private Auth: AuthService,
    private http: Http,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkauth();
  }

  checkauth() {
    if (localStorage.getItem("token") != null) {
      let headers = new Headers();
      headers.append(
        "Authorization",
        "Bearer" + " " + localStorage.getItem("token")
      );
      let options = new RequestOptions({ headers: headers });
      return this.http.get("api/users", options).subscribe(data => {
        if (data.status == 200) {
          console.log(data.json()["role_id"]);
          this.Auth.role_id = data.json()["role_id"];
          this.Auth.authenticated = true;
          this.Auth.islogin = true;
          this.router.navigateByUrl("/");
        } else {
          this.router.navigateByUrl("/login");
          this.Auth.authenticated = false;
        }

        // console.log(data);
      });
    }
  }

  login() {
    const email = "Employee@corientbs.com";
    const password = "123";

    this.Auth.login(email, password).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl("/");
    });
  }
}
