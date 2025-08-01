import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header-options-list',
  imports: [NgClass],
  templateUrl: './header-options-list.html',
  styleUrl: './header-options-list.scss'
})
export class HeaderOptionsList {
  isMessages = signal<boolean>(false);
  isNotifications = signal<boolean>(false);
  isProfileOpen = signal<boolean>(false);

  setMessages(value?: boolean){
    this.isMessages.set(value ?? !this.isMessages());
  }
  setNotification(value?: boolean){
    this.isNotifications.set(value ?? !this.isNotifications());
  }
  setProfileOpen(value?: boolean){
    this.isProfileOpen.set(value ?? !this.isProfileOpen());
  }
  toggleNotificationDropdown(){
    this.setNotification();
    this.setMessages(false);
    this.setProfileOpen(false);
  }
  toggleMessageDropdown(){
    this.setMessages();
    this.setNotification(false);
    this.setProfileOpen(false);
  }
  toggleProfileDropdown(){
    this.setProfileOpen();
    this.setNotification(false);
  }
  // toggleFullscreen(event: Event){
  //   event.preventDefault();
  //   const doc: any = document;

  //   if(!doc.fullscreenElement){
  //     doc.documentElement.requestFullscreen();
  //   }else{
  //     doc.exitFullscreen();
  //   }
  // }
  toggleFullscreen(){
    const doc: any = document;
    const docEl: any = document.documentElement;

    if(!doc.fullscreenElement &&
       !doc.webkitFullscreenElement &&
       !doc.mozFullScreenElement &&
       !doc.msFullScreenElement
    ){
      if(docEl.requestFullscreen){
        docEl.requestFullscreen();
      }else if(docEl.webkitFullscreenElement){
        docEl.webkitFullscreenElement
      }else if(docEl.mozFullScreenElement){
        docEl.mozFullScreenElement
      }else if(docEl.msFullScreenElement){
        docEl.msFullScreenElement
      }
      else{
        if(doc.exitFullscreen){
          doc.exitFullscreen();
        }else if (doc.webkitFullscreenElement){
          doc.webkitFullscreenElement();
        }else if (doc.mozFullScreenElement){
          doc.mozFullScreenElement();
        }else if (doc.msFullScreenElement){
          doc.msFullScreenElement();
        }
      }
    }
  }
}
