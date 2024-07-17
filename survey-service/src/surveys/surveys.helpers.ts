import { BadRequestException } from '@nestjs/common';
import {
  SurveyConflictRuleValue,
  SurveyConflictRules,
} from './surveys.interface';

export function checkAnswer({
  rule,
  answer,
  answers,
}: {
  rule: SurveyConflictRuleValue;
  answer: string;
  answers: string[];
}) {
  if (typeof rule === 'number' && answer === answers[rule]) {
    return true;
  }

  if (typeof rule === 'string' && answer === rule) {
    return true;
  }

  return false;
}

export function validateConflictRules({
  questions,
  conflictRules,
}: {
  questions: string[];
  conflictRules: SurveyConflictRules;
}) {
  const questionsSize = questions.length;

  for (const conflictRuleId in conflictRules) {
    const { eq, ne } = conflictRules[conflictRuleId];
    if (+conflictRuleId > questionsSize - 1) {
      throw new BadRequestException(
        `Question with ID ${conflictRuleId} does not exists`,
      );
    }

    if ((eq && ne) || (!eq && !ne)) {
      throw new BadRequestException(
        `eq and ne should be specified in XOR rule`,
      );
    }
  }
}
