import { Component, OnInit } from '@angular/core';

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
      <header style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--primary);">Identity & Access</h2>
        <p style="color: var(--text-muted); margin-top: 0.25rem; font-size: 0.9rem;">Enterprise-grade security and role management</p>
      </header>

      <div *ngIf="!currentUser" style="max-width: 400px; margin: 0 auto;">
        <div class="card" style="padding: 2.5rem; border: 1px solid var(--border); border-radius: var(--radius); background: white;">
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem; text-align: center;">Sign In</h3>
          
          <div *ngIf="loginError" style="background: #fee2e2; border: 1px solid #ef4444; border-radius: 4px; padding: 0.75rem; margin-bottom: 1.5rem; color: #b91c1c; font-size: 0.8rem;">
            {{ loginError }}
          </div>

          <form (ngSubmit)="onLogin()" style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Work Email</label>
              <input type="email" [(ngModel)]="email" name="email" placeholder="admin@pro-cms.com" required class="form-input">
            </div>
            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Password</label>
              <input type="password" [(ngModel)]="password" name="password" placeholder="••••••••" required class="form-input">
            </div>
            <button type="submit" class="glass-btn active" style="margin-top: 1rem; width: 100%; border: none; background: var(--primary-accent); color: white; padding: 0.75rem; border-radius: var(--radius); cursor: pointer; font-weight: 600;">
              {{ loading ? 'Verifying...' : 'Continue' }}
            </button>
          </form>
        </div>
      </div>

      <div *ngIf="currentUser" style="display: flex; flex-direction: column; gap: 2rem;">
        <div class="card" style="padding: 2rem; border: 1px solid var(--border); border-radius: var(--radius); background: #f8fafc; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 48px; height: 48px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700;">
              {{ currentUser.name[0] }}
            </div>
            <div>
              <p style="font-weight: 700; font-size: 1rem;">{{ currentUser.name }}</p>
              <p style="color: var(--text-muted); font-size: 0.8rem;">Active Session · {{ currentUser.role }}</p>
            </div>
          </div>
          <button (click)="onLogout()" style="background: white; border: 1px solid var(--border); padding: 0.5rem 1rem; border-radius: var(--radius); cursor: pointer; font-size: 0.8rem; font-weight: 600;">Sign Out</button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
          <div class="card" *ngFor="let role of roles" style="padding: 1.5rem; border: 1px solid var(--border); border-radius: var(--radius); background: white;">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
              <span style="font-size: 1.25rem;">{{ role.badge }}</span>
              <p style="font-weight: 700; font-size: 0.9rem;">{{ role.name }}</p>
            </div>
            <p style="color: var(--text-muted); font-size: 0.8rem; line-height: 1.6; margin-bottom: 1.5rem;">{{ role.description }}</p>
            <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">{{ role.count }} ACTIVE USERS</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s;
    }
    .form-input:focus { border-color: var(--primary-accent); }
    .card:hover { border-color: var(--primary-accent); }
  `]
})
export class AppComponent implements OnInit {
  currentUser: any = null;
  email = '';
  password = '';
  loading = false;
  loginError = '';

  roles: Role[] = [
    { id: 'admin', name: 'Administrator', description: 'Full access to all platform systems including security settings and user orchestration.', badge: '👑', count: 2 },
    { id: 'editor', name: 'Content Editor', description: 'Manage full editorial lifecycles and publish content to production targets.', badge: '✏️', count: 8 },
    { id: 'contributor', name: 'Contributor', description: 'Submit drafts and manage assigned media assets for editorial review.', badge: '📝', count: 15 },
  ];

  ngOnInit() {
    const session = localStorage.getItem('cms_session');
    if (session) {
      this.currentUser = JSON.parse(session);
    }
  }

  onLogin(): void {
    this.loginError = '';
    if (!this.email || !this.password) {
      this.loginError = 'Email and password are required.';
      return;
    }

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.currentUser = {
        id: 'user_1',
        name: 'Admin User',
        email: this.email,
        role: 'Administrator'
      };
      localStorage.setItem('cms_session', JSON.stringify(this.currentUser));
      window.dispatchEvent(new CustomEvent('cms:auth_change', { detail: this.currentUser }));
    }, 800);
  }

  onLogout(): void {
    this.currentUser = null;
    localStorage.removeItem('cms_session');
    window.dispatchEvent(new CustomEvent('cms:auth_change', { detail: null }));
  }
}
