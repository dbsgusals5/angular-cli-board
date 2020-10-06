import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './board/registration/registration.component';
import { SerachDeleteComponent } from './board/serach-delete/serach-delete.component';
import { LoginComponent } from './users/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from './auth.guard';
import { PostViewComponent } from './board/detail/post-view.component';
import { PostModifyComponent } from './board/modify/post-modify.component';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { CommentComponent } from './board/comment/comment.component';
const routes: Routes = [
   {path:"",component:HomeComponent},
   {path:"register",component:RegistrationComponent, canActivate:[AuthGuard]},
   {path:"search",component:SerachDeleteComponent, canActivate:[AuthGuard]},
   {path:"signin", component:LoginComponent},
   {path:"app", component:AppComponent},
   {path:"board/post/:postId", component:PostViewComponent, canActivate:[AuthGuard]},
   {path:"board/post/modify/:postId", component:PostModifyComponent, canActivate:[AuthGuard]},
   {path:"user/register", component:UserRegisterComponent},
   {path:"comment/:bno", component:CommentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
