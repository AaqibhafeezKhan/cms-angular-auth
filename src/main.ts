import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

let platformRef: any = null;

export async function bootstrap(): Promise<void> {
  // nothing to do pre-bootstrap
}

export async function mount(props: any): Promise<void> {
  const container: HTMLElement =
    props.domElement ||
    document.getElementById('single-spa-container') ||
    document.body;

  const mountPoint = document.createElement('div');
  mountPoint.id = 'angular-auth-root';
  container.appendChild(mountPoint);

  platformRef = await platformBrowserDynamic().bootstrapModule(AppModule);
}

export async function unmount(): Promise<void> {
  if (platformRef) {
    platformRef.destroy();
    platformRef = null;
  }

  const el = document.getElementById('angular-auth-root');
  if (el) el.remove();
}
