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
  templateUrl: './app.component.html',
  styles: [`
    .form-input {
      width: 100%;
      padding: 1rem;
      border: 1px solid var(--border);
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 500;
      outline: none;
      transition: all 0.2s;
      background: #f8fafc;
      color: var(--text-main);
    }
    .form-input:focus { 
      border-color: var(--primary-accent); 
      box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
      background: white;
    }
    .module-card:hover { border-color: var(--primary-accent); }
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
