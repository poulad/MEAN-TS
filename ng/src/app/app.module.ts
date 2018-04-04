import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {FooService} from './services/foo.service';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
import {FoosComponent} from './components/foos/foos.component';
import {AddFooComponent} from './components/foos/add-foo/add-foo.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'foos', component: FoosComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        FoosComponent,
        AddFooComponent,
        NotFoundComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot(routes),
        NgbModule.forRoot(),
    ],
    providers: [
        FooService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
