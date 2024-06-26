import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DlRootModule } from '../../projects/core/src/lib/components/root/dl-root.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DlRootModule, NavigationComponent, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit() {}
}
