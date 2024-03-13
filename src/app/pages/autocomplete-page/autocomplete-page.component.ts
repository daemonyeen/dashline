import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DlAutocompleteModule } from '../../../../projects/core/src/lib/components/autocomplete/dl-autocomplete.module';
import { DlFormsModule } from '../../../../projects/core/src/lib/components/form-field/dl-forms.module';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-autocomplete-page',
  standalone: true,
  imports: [DlAutocompleteModule, DlFormsModule, AsyncPipe],
  templateUrl: './autocomplete-page.component.html',
  styleUrl: './autocomplete-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompletePageComponent {
  readonly fruits = ['Apples', 'Oranges', 'Bananas', 'Peaches'];
  readonly query = signal('');
  readonly filteredFruits$ = toObservable(this.query).pipe(
    debounceTime(250),
    map(query => {
      if (query.length === 0) {
        return this.fruits;
      }

      return this.fruits.filter(fruit =>
        fruit.toLowerCase().includes(query.toLowerCase()),
      );
    }),
  );

  filter(event: Event | string | null) {
    if (!event) {
      return;
    }

    const query =
      typeof event === 'string'
        ? event
        : (event.target as HTMLInputElement).value;

    this.query.set(query);
  }

  format(fruit: string | null): string {
    if (!fruit) {
      return '';
    }

    return `My favorite fruit is ${fruit.toLowerCase()}`;
  }
}
