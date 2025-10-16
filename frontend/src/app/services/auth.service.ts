import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { User } from "../../core/models/user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private backendUrl = 'http://localhost:8080/api';
    private readonly TOKEN_KEY = 'auth_token';

    constructor(private http: HttpClient) {}

    register(userData: any): Observable<any> {
        const url = `${this.backendUrl}/auth/registrar`;
        return this.http.post<any>(url, userData);
    }

    login(credentials: any): Observable<{ access: string, refresh: string }> {
        const url = `${this.backendUrl}/auth/login`;
        return this.http.post<{access: string, refresh: string}>(url, credentials).pipe(
            tap(response => {
                this.setToken(response.access);
            })
        );
    }

    private setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    isLoggedIn(): boolean {
        return this.getToken() !== null;
    }
        
}