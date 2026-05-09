import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  let cloned = req.clone({
    url: `${environment.baseUrl}${req.url}`
  });

  if (token !== null && token !== "undefined") {
    cloned = cloned.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(cloned);
};
