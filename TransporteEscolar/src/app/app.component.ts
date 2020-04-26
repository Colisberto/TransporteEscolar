import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TransporteEscolar';

  toogleSideBar() {
    const classe: string = document.getElementById('sidebar').classList.value;
    if (classe === 'active') {
      document.getElementById('sidebar').classList.remove('active');
    } else {
      document.getElementById('sidebar').classList.add('active');
    }
  }

}

