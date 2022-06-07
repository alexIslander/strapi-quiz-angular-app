import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { TitleComponent } from './components/title/title.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './components/toast/toast.component';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent,
    TitleComponent,
    ToastComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    HeaderComponent,
    NotFoundComponent,
    TitleComponent,
    ToastComponent,
    MessageComponent
  ]
})
export class CoreModule { }
