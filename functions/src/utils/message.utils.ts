import { promptTempalte } from '../constants/strings';
import { GetChatRequest } from '../types/api.types';
import { Recipe } from '../types/modals';

export const parseRecipesJSONFromString = (message: string): Recipe[] => {
  //replace all '\' and '\n'
  message = message.replace(/\\/g, '').replace(/\n/g, '');

  //filter json formatted recipe from the text
  const filteredJSONs = message.split('JSON format:').map((el) => {
    const matches = el.match(/\{[^}]+\}/g); // match string within {} including them

    if (matches) return JSON.parse(matches[0].trim());
  });

  return filteredJSONs;
};

export const getPrompt = ({
  condition,
  cookingSkills,
  dietRestrictions,
  protinePreference,
  spiceLevel,
}: GetChatRequest) =>
  promptTempalte
    .replace('<condition>', condition)
    .replace('<restriction>', dietRestrictions)
    .replace('<protinePreference>', protinePreference)
    .replace('<spiceLevel>', spiceLevel)
    .replace('<cookingSkill>', cookingSkills);
