# LangAI - Real-Time AI Language Tutor

## Inspiration

The inspiration behind **LangAI** comes from the desire to create a more immersive and adaptive language learning experience. Traditional language learning tools often rely on rigid structures and lack real-time interaction. We wanted to develop a solution that could track a user's progress, offer personalized lessons, and provide instant feedback—mimicking the experience of learning with a native speaker. The goal was to create an AI-powered tutor that evolves alongside the learner, improving not only language skills but also confidence in speaking.

## What it does

**LangAI** is a real-time language tutor that adapts to each learner’s unique needs. It tracks a user's strengths and weaknesses, providing personalized lessons based on their progress. The application features interactive conversation practice, real-time pronunciation feedback, and structured lessons. Users can engage in free conversations or follow a predefined learning path. The AI helps learners improve their speaking, listening, and understanding skills in an interactive and engaging way.

## How we built it

We built **LangAI** using a combination of modern technologies:

- **Frontend:** The web application is powered by **Next.js**, providing a seamless and responsive user interface.
- **Backend:** The backend is built using **Flask** and **Python** for handling user requests and generating session tokens. It also integrates with **LiveKit** to facilitate real-time voice communication between the user and the AI.
- **AI Integration:** We use **OpenAI's GPT-4o** model to process and understand user speech, offer corrections, and generate appropriate responses.
- **Database:** We use **Neon PostgreSQL** to store user data, including progress, strengths, and weaknesses.
- **Voice Agent:** The voice agent, which listens to the user's speech and provides feedback, is powered by custom Python scripts and uses real-time processing.
- **Authentication:** We implemented **Google Identity Services (GSI)** to handle authentication. This system allows users to sign in securely via their Google account, making the login process seamless and secure.

## Challenges we ran into

- **Real-time voice processing:** Ensuring smooth communication between the user and the AI was one of the biggest challenges. Integrating real-time voice recognition and response generation while maintaining low latency required fine-tuning both the backend and frontend components.
- **Personalization of lessons:** Developing a system that tracks the user’s weaknesses and strengths in real-time, while dynamically adjusting lesson difficulty, was a complex task. We needed a robust algorithm to analyze speech and interaction patterns.
- **Token management:** Handling session tokens securely across multiple servers was a challenge, as we needed to ensure smooth transitions between the Flask-based token generator and the LiveKit integration.
- **Authentication:** Setting up Google Identity Services for secure authentication added an additional layer of complexity, ensuring user data was handled securely and efficiently.

## Accomplishments that we're proud of

- **Real-time AI interaction:** We’re proud of successfully building an AI that can converse in real-time with the user, providing valuable feedback on pronunciation, grammar, and sentence structure.
- **Personalized learning path:** The ability to track individual user progress and adapt lessons to their unique needs is a significant accomplishment.
- **Cross-server integration:** Integrating multiple servers (Next.js frontend, Python backend with LiveKit, and Flask server) into a seamless system was a challenging yet rewarding process.
- **Google GSI Authentication:** Successfully integrating Google Identity Services for secure and seamless user authentication was an important accomplishment, ensuring a smooth sign-in experience.

## What we learned

- **Real-time AI processing:** We learned a lot about optimizing real-time AI interactions, including managing API calls, processing voice inputs, and ensuring timely responses.
- **Session management and token security:** Implementing secure token generation and managing user sessions across different servers gave us deeper insights into session management best practices.
- **Voice recognition and feedback:** Working with voice recognition systems taught us how to refine the process of converting speech to text, analyzing it for accuracy, and providing real-time corrections.
- **Authentication implementation:** Implementing Google GSI expanded our understanding of OAuth2 and secure authentication systems, improving both the user experience and data protection.

## What's next for LangAI

- **Expanded language support:** In the future, we aim to expand LangAI’s language capabilities to include more languages, dialects, and regional accents, making it accessible to a wider audience.
- **Advanced speech analysis:** We plan to enhance the pronunciation feedback system, adding features like pitch analysis and fluency scoring.
- **More interactive lessons:** Adding more gamified elements and interactive learning modules will allow learners to engage with the language in a fun and motivating way.
- **Mobile application:** We are exploring the possibility of developing a mobile version of LangAI to make it even more accessible and portable for users on the go.
- **Report Card System:** We plan to integrate a **Report Card System** where users can track their progress over time. The system will generate personalized notes and detailed report cards based on their performance, highlighting areas for improvement and celebrating achievements.

## Installation

### 1. Set Up Python-based Backend (LiveKit Integration)
First, set up the Python-based backend that integrates with LiveKit:

- Navigate to the `utils` directory:
    ```bash
    cd utils
    ```

- Create a virtual environment:
    ```bash
    python -m venv ai
    ```

- Activate the virtual environment:
    ```bash
    .\ai\Scripts\activate
    ```

- Install all required dependencies:
    ```bash
    pip3 install -r .\requirements.txt
    ```

- To launch the voice agent, make sure all your environment variables are properly set, and then run:
    ```bash
    python agent.py dev
    ```

### 2. Set Up Flask Server (Token Generation)
To set up the Flask server that generates tokens for each session with the language tutor:

- Open a new terminal window and navigate to the `utils` directory:
    ```bash
    cd utils
    ```

- Launch the server:
    ```bash
    python server.py dev
    ```

### 3. Set Up Next.js Frontend
To install and run the Next.js frontend:

- Open a new terminal window in the root directory of the project.
- Install the necessary dependencies:
    ```bash
    npm install
    ```

- Launch the client:
    ```bash
    npm run dev
    ```

Your frontend should now be live and accessible at `http://localhost:3000`.

## Contributing

Feel free to fork this project, open issues, or submit pull requests to help improve LangAI! Contributions are always welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
