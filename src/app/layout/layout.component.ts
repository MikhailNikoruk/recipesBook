import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-shell">
      <app-header />
      <main class="app-shell__main">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
  styles: [
    `
      .app-shell {
        min-height: 100vh;
        display: grid;
        grid-template-rows: auto 1fr auto;
      }

      .app-shell__main {
        padding: 1.25rem 1rem 3.5rem;
      }

      @media (max-width: 640px) {
        .app-shell__main {
          padding-inline: 0.85rem;
        }
      }
    `,
  ],
})
export class LayoutComponent {}
