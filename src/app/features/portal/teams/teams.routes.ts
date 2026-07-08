import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/guards/auth.guard';

export const teamRoutes: Routes = [
  {
    path: 'teams',
    loadComponent: () => import('@features/portal/user/components/dashboard-layout/dashboard-layout.component')
      .then(m => m.DashboardLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('@features/portal/teams/pages/teams-list/teams-list.component')
          .then(m => m.TeamsListComponent),
        title: 'My Teams - Xtraction'
      },
      {
        path: 'create',
        loadComponent: () => import('@features/portal/teams/pages/create-team/create-team.component')
          .then(m => m.CreateTeamComponent),
        title: 'Create Team - Xtraction'
      },
      {
        path: 'join/:token',
        loadComponent: () => import('@features/portal/teams/pages/join-team/join-team.component')
          .then(m => m.JoinTeamComponent),
        title: 'Join Team - Xtraction'
      },
      {
        path: ':teamId',
        loadComponent: () => import('@features/portal/teams/pages/team-dashboard/team-dashboard.component')
          .then(m => m.TeamDashboardComponent),
        title: 'Team Dashboard - Xtraction'
      },
      {
        path: ':teamId/members',
        loadComponent: () => import('@features/portal/teams/pages/team-members/team-members.component')
          .then(m => m.TeamMembersComponent),
        title: 'Team Members - Xtraction'
      },
      {
        path: ':teamId/invitations',
        loadComponent: () => import('@features/portal/teams/pages/team-invitations/team-invitations.component')
          .then(m => m.TeamInvitationsComponent),
        title: 'Team Invitations - Xtraction'
      },
      {
        path: ':teamId/settings',
        loadComponent: () => import('@features/portal/teams/pages/team-settings/team-settings.component')
          .then(m => m.TeamSettingsComponent),
        title: 'Team Settings - Xtraction'
      }
    ]
  }
];

