import {
  Activity,
  BadgeCheck,
  Bell,
  Building2,
  ClipboardList,
  Clock,
  LayoutDashboard,
  Plus,
  ScrollText,
  Settings,
  ShieldAlert,
  Users,
} from 'lucide-react'

// Sidebar menu for each role.
// An item with no "path" is the dashboard home for that role.
export const navigation = {
  employee: [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'New Issue', path: 'new-issue', icon: Plus },
    { label: 'My Issues', path: 'issues', icon: ClipboardList },
    { label: 'Verifications', path: 'verifications', icon: BadgeCheck },
  ],
  agent: [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Assigned Issues', path: 'issues', icon: ClipboardList },
    { label: 'Deadlines', path: 'deadlines', icon: Clock },
    { label: 'Performance', path: 'performance', icon: Activity },
  ],
  manager: [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Assign Issues', path: 'assign', icon: Users },
    { label: 'SLA Breaches', path: 'breaches', icon: ShieldAlert },
    { label: 'Escalations', path: 'escalations', icon: Bell },
    { label: 'Analytics', path: 'analytics', icon: Activity },
  ],
  admin: [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Users', path: 'users', icon: Users },
    { label: 'Departments', path: 'departments', icon: Building2 },
    { label: 'SLA Rules', path: 'sla-rules', icon: Clock },
    { label: 'Reports', path: 'reports', icon: Activity },
    { label: 'Audit Logs', path: 'audit-logs', icon: ScrollText },
    { label: 'Settings', path: 'settings', icon: Settings },
  ],
}

// Sample people shown in the top bar. Real users come from the backend later.
export const roleProfiles = {
  employee: { label: 'Employee', name: 'Aarav Mehta', initials: 'AM' },
  agent: { label: 'Support Agent', name: 'Priya Nair', initials: 'PN' },
  manager: { label: 'Manager', name: 'Rohan Iyer', initials: 'RI' },
  admin: { label: 'Administrator', name: 'Sana Kapoor', initials: 'SK' },
}