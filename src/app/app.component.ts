import { Component } from '@angular/core';

interface Role {
  id: string;
  name: string;
  description: string;
  badge: string;
  count: number;
}

@Component({
  selector: 'app-root',
  template: `
    <div class="animate-in">
      <header style="margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2 class="vibrant-text" style="font-size: 2rem;">Auth &amp; Access Control</h2>
          <p style="color: var(--text-muted); margin-top: 0.25rem;">Identity management and role-based permissions · Angular 11</p>
        </div>
        <div style="display: flex; gap: 0.75rem;">
          <button class="glass-btn" [class.active]="view === 'login'" (click)="view = 'login'">🔐 Sign In</button>
          <button class="glass-btn" [class.active]="view === 'roles'" (click)="view = 'roles'">👥 Roles</button>
        </div>
      </header>

      <div *ngIf="view === 'login'" style="display: flex; align-items: flex-start; gap: 2rem; flex-wrap: wrap;">
        <div class="card" style="width: 100%; max-width: 440px; padding: 2.5rem;">
          <div style="text-align: center; margin-bottom: 2rem;">
            <div style="width: 60px; height: 60px; background: var(--primary); border-radius: 1rem; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 1.75rem; box-shadow: 0 0 24px rgba(99,102,241,0.4);">🔐</div>
            <h3 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 0.4rem;">Secure Access</h3>
            <p style="color: var(--text-muted); font-size: 0.875rem;">Sign in to the CMS platform</p>
          </div>

          <div *ngIf="loginError" style="background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.3); border-radius: 0.5rem; padding: 0.75rem 1rem; margin-bottom: 1.5rem; color: #f87171; font-size: 0.875rem;">
            ⚠ {{ loginError }}
          </div>

          <form (ngSubmit)="onLogin()" style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div>
              <label style="display: block; margin-bottom: 0.4rem; font-size: 0.875rem; font-weight: 600;">Email Address</label>
              <input type="email" [(ngModel)]="email" name="email" placeholder="admin@cms-ultra.com" required class="form-input">
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
                <label style="font-size: 0.875rem; font-weight: 600;">Password</label>
                <a href="#" style="color: var(--accent); font-size: 0.75rem; text-decoration: none;">Forgot password?</a>
              </div>
              <input type="password" [(ngModel)]="password" name="password" placeholder="••••••••" required class="form-input">
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" id="remember" [(ngModel)]="rememberMe" name="rememberMe" style="accent-color: var(--primary); width: 16px; height: 16px;">
              <label for="remember" style="font-size: 0.875rem; color: var(--text-muted);">Keep me signed in</label>
            </div>
            <button type="submit" class="glass-btn active" style="padding: 0.875rem; font-size: 1rem; justify-content: center; margin-top: 0.5rem; width: 100%;">
              {{ loading ? 'Signing in...' : 'Sign In to Dashboard →' }}
            </button>
          </form>

          <div *ngIf="loggedIn" style="margin-top: 1.5rem; padding: 1rem; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); border-radius: 0.5rem; color: #10b981; text-align: center; font-size: 0.875rem; font-weight: 600;">
            ✓ Signed in successfully as {{ email }}
          </div>
        </div>

        <div style="flex: 1; min-width: 260px; display: flex; flex-direction: column; gap: 1rem;">
          <div class="card" *ngFor="let info of infoCards" style="display: flex; align-items: center; gap: 1rem;">
            <div style="font-size: 1.5rem; flex-shrink: 0;">{{ info.icon }}</div>
            <div>
              <p style="font-weight: 600; font-size: 0.9rem;">{{ info.title }}</p>
              <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 0.15rem;">{{ info.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="view === 'roles'">
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.25rem;">
          <div class="card" *ngFor="let role of roles" style="display: flex; flex-direction: column; gap: 0.75rem; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; right: 0; width: 80px; height: 80px; border-radius: 0 1rem 0 80px; background: rgba(99,102,241,0.08);"></div>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="font-size: 1.5rem;">{{ role.badge }}</span>
              <div>
                <p style="font-weight: 700; font-size: 0.95rem;">{{ role.name }}</p>
                <p style="font-size: 0.7rem; color: var(--text-muted);">{{ role.count }} members</p>
              </div>
            </div>
            <p style="color: var(--text-muted); font-size: 0.8rem; line-height: 1.5;">{{ role.description }}</p>
            <button class="glass-btn" style="margin-top: auto; font-size: 0.8rem; padding: 0.4rem 0.75rem;">Manage →</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-input {
      width: 100%;
      padding: 0.75rem 1rem;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 0.5rem;
      color: #f8fafc;
      font-size: 0.95rem;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }
    .form-input:focus { border-color: #6366f1; }
  `]
})
export class AppComponent {
  view: 'login' | 'roles' = 'login';
  email = '';
  password = '';
  rememberMe = false;
  loading = false;
  loggedIn = false;
  loginError = '';

  roles: Role[] = [
    { id: 'admin', name: 'Administrator', description: 'Full access to all CMS modules including auth, editorial, media, and collaboration settings.', badge: '👑', count: 2 },
    { id: 'editor', name: 'Editor', description: 'Can create, edit and publish articles in the Editorial module. Read access to Media Library.', badge: '✏️', count: 8 },
    { id: 'contributor', name: 'Contributor', description: 'Can draft articles and upload media assets. Requires Editor approval before publishing.', badge: '📝', count: 15 },
    { id: 'viewer', name: 'Viewer', description: 'Read-only access across all modules. Cannot create or modify any content.', badge: '👁️', count: 24 },
  ];

  infoCards = [
    { icon: '🛡️', title: 'Enterprise Security', desc: 'Role-based access control with fine-grained permissions per module' },
    { icon: '🔑', title: 'SSO Ready', desc: 'Supports OAuth 2.0 and SAML for seamless enterprise integration' },
    { icon: '📊', title: 'Audit Logs', desc: 'Every action tracked with full audit trail for compliance' },
  ];

  onLogin(): void {
    this.loginError = '';
    if (!this.email || !this.password) {
      this.loginError = 'Please enter your email and password.';
      return;
    }
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.loggedIn = true;
    }, 1200);
  }
}
