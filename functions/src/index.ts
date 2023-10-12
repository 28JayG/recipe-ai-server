import { initializeApp } from 'firebase-admin/app';

import getRecipes from './get-chat-response';
import addUserToFirestore from './auth/user-on-create';


initializeApp();

export { getRecipes, addUserToFirestore };
