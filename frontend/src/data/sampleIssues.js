// Sample data for building the screens. Real data will come from the Spring Boot API later.
const HOUR = 60 * 60 * 1000

// Returns an ISO date string for "now plus N hours" (use a negative number for the past).
function hoursFromNow(hours) {
  return new Date(Date.now() + hours * HOUR).toISOString()
}

// Issues reported by the sample employee (Aarav Mehta).
// SLA windows used: Critical 4h, High 12h, Medium 48h, Low 120h.
export const employeeIssues = [
  {
    id: 'FG-1048',
    title: 'VPN disconnects every few minutes',
    category: 'Network',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'Priya Nair',
    createdAt: hoursFromNow(-6),
    dueAt: hoursFromNow(6),
  },
  {
    id: 'FG-1044',
    title: 'Payroll shows wrong tax deduction',
    category: 'Payroll',
    priority: 'Critical',
    status: 'Assigned',
    assignedTo: 'Karan Shah',
    createdAt: hoursFromNow(-3.5),
    dueAt: hoursFromNow(0.5),
  },
  {
    id: 'FG-1039',
    title: 'Laptop battery drains within an hour',
    category: 'Hardware',
    priority: 'Medium',
    status: 'Pending Verification',
    assignedTo: 'Priya Nair',
    createdAt: hoursFromNow(-30),
    dueAt: hoursFromNow(18),
  },
  {
    id: 'FG-1031',
    title: 'Cannot access shared finance folder',
    category: 'Access',
    priority: 'High',
    status: 'Reopened',
    assignedTo: 'Karan Shah',
    createdAt: hoursFromNow(-16),
    dueAt: hoursFromNow(-4),
  },
  {
    id: 'FG-1027',
    title: 'Request for a second monitor',
    category: 'Facilities',
    priority: 'Low',
    status: 'Open',
    assignedTo: 'Unassigned',
    createdAt: hoursFromNow(-20),
    dueAt: hoursFromNow(100),
  },
  {
    id: 'FG-1015',
    title: 'Email signature template not loading',
    category: 'Software',
    priority: 'Low',
    status: 'Closed',
    assignedTo: 'Priya Nair',
    createdAt: hoursFromNow(-200),
    dueAt: hoursFromNow(-80),
  },
]

export const issueStatuses = [
  'Open',
  'Assigned',
  'In Progress',
  'Pending Verification',
  'Closed',
  'Reopened',
]