import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CreateMugComponent} from "./components/create-mug/create-mug.component";
import {AdminComponent} from "./components/admin/admin.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
  },
  { path: 'createMug', component: CreateMugComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent},
  { path: 'admin/:password', component: AdminComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
