import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  let cloned = req.clone({
    url: `http://localhost:8080${req.url}`
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
