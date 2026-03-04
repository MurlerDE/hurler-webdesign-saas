import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationItem, isAnchor, isRoute } from '@core/models/navigation.model';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input({ required: true }) item!: NavigationItem;

  /** Optional size variant */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** Optional visual variant */
  @Input() variant: 'primary' | 'ghost' | 'outline' = 'primary';

  /** Whether the button is disabled */
  @Input() disabled = false;

  isAnchorType = false;
  isRouteType = false;
  isExternalType = false;

  ngOnInit(): void {
    this.isAnchorType = isAnchor(this.item);
    this.isRouteType = isRoute(this.item);
    this.isExternalType = this.item.type === 'external';
  }

  /** Scroll to anchor target */
  scrollToAnchor(event: Event): void {
    event.preventDefault();
    const target = document.querySelector(this.item.target);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  get hostClasses(): string[] {
    return [
      'nav-btn',
      `nav-btn--${this.variant}`,
      `nav-btn--${this.size}`,
      this.disabled ? 'nav-btn--disabled' : '',
    ].filter(Boolean);
  }
}