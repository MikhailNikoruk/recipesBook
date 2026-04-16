import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from '../shared/components/app-header/app-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, AppHeaderComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-shell">
      <app-app-header />
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
        padding: 1rem 1rem 4rem;
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
