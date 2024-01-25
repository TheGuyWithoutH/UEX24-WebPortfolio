# UEX Portfolio Ugo Balducci

## Description

This is a portfolio website for the UEX24 course.It comprises of 2 pages: the home page and the project page.
The home page contains a scenarized chatbot that will guide you through the website.
The project page contains a list of projects arranged in a horizontal card layout floating in space. Each card contains a project title, a subject and a picture as backgroud. When you click on a card, it will open a page that contains a grid of images and a chatbot that you can talk to to know the project.

## Interaction

The chatbots are implemented with the Gradio JS library. The chatbot on the home page is a scenarized chatbot written in advance. The chatbot on the project page is a chatbot that will give you information about the project you clicked on interactively.

A timer is started when entering the website and stored in the session storage. When the timer reaches 5 minutes, the user is redirected to a hidden page that contains a chatbot that took the cotrol of the website.

## Tech stack

The website is built with React. The chatbots are implemented with the Gradio JS library. The website is deployed on Github Pages.
