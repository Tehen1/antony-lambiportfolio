/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProjectType {
  id: string;
  title: string;
  category: "blockchain" | "ai" | "saas" | "ecommerce" | "content";
  image: string;
  description: string;
  stack: string[];
  link: string;
  github?: string;
  status: "Live" | "In Progress" | "Audit Phase";
  earnings: string;
}

export interface SEOKeyword {
  keyword: string;
  volume: number;
  difficulty: "Low" | "Medium" | "High";
  intent: "Local" | "Commercial" | "Informational";
}

export interface SEOMetric {
  lcp: string;
  fid: string;
  cls: string;
  performanceScore: number;
  seoScore: number;
  bestPractices: number;
}

export interface AIAdvisorResponse {
  projectName: string;
  suggestedStack: string[];
  securityReview: string;
  costEstimation: string;
  timelineEstimate: string;
  architectureDetails: string;
}

export interface LocationDefinition {
  slug: string;
  name: string;
  postalCode: string;
  keywordFocus: string;
  h1: string;
  latitude: number;
  longitude: number;
  localHub: string;
  description: string;
}
