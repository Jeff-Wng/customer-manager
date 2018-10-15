import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { CustomersComponent } from './customers/customers.component';
import { AuthComponent } from './auth/auth.component';
import { ProductsComponent } from './products/products.component';

const appRoutes: Routes = [
    { path: '', component: CustomersComponent},
    { path: 'orders', component: OrdersComponent },
    { path: 'products', component: ProductsComponent},
    { path: 'auth', component: AuthComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    
}