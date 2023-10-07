import { onRequest } from 'firebase-functions/v2/https';
import dummy from './dummy.json';

import OpenAI from 'openai';

const getChatResponse = onRequest(
  { timeoutSeconds: 1200 },
  async (req, res) => {
    // only allow POST method
    if (req.method !== 'POST') {
      res.status(405).json({ status: 'fail', message: 'Wrong Method' });
    } else if (!req.body?.text) {
      res.status(405).json({ status: 'fail', message: 'body or text missing' });
    } else {
      // const openai = new OpenAI({
      //   apiKey: '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',
      // });

      // const chatCompletion = await openai.chat.completions.create({
      //   messages: [
      //     {
      //       role: 'user',
      //       content: req.body.text,
      //     },
      //   ],
      //   model: 'gpt-3.5-turbo',
      // });

      // const message = chatCompletion.choices[0].message.content || '';
      // res.status(200).json({ status: 'success', message });
      res.status(200).json(dummy);
    }
  }
);

export default getChatResponse;
