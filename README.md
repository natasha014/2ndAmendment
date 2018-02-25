# Taking Aim at Gun Control

This project is intended to aid in screening people who request to purchase a firearm. Gun retailers can use our tools to survey someone and analyze if they are mentally and emotionally fit to own one.

Project: Taking Aim at Gun Control with Microsoft Azure and the Muse Headband

Team members: Natasha Thakur, Rupali Bahl, Michelle Huntley

Tools and Environments: Microsoft Azure, Muse SDK, Node.js, socket.io, Open Sound Control (OSC) library, Android SDK

Goal: Our goal of this project was to provide society with a more comprehensive screening process for prospective gun owners. Many disastrous events in recent history have been caused by guns getting into the hands of emotionally and mentally unstable people, due to inadequate screening processes. Our project utilizes a wide variety of data such as written responses, EEG brain activity data, and vocal responses to analyze a subject's true intentions and mental/emotional state.

Concept and Functionalities: Our project uses the Language API in Microsoft Azure to create a chatbot that asks the user preliminary questions about their age and gun license ownership, and ask them to provide short responses about their mental state. We then use sentiment analysis from the API to analyze the user's responses and determine a preliminary judgement of whether they are fit to own a gun. If it determines that they are not, then they are barred from further screenings. 
  If they are determined to be potentially fit to own a gun, then they would theoretically come in to a testing space where a moderator will have them take a survey of yes/no questions on a mobile app that records their vocal responses into a database so that sentiment analysis could later be performed on them. In addition, while they are taking the survey, they would be wearing the MUSE headband that records their brain activity, such as EEG, their jaw clench activity, their mellowness, and their concentration, and streams it in realtime to an online graph.
