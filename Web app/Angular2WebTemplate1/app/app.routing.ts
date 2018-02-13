import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard } from './dashboard/dashboard.component'
import { Register } from './register/register.component'
import { pincode } from './pincode/pincode.component'
import { Reset } from './reset/reset.component'
import { userWindow } from './userWindow/userWindow.component'
import { Contact } from './contact/contact.component'
import { Tests } from './tests/tests.component'




const appRoutes: Routes = [
    { path: ' ', component: Dashboard },

    { path: 'contact', component: Contact },

    { path: 'register', component: Register },

    { path: 'pincode', component: pincode },

    { path: 'Reset', component: Reset },

    { path: 'userWindow', component: userWindow },

    { path: 'tests', component: Tests },

    { path: ' ', redirectTo: ' /dashboard' },

    { path: '**', component: Dashboard }
];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);