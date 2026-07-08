import {Routes} from '@angular/router';
import {TermsComponent} from '@features/public/privacy/components/terms/terms.component';
import {PrivacyPolicyComponent} from '@features/public/privacy/components/privacy-policy/privacy-policy.component';

export const privacyRoutes: Routes = [
  {
    path: 'terms',
    component: TermsComponent,
    title: 'Xtraction | Terms & Conditions'
  },
  {
    path: 'privacy',
    component: PrivacyPolicyComponent,
    title: 'Xtraction | Privacy Policy'
  }
]
