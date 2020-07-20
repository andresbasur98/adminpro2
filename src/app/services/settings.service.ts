import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
 
  public linkTheme = document.querySelector('#theme');

  constructor() { 
    let theme = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css'; // Cargar el theme escodido en el account-settings
    this.linkTheme.setAttribute('href',theme);
  }

  changeTheme( theme: string){
    const url = `./assets/css/colors/${theme}.css`;

    this.linkTheme.setAttribute('href', url); //Cambiar el href
    localStorage.setItem('theme', url); //Guardar la configuración en el local storage para permanecer la información
 
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){

     const links = document.querySelectorAll('.selector');

      links.forEach( elem =>{
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if( btnThemeUrl == currentTheme){
        elem.classList.add('working');
      }
      
    })
  }
}
