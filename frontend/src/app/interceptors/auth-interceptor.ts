import { HttpInterceptorFn } from '@angular/common/http';
import { Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = Inject(AuthService);
  const authToken = authService.getToken();

  if(authToken){
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    })

    return next(clonedReq);
  }
  return next(req);
};
