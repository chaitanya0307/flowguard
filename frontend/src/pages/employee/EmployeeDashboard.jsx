import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BadgeCheck,
  ClipboardList,
  Clock,
  Plus,
  Search,
  ShieldAlert,
} from 'lucide-react'
import PriorityBadge from '../../components/PriorityBadge.jsx'
import SlaCountdown from '../../components/SlaCountdown.jsx'
import StatCard from '../../components/StatCard.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import { employeeIssues, issueStatuses } from '../../data/sampleIssues.js'
import { formatDate } from '../../utils/time.js'
import '../../styles/dashboard.css'
import '../../styles/tables.css'

function EmployeeDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [now] = useState(() => Date.now())

  // Summary numbers for the stat cards
  const totalIssues = employeeIssues.length
  const activeIssues = employeeIssues.filter(
    (issue) => issue.status !== 'Closed',
  ).length
  const awaitingVerification = employeeIssues.filter(
    (issue) => issue.status === 'Pending Verification',
  ).length
  const breachedIssues = employeeIssues.filter(
    (issue) => issue.status !== 'Closed' && new Date(issue.dueAt) < now,
  ).length

  // Apply the search box and the status dropdown to the full list
  const query = searchTerm.trim().toLowerCase()
  const visibleIssues = employeeIssues.filter((issue) => {
    const matchesSearch =
      !query ||
      issue.title.toLowerCase().includes(query) ||
      issue.id.toLowerCase().includes(query) ||
      issue.category.toLowerCase().includes(query)
    const matchesStatus =
      statusFilter === 'All' || issue.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <>
      <header className="page-header">
        <div className="page-header__text">
          <h1>Welcome back, Aarav</h1>
          <p className="text-muted">
            Track your requests, deadlines and resolutions in one place.
          </p>
        </div>

        <Link to="/employee/new-issue" className="btn btn--primary">
          <Plus size={18} aria-hidden="true" />
          New issue
        </Link>
      </header>

      <section className="stat-grid" aria-label="Issue summary">
        <StatCard
          label="Total issues"
          value={totalIssues}
          icon={ClipboardList}
          tone="slate"
        />
        <StatCard
          label="Active issues"
          value={activeIssues}
          icon={Clock}
          tone="teal"
        />
        <StatCard
          label="Awaiting your verification"
          value={awaitingVerification}
          icon={BadgeCheck}
          tone="amber"
        />
        <StatCard
          label="SLA breached"
          value={breachedIssues}
          icon={ShieldAlert}
          tone="red"
        />
      </section>

      <section className="card table-card">
        <div className="table-toolbar">
          <h2>My issues</h2>

          <div className="table-toolbar__filters">
            <label className="search-box">
              <Search size={16} aria-hidden="true" />
              <input
                type="search"
                placeholder="Search by title, ID or category"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter by status"
            >
              <option value="All">All statuses</option>
              {issueStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>SLA</th>
                <th>Assigned to</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {visibleIssues.length > 0 ? (
                visibleIssues.map((issue) => (
                  <tr key={issue.id}>
                    <td className="data-table__id">{issue.id}</td>
                    <td className="data-table__title">{issue.title}</td>
                    <td>{issue.category}</td>
                    <td>
                      <PriorityBadge level={issue.priority} />
                    </td>
                    <td>
                      <StatusBadge status={issue.status} />
                    </td>
                    <td>
                      <SlaCountdown
                        createdAt={issue.createdAt}
                        dueAt={issue.dueAt}
                        status={issue.status}
                      />
                    </td>
                    <td>{issue.assignedTo}</td>
                    <td>{formatDate(issue.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="data-table__empty">
                    No issues match your search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="table-footer">
          Showing {visibleIssues.length} of {totalIssues} issues
        </p>
      </section>
    </>
  )
}

export default EmployeeDashboard
