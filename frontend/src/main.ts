import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router'; // Importe o provideRouter
import { App } from './app/app';
import { routes } from './app/app.routes'; // Importe suas rotas
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));