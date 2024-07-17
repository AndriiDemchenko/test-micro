export type SurveyConflictRuleValue = 'no' | 'yes' | number;

export interface SurveyConflictRule {
  ne?: SurveyConflictRuleValue;
  eq?: SurveyConflictRuleValue;
}

export interface SurveyConflictRules {
  [x: number]: SurveyConflictRule;
}

export enum SurveyStatus {
  Active = 'active',
  Removed = 'removed',
}

export enum SurveyAnswerStatus {
  Active = 'active',
  Removed = 'removed',
}
