import { provideRouter, RouterConfig } from '@angular/router';
import { EmoteBuilderComponent } from './emote-builder/';

export const routes: RouterConfig = [
  { path: '', component: EmoteBuilderComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];