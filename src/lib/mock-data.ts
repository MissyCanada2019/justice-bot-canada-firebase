
// src/lib/mock-data.ts
import type { Case } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

export const mockCases: Case[] = [
  {
    id: '1',
    title: 'Landlord Dispute - Unlawful Eviction Claim',
    status: 'Active',
    lastActivity: '2 days ago',
    triageOutput: {
      issueType: 'Landlord and Tenant',
      keyFacts: 'Tenant received an N4 eviction notice for non-payment of rent, but claims rent was paid on time. Landlord has changed the locks. The property is located in Toronto, Ontario.',
      canLIIQuery: '"unlawful eviction" AND "changed locks" AND "Landlord and Tenant Board" AND "Ontario"',
    },
    journey: {
        meritScore: 8,
        meritJustification: "The case has strong merit as changing locks without an order from the LTB is an illegal eviction. The tenant's claim of having paid rent needs to be substantiated with evidence.",
        timeline: [
            { id: 't1-1', date: '2024-07-10', title: 'Received N4 Eviction Notice', description: 'Landlord issued notice for non-payment of rent.', status: 'completed' },
            { id: 't1-2', date: '2024-07-15', title: 'Landlord Changed Locks', description: 'Access to the rental unit was denied.', status: 'completed' },
            { id: 't1-3', date: '2024-07-20', title: 'Filed T2 Application with LTB', description: 'Application about Tenant Rights was filed.', status: 'completed' },
            { id: 't1-4', date: '2024-08-15', title: 'LTB Hearing Scheduled', description: 'Hearing to be held via video conference.', status: 'upcoming' },
            { id: 't1-5', date: '2024-09-01', title: 'Deadline for Evidence Submission', description: 'All evidence must be submitted to the LTB and the other party.', status: 'upcoming' },
        ],
    },
    timeline: [
      { id: 't1-1', date: '2024-07-10', title: 'Received N4 Eviction Notice', description: 'Landlord issued notice for non-payment of rent.', status: 'completed' },
      { id: 't1-2', date: '2024-07-15', title: 'Landlord Changed Locks', description: 'Access to the rental unit was denied.', status: 'completed' },
      { id: 't1-3', date: '2024-07-20', title: 'Filed T2 Application with LTB', description: 'Application about Tenant Rights was filed.', status: 'completed' },
      { id: 't1-4', date: '2024-08-15', title: 'LTB Hearing Scheduled', description: 'Hearing to be held via video conference.', status: 'upcoming' },
      { id: 't1-5', date: '2024-09-01', title: 'Deadline for Evidence Submission', description: 'All evidence must be submitted to the LTB and the other party.', status: 'upcoming' },
    ],
    forms: [
      { id: 'f1-1', name: 'T2: Application about Tenant Rights', description: 'Use this form to file a complaint about your landlord.', url: '#' },
      { id: 'f1-2', name: 'Request for accommodation form', description: 'If you require accommodations for your hearing.', url: '#' },
    ],
  },
  {
    id: '2',
    title: 'Workplace Issue - Wrongful Dismissal',
    status: 'Active',
    lastActivity: '5 hours ago',
    triageOutput: {
      issueType: 'Employment',
      keyFacts: 'Employee with 5 years of service was terminated without cause and offered only 2 weeks of severance. Employment contract does not contain a valid termination clause. Based in Vancouver, British Columbia.',
      canLIIQuery: '"wrongful dismissal" AND "severance pay" AND "common law notice" AND "British Columbia"',
    },
     journey: {
        meritScore: 9,
        meritJustification: "The employee has a strong case for wrongful dismissal due to the long service and inadequate severance offer, which is below common law standards. The absence of a valid termination clause further strengthens the claim.",
        timeline: [
             { id: 't2-1', date: '2024-07-18', title: 'Termination of Employment', description: 'Received termination letter from HR.', status: 'completed' },
            { id: 't2-2', date: '2024-07-25', title: 'Initial Consultation with Lawyer', description: 'Discussed options and reviewed employment contract.', status: 'completed' },
            { id: 't2-3', date: '2024-08-01', title: 'Demand Letter Sent', description: 'Sent a demand letter to former employer for fair severance.', status: 'upcoming' },
        ],
    },
    timeline: [
      { id: 't2-1', date: '2024-07-18', title: 'Termination of Employment', description: 'Received termination letter from HR.', status: 'completed' },
      { id: 't2-2', date: '2024-07-25', title: 'Initial Consultation with Lawyer', description: 'Discussed options and reviewed employment contract.', status: 'completed' },
      { id: 't2-3', date: '2024-08-01', title: 'Demand Letter Sent', description: 'Sent a demand letter to former employer for fair severance.', status: 'upcoming' },
    ],
    forms: [
      { id: 'f2-1', name: 'Employment Standards Act Complaint Form', description: 'To file a complaint for minimum standards violations.', url: '#' },
    ],
  },
  {
    id: '3',
    title: 'Family Law - Child Support Agreement',
    status: 'Closed',
    lastActivity: '1 month ago',
    triageOutput: {
      issueType: 'Family Law',
      keyFacts: 'Separated couple with two children needs to establish a formal child support agreement. Both parents live in Alberta. One parent is self-employed.',
      canLIIQuery: '"child support guidelines" AND "self-employment income" AND "Alberta"',
    },
    journey: {
        meritScore: 7,
        meritJustification: "This is a standard process. The merit is related to ensuring the child support calculation is fair and accurate, especially with self-employment income, which can be complex to determine.",
        timeline: [
            { id: 't3-1', date: '2024-05-01', title: 'Separation Date', description: 'Official date of separation.', status: 'completed' },
            { id: 't3-2', date: '2024-05-15', title: 'Financial Disclosures Exchanged', description: 'Both parties provided financial statements.', status: 'completed' },
            { id: 't3-3', date: '2024-06-05', title: 'Mediation Session', description: 'Attended mediation to discuss child support.', status: 'completed' },
            { id: 't3-4', date: '2024-06-20', title: 'Separation Agreement Signed', description: 'Final agreement signed and notarized.', status: 'completed' },
        ]
    },
    timeline: [
        { id: 't3-1', date: '2024-05-01', title: 'Separation Date', description: 'Official date of separation.', status: 'completed' },
        { id: 't3-2', date: '2024-05-15', title: 'Financial Disclosures Exchanged', description: 'Both parties provided financial statements.', status: 'completed' },
        { id: 't3-3', date: '2024-06-05', title: 'Mediation Session', description: 'Attended mediation to discuss child support.', status: 'completed' },
        { id: 't3-4', date: '2024-06-20', title: 'Separation Agreement Signed', description: 'Final agreement signed and notarized.', status: 'completed' },
    ],
    forms: [
      { id: 'f3-1', name: 'Child Support Data Sheets', description: 'Worksheets to calculate child support based on Federal Guidelines.', url: '#' },
      { id: 'f3-2', name: 'Financial Statement (Form FL-17)', description: 'Required for family law cases involving support.', url: '#' },
    ],
  }
];

export const getCaseById = (id: string): Case | undefined => {
    const caseItem = mockCases.find(c => c.id === id);
    if (!caseItem) return undefined;
    // This function can be expanded to format other data as needed
    return { ...caseItem };
}

export const addCase = (newCase: Case) => {
    // Prepend to the beginning of the array for chronological order on dashboard
    mockCases.unshift(newCase);
}

export const getCaseCount = async (): Promise<number> => mockCases.length;
