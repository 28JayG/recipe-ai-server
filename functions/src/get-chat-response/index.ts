import { onRequest } from 'firebase-functions/v2/https';
import dummy from './dummy';
import { getPrompt, parseRecipesJSONFromString } from '../utils/message.utils';
import { RequestStatus } from '../types/enums';
import { GetChatRequest } from '../types/api.types';

// import OpenAI from 'openai';

const getRecipes = onRequest({ timeoutSeconds: 1200 }, async (req, res) => {
  // only allow POST method
  if (req.method !== 'POST') {
    res
      .status(405)
      .json({ status: RequestStatus.FAIL, message: 'Wrong Method' });
  } else {
    let { message } = dummy;

    if (!req.body)
      res.status(400).json({
        status: RequestStatus.FAIL,
        message: 'request body missing',
      });

    const {
      condition,
      cookingSkills,
      dietRestrictions,
      protinePreference,
      spiceLevel,
    } = req.body as GetChatRequest;

    if (
      !condition ||
      !cookingSkills ||
      !dietRestrictions ||
      !protinePreference ||
      !spiceLevel
    )
      res.status(400).json({
        status: RequestStatus.FAIL,
        message: 'Request body incomplete',
      });

    const promptContent = getPrompt(req.body);

    // const openai = new OpenAI({
    //   apiKey: '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',
    // });

    // const chatCompletion = await openai.chat.completions.create({
    //   messages: [
    //     {
    //       role: 'user',
    //       content: promptContent,
    //     },
    //   ],
    //   model: 'gpt-3.5-turbo',
    // });

    // const message = chatCompletion.choices[0].message.content || '';

    res.status(200).json({
      status: 'success',
      data: { recipes: parseRecipesJSONFromString(message) },
    });
  }
});

export default getRecipes;
