import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './board/registration/registration.component';
import { SerachDeleteComponent } from './board/serach-delete/serach-delete.component';
import { UserRegistationService } from './service/user-registation.service';
import { AuthService } from './service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './users/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './modules/material/material.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from './home.component';
import { AuthGuard } from './auth.guard';
import { PostViewComponent } from './board/detail/post-view.component';
import { PostModifyComponent } from './board/modify/post-modify.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {StylePaginatorDirective} from '../app/style-paginator.directive';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from '../app/CustomPaginator';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { CommentComponent } from './board/comment/comment.component';
import { CommentService } from './service/comment.service';
import { CommentDialogComponent } from './board/comment-dialog/comment-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    SerachDeleteComponent,
    LoginComponent,
    HomeComponent,
    PostViewComponent,
    PostModifyComponent,
    StylePaginatorDirective,
    UserRegisterComponent,
    CommentComponent,
    CommentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  exports: [
    ReactiveFormsModule
  ],
  providers: [UserRegistationService, AuthService, AuthGuard, CommentService, { provide: MatPaginatorIntl, useValue: CustomPaginator() } ],
  bootstrap: [AppComponent, ],
  entryComponents: [CommentDialogComponent]
})
export class AppModule { }
