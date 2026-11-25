// Smart Priority Engine rules.
// This is a preview copy for the form. The Spring Boot backend will be the source of truth.

export const priorityConfig = {
  urgencyWeight: 3,
  impactWeight: 4,

  // Extra points added for sensitive categories
  categoryBonus: {
    Access: 2,
    Facilities: 0,
    Hardware: 1,
    Network: 2,
    Payroll: 4,
    Security: 6,
    Software: 1,
    Other: 0,
  },

  // Checked from the highest score down. The first rule that matches wins.
  thresholds: [
    { min: 28, level: 'Critical' },
    { min: 20, level: 'High' },
    { min: 12, level: 'Medium' },
    { min: 0, level: 'Low' },
  ],

  // Hours allowed to resolve an issue of each level
  slaHours: {
    Critical: 4,
    High: 12,
    Medium: 48,
    Low: 120,
  },
}

export const categories = Object.keys(priorityConfig.categoryBonus)

// Highest possible score (urgency 4, impact 4, biggest category bonus). Used for the meter.
export const maxScore =
  4 * priorityConfig.urgencyWeight +
  4 * priorityConfig.impactWeight +
  Math.max(...Object.values(priorityConfig.categoryBonus))

export function calculatePriority({ category, urgency, impact }) {
  const urgencyPoints = urgency * priorityConfig.urgencyWeight
  const impactPoints = impact * priorityConfig.impactWeight
  const categoryPoints = priorityConfig.categoryBonus[category] ?? 0
  const score = urgencyPoints + impactPoints + categoryPoints

  const level = priorityConfig.thresholds.find((rule) => score >= rule.min).level

  return {
    score,
    level,
    slaHours: priorityConfig.slaHours[level],
    breakdown: [
      {
        label: 'Urgency',
        detail: `${urgency} × ${priorityConfig.urgencyWeight}`,
        points: urgencyPoints,
      },
      {
        label: 'Business impact',
        detail: `${impact} × ${priorityConfig.impactWeight}`,
        points: impactPoints,
      },
      {
        label: `Category (${category})`,
        detail: 'bonus',
        points: categoryPoints,
      },
    ],
  }
}