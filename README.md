# VerseScan - AI-Powered Document Digitization and Formatting

Visit the deployed site: [https://h9pymn5nt2.us-east-2.awsapprunner.com](https://h9pymn5nt2.us-east-2.awsapprunner.com)

## Overview

**VerseScan** is a **personal project** exploring **AI-powered text extraction and document formatting**. It currently supports **basic chatbot functionality** using the OpenAI API and Google authentication.

Future enhancements will introduce **image upload capabilities**, **AI-driven text extraction**, and **automatic document formatting**, enabling users to convert scanned documents into structured, editable DOCX files. The application is designed with a **scalable architecture** leveraging AWS services for deployment, database management, and potential file storage.

## Tech Stack

- **Frontend:** Vue 3, TypeScript, Pinia, Less  
- **Backend:** NestJS, TypeScript  
- **Database:** AWS DynamoDB (considering PostgreSQL or S3 for text storage)  
- **Authentication:** Google OAuth 2.0  
- **AI Integration:** OpenAI API (GPT-4o for text extraction and formatting)  
- **Containerization:** Docker  
- **Deployment:** AWS AppRunner  

## Features

### Currently Available:
- Secure authentication with Google OAuth 2.0.  
- Basic chatbot functionality powered by the OpenAI API.  
- Cloud deployment on AWS AppRunner.  
- Containerized with Docker for portability.  

### Planned Enhancements:
- AI-powered text extraction from images.  
- Automatic document formatting, including structured text and styling.  
- Exporting documents in DOCX format.  
- Configurable storage options for extracted text (DynamoDB, PostgreSQL, or S3).  
- Performance optimizations and caching strategies.  
- CI/CD pipeline setup with GitHub Actions.  

## Getting Started

VerseScan is hosted online, allowing users to **test the chatbot functionality without local setup**.  
Visit the deployed site to explore the current features:  
[https://h9pymn5nt2.us-east-2.awsapprunner.com](https://h9pymn5nt2.us-east-2.awsapprunner.com)
