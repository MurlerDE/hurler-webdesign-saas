# NavButtonComponent

Eine Angular Standalone-Komponente die ein `NavigationItem` rendert und je nach `NavigationType` automatisch den passenden Link-Typ erzeugt.

## Voraussetzungen

- Angular 17+
- `RouterModule` im Projekt eingebunden

## Dateien

```
button/
├── button.component.ts
├── button.component.html
└── button.component.scss
```

## Verwendung

Die Komponente ist standalone und wird direkt in den `imports` einer anderen Komponente oder eines Moduls eingebunden:

```typescript
import { NavButtonComponent } from './nav-button/nav-button.component';

@Component({
  standalone: true,
  imports: [NavButtonComponent],
  // ...
})
export class AppComponent {}
```

## Inputs

| Input     | Typ                                  | Pflicht | Default     | Beschreibung                        |
|-----------|--------------------------------------|---------|-------------|-------------------------------------|
| `item`    | `NavigationItem`                     | ✅      | —           | Das NavigationItem-Objekt           |
| `size`    | `'sm' \| 'md' \| 'lg'`              | ❌      | `'md'`      | Größe des Buttons                   |
| `variant` | `'primary' \| 'ghost' \| 'outline'` | ❌      | `'primary'` | Visueller Stil                      |
| `disabled`| `boolean`                            | ❌      | `false`     | Deaktiviert den Button              |

## NavigationItem

```typescript
export type NavigationType = "anchor" | "route" | "external";

export interface NavigationItem {
  readonly label: string;   // Anzeigetext
  readonly type: NavigationType;
  readonly target: string;  // Pfad, Anchor (#id) oder URL
  readonly icon?: string;   // Optionales Icon (z. B. Emoji oder Icon-String)
  readonly children?: NavigationItem[];
}
```

## Verhalten je NavigationType

| Typ        | Verhalten                                                      |
|------------|----------------------------------------------------------------|
| `route`    | Rendert `<a [routerLink]>` mit `routerLinkActive`             |
| `anchor`   | Rendert `<a href>` mit `scrollIntoView({ behavior: 'smooth'})` |
| `external` | Rendert `<a target="_blank" rel="noopener noreferrer">` mit `↗`|

## Beispiele

```html
<!-- Interner Routerlink -->
<app-nav-button
  [item]="{ label: 'Home', type: 'route', target: '/home' }"
/>

<!-- Anchor Scroll -->
<app-nav-button
  [item]="{ label: 'Über uns', type: 'anchor', target: '#about' }"
  variant="outline"
/>

<!-- Externer Link -->
<app-nav-button
  [item]="{ label: 'GitHub', type: 'external', target: 'https://github.com', icon: '🐙' }"
  variant="ghost"
  size="sm"
/>

<!-- Deaktiviert -->
<app-nav-button
  [item]="{ label: 'Gesperrt', type: 'route', target: '/admin' }"
  [disabled]="true"
/>
```

## Theming

Alle Farben und Abstände sind über CSS Custom Properties steuerbar. Überschreibe die Tokens global in deinem `styles.scss`:

```scss
:root {
  --btn-primary-bg:          #1a1a2e;
  --btn-primary-color:       #ffffff;
  --btn-primary-hover-bg:    #16213e;

  --btn-outline-border:      #1a1a2e;
  --btn-outline-color:       #1a1a2e;
  --btn-outline-hover-bg:    #1a1a2e;
  --btn-outline-hover-color: #ffffff;

  --btn-radius:              8px;
  --btn-font:                'Your Font', sans-serif;
}
```

## Accessibility

- Aktiver Routerlink erhält die Klasse `nav-btn--active`
- Deaktivierte Links erhalten `aria-disabled="true"`
- Externe Links sind mit `aria-label="Opens in new tab"` gekennzeichnet
- Focus-Styles über `:focus-visible` vorhanden