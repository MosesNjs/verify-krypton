// routes/main.route.js
import express from 'express';
import { getUserIdFromToken } from '../utils/token.utils.js'
import { invalidateApiKey, generateApiKey } from '../controllers/apiKey.controller.js';
import fileController from '../controllers/file.controller.js';
import imageController from '../controllers/image.controller.js';
import loginController from '../controllers/login.controller.js';
import registrationController from '../controllers/registration.controller.js';
import authenticate,{ isSupergirl, requireApiKey } from '../middlewares/auth.middleware.js';
import welcomeMessage from '../middlewares/welcome.middleware.js';
import upload from '../middlewares/upload.middleware.js';

const mainRouter = express.Router();

// Main welcome route
mainRouter.get('/', welcomeMessage);

// Registration & Authentication
mainRouter.post('/register', registrationController.register); 
mainRouter.get('/confirm-email/:token', registrationController.verifyEmail);
mainRouter.post('/login', loginController.login);
mainRouter.post('/verify-otp', loginController.verifyOtp);

// For API Key Management
mainRouter.post('/invalidate-api-key', authenticate, invalidateApiKey);

// Updated route for generating API key
mainRouter.post('/generate-api-key', authenticate, generateApiKey);

// For File Upload and Management
mainRouter.post('/upload', [requireApiKey, upload(1)], fileController.upload);
mainRouter.get('/download/:userId/:fileId', requireApiKey, fileController.download);
mainRouter.put('/update/:userId/:fileId', [requireApiKey, upload(1)], fileController.update);
mainRouter.delete('/delete/:userId/:fileId', requireApiKey, fileController.delete);

// Image Access (authenticated users)
mainRouter.get('/images/:userId', requireApiKey, imageController.getAllImages);
mainRouter.get('/images/:userId/:imageId', requireApiKey, imageController.getImageById);
mainRouter.get('/last-image/:userId', requireApiKey, imageController.getLastImage);
mainRouter.post('/images/:userId/share', requireApiKey, imageController.createSharedImage);
mainRouter.get('/shared-images/:userId/:targetUserId', requireApiKey, imageController.getSharedImages);

// Supergirl Image Access (without authentication)
mainRouter.get('/supergirl/images/:userId', isSupergirl, imageController.getAllImages);
mainRouter.get('/supergirl/images/:userId/:imageId', isSupergirl, imageController.getImageById);
mainRouter.get('/supergirl/last-image/:userId', isSupergirl, imageController.getLastImage);
mainRouter.post('/supergirl/images/:userId/share', isSupergirl, imageController.createSharedImage);
mainRouter.get('/supergirl/shared-images/:userId/:targetUserId', isSupergirl, imageController.getSharedImages);

export default mainRouter;
